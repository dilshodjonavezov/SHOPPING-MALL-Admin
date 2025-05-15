const productsData = {
    'food-bread': [
        { name: 'Белый хлеб', sku: 'bread-001', price: '2.50', status: 'Активный', description: 'Свежий хлеб', quantity: 50, image: '' },
        { name: 'Булочка с корицей', sku: 'bread-002', price: '1.00', status: 'Неактивный', description: 'Сладкая выпечка', quantity: 30, image: '' }
    ],
    'food-fruits': [
        { name: 'Инжир свежий', sku: 'fruit-001', price: '5.00', status: 'Активный', description: 'Сезонный фрукт', quantity: 100, image: '' },
        { name: 'Гранаты', sku: 'fruit-002', price: '4.50', status: 'Активный', description: 'Полезные ягоды', quantity: 80, image: '' }
    ],
    'food-meat': [
        { name: 'Говядина свежая', sku: 'meat-001', price: '10.00', status: 'Активный', description: 'Свежая Говядина', quantity: 20, image: '' },
        { name: 'Молоко 2.5%', sku: 'milk-001', price: '1.20', status: 'Неактивный', description: 'Пастеризованное молоко', quantity: 150, image: '' }
    ],
    'clothing-coats': [
        { name: 'Зимняя куртка', sku: 'coat-001', price: '50.00', status: 'Активный', description: 'Теплая куртка', quantity: 15, image: '' }
    ],
    'clothing-national': [
        { name: 'Чакан', sku: 'national-001', price: '30.00', status: 'Неактивный', description: 'Национальный костюм', quantity: 10, image: '' }
    ],
    'clothing-kids-shoes': [
        { name: 'Детские ботинки', sku: 'kids-shoes-001', price: '15.00', status: 'Активный', description: 'Удобная обувь', quantity: 40, image: '' }
    ],
    'household-cleaning': [
        { name: 'Универсальный очиститель', sku: 'clean-001', price: '3.00', status: 'Активный', description: 'Для всех поверхностей', quantity: 60, image: '' }
    ],
    'household-dishes': [
        { name: 'Набор тарелок', sku: 'dishes-001', price: '20.00', status: 'Неактивный', description: 'Керамический набор', quantity: 25, image: '' }
    ],
    'household-textile': [
        { name: 'Постельное белье', sku: 'textile-001', price: '25.00', status: 'Активный', description: 'Хлопок', quantity: 30, image: '' }
    ],
    'electronics-phones': [
        { name: 'Смартфон X', sku: 'phone-001', price: '200.00', status: 'Активный', description: 'Мощный смартфон', quantity: 5, image: '' }
    ],
    'electronics-lights': [
        { name: 'LED лампа', sku: 'light-001', price: '5.00', status: 'Неактивный', description: 'Энергоэффективная', quantity: 70, image: '' }
    ],
    'electronics-small': [
        { name: 'Электрочайник', sku: 'small-001', price: '15.00', status: 'Активный', description: 'Быстрый нагрев', quantity: 20, image: '' }
    ]
};

let selectedProduct = null;
let selectedProductIndex = -1;
let activeCategory = null;

const categoryNames = {
    'food-bread': 'Хлеб и выпечка',
    'food-fruits': 'Фрукты и овощи',
    'food-meat': 'Мясо и молочные продукты',
    'clothing-coats': 'Куртки и пальто',
    'clothing-national': 'Национальная одежда',
    'clothing-kids-shoes': 'Обувь для детей',
    'household-cleaning': 'Средства для уборки',
    'household-dishes': 'Посуда и кухонные принадлежности',
    'household-textile': 'Текстиль',
    'electronics-phones': 'Мобильные телефоны и зарядные устройства',
    'electronics-lights': 'Лампы и светильники',
    'electronics-small': 'Мелкая бытовая техника'
};

function toggleSubmenu(category) {
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => item.classList.remove('active'));
    const currentItem = document.querySelector(`#${category}`).parentElement;
    currentItem.classList.add('active');
}

function showProducts(category) {
    activeCategory = category;
    const welcomeMessage = document.getElementById('welcome-message');
    const productsContainer = document.getElementById('products-container');
    const tbody = document.getElementById('products-body');

    welcomeMessage.style.display = 'none';
    productsContainer.style.display = 'block';

    tbody.innerHTML = '';
    const products = productsData[category] || [];
    if (products.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4">Товары не найдены</td></tr>';
        return;
    }

    products.forEach((product, index) => {
        const row = document.createElement('tr');
        row.onclick = () => openSidebar('view', product, index);
        row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.sku}</td>
            <td>${product.price}</td>
            <td><span class="${product.status === 'Активный' ? 'status-active' : 'status-inactive'}">${product.status}</span></td>
        `;
        tbody.appendChild(row);
    });
}

function openSidebar(mode, product = null, index = -1) {
    console.log(`openSidebar called with mode: ${mode}, product: ${product ? product.name : 'null'}, index: ${index}`);

    if (mode !== 'delete') {
        selectedProduct = product;
        selectedProductIndex = index;
    }

    const panel = document.getElementById('sidebar-panel');
    const panelBody = document.getElementById('panel-body');
    const panelTitle = document.getElementById('panel-title');
    const actions = document.querySelector('.sidebar-actions');

    panelBody.innerHTML = '';
    panel.classList.add('active');

    switch (mode) {
        case 'view':
            panelTitle.textContent = 'Просмотр товара';
            actions.style.display = 'flex';
            panelBody.innerHTML = `
                <div class="form-card">
                    <div class="form-group">
                        <label>Изображение</label>
                        ${product.image ? `<img src="${product.image}" alt="${product.name}" class="preview-image">` : `<p>Изображение не загружено</p>`}
                    </div>
                    <div class="form-group">
                        <label>Название товара</label>
                        <p>${product.name}</p>
                    </div>
                    <div class="form-group">
                        <label>Артикул</label>
                        <p>${product.sku}</p>
                    </div>
                    <div class="form-group">
                        <label>Цена (основная и с учётом скидки)</label>
                        <p>${product.price} (Скидка: 10%)</p>
                    </div>
                    <div class="form-group">
                        <label>Количество</label>
                        <p>${product.quantity}</p>
                    </div>
                    <div class="form-group">
                        <label>Категория</label>
                        <p>${activeCategory ? categoryNames[activeCategory] : 'Не выбрано'}</p>
                    </div>
                    <div class="form-group">
                        <label>Статус</label>
                        <p>${product.status}</p>
                    </div>
                    <div class="form-group">
                        <label>Описание</label>
                        <p>${product.description}</p>
                    </div>
                </div>
            `;
            break;

        case 'add':
            panelTitle.textContent = 'Новый товар';
            actions.style.display = 'none';
            panelBody.innerHTML = `
                <form id="add-product-form" class="add-form">
                    <div class="form-card">
                        <div class="form-group">
                            <label>Название</label>
                            <input type="text" name="name" placeholder="Введите название" required>
                        </div>
                        <div class="form-group">
                            <label>Артикул</label>
                            <input type="text" name="sku" placeholder="Введите артикул" required>
                        </div>
                        <div class="form-group">
                            <label>Активность товара</label>
                            <label class="switch">
                                <input type="checkbox" name="status" checked>
                                <span class="slider"></span>
                            </label>
                        </div>
                        <div class="form-group">
                            <label>Описание</label>
                            <textarea name="description" placeholder="Введите описание" required></textarea>
                        </div>
                        <div class="form-group">
                            <label>Цена</label>
                            <input type="number" step="0.01" name="price" placeholder="Введите цену" required>
                        </div>
                        <div class="form-group">
                            <label>Количество</label>
                            <input type="number" name="quantity" placeholder="Введите количество" required>
                        </div>
                        <div class="form-group">
                            <label>Изображение</label>
                            <div class="file-upload">
                                <input type="file" name="image" accept="image/*" id="image-upload">
                                <label for="image-upload" class="file-label"><i class="fas fa-upload"></i> Выберите файл</label>
                                <div class="image-preview" id="image-preview"></div>
                            </div>
                        </div>
                    </div>
                    <div class="button-group">
                        <button type="submit" class="add-button"><i class="fas fa-plus"></i> Добавить</button>
                        <button type="button" class="cancel-button" onclick="closeSidebar()"><i class="fas fa-times"></i> Отмена</button>
                    </div>
                </form>
            `;
            document.getElementById('add-product-form').addEventListener('submit', function(e) {
                e.preventDefault();
                const form = this;
                const name = form.querySelector('[name="name"]').value.trim();
                const sku = form.querySelector('[name="sku"]').value.trim();
                const price = form.querySelector('[name="price"]').value.trim();
                const quantity = form.querySelector('[name="quantity"]').value.trim();
                const description = form.querySelector('[name="description"]').value.trim();
                const imageInput = form.querySelector('#image-upload');
                let image = '';

                if (!name || !sku || !price || !quantity || !description) {
                    showSnackbar('Заполните обязательные поля', 'error');
                    return;
                }

                if (imageInput.files[0]) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        image = e.target.result;
                        const product = {
                            name: name,
                            sku: sku,
                            price: parseFloat(price).toFixed(2),
                            status: form.querySelector('[name="status"]').checked ? 'Активный' : 'Неактивный',
                            description: description,
                            quantity: parseInt(quantity),
                            image: image
                        };
                        if (!productsData[activeCategory]) productsData[activeCategory] = [];
                        productsData[activeCategory].push(product);
                        showProducts(activeCategory);
                        showSnackbar('Товар успешно добавлен', 'success');
                        closeSidebar();
                    };
                    reader.readAsDataURL(imageInput.files[0]);
                } else {
                    const product = {
                        name: name,
                        sku: sku,
                        price: parseFloat(price).toFixed(2),
                        status: form.querySelector('[name="status"]').checked ? 'Активный' : 'Неактивный',
                        description: description,
                        quantity: parseInt(quantity),
                        image: ''
                    };
                    if (!productsData[activeCategory]) productsData[activeCategory] = [];
                    productsData[activeCategory].push(product);
                    showProducts(activeCategory);
                    showSnackbar('Товар успешно добавлен', 'success');
                    closeSidebar();
                }
            });
            document.getElementById('image-upload').addEventListener('change', function(e) {
                const file = e.target.files[0];
                const preview = document.getElementById('image-preview');
                preview.innerHTML = '';
                if (file && file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        preview.innerHTML = `<img src="${e.target.result}" alt="Preview" class="preview-image"><i class="fas fa-times remove-image" onclick="removeImage(this)"></i>`;
                    };
                    reader.readAsDataURL(file);
                }
            });
            break;

        case 'edit':
            panelTitle.textContent = 'Редактировать товар';
            actions.style.display = 'none';
            panelBody.innerHTML = `
                <form id="edit-product-form" class="add-form">
                    <div class="form-card">
                        <div class="form-group">
                            <label>Название</label>
                            <input type="text" name="name" value="${product.name}" required>
                        </div>
                        <div class="form-group">
                            <label>Артикул</label>
                            <input type="text" name="sku" value="${product.sku}" required>
                        </div>
                        <div class="form-group">
                            <label>Активность товара</label>
                            <label class="switch">
                                <input type="checkbox" name="status" ${product.status === 'Активный' ? 'checked' : ''}>
                                <span class="slider"></span>
                            </label>
                        </div>
                        <div class="form-group">
                            <label>Описание</label>
                            <textarea name="description" required>${product.description || ''}</textarea>
                        </div>
                        <div class="form-group">
                            <label>Цена</label>
                            <input type="number" step="0.01" name="price" value="${product.price}" required>
                        </div>
                        <div class="form-group">
                            <label>Количество</label>
                            <input type="number" name="quantity" value="${product.quantity}" required>
                        </div>
                        <div class="form-group">
                            <label>Изображение</label>
                            <div class="file-upload">
                                <input type="file" name="image" accept="image/*" id="image-upload">
                                <label for="image-upload" class="file-label"><i class="fas fa-upload"></i> Выберите файл</label>
                                <div class="image-preview" id="image-preview">
                                    ${product.image ? `<img src="${product.image}" alt="${product.name}" class="preview-image"><i class="fas fa-times remove-image" onclick="removeImage(this)"></i>` : ''}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="button-group">
                        <button type="submit" class="add-button"><i class="fas fa-save"></i> Сохранить</button>
                        <button type="button" class="cancel-button" onclick="closeSidebar()"><i class="fas fa-times"></i> Отмена</button>
                    </div>
                </form>
            `;
            document.getElementById('edit-product-form').addEventListener('submit', function(e) {
                e.preventDefault();
                const form = this;
                const name = form.querySelector('[name="name"]').value.trim();
                const sku = form.querySelector('[name="sku"]').value.trim();
                const price = form.querySelector('[name="price"]').value.trim();
                const quantity = form.querySelector('[name="quantity"]').value.trim();
                const description = form.querySelector('[name="description"]').value.trim();
                const imageInput = form.querySelector('#image-upload');

                if (!name || !sku || !price || !quantity || !description) {
                    showSnackbar('Заполните обязательные поля', 'error');
                    return;
                }

                if (imageInput.files[0]) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        const updatedProduct = {
                            name: name,
                            sku: sku,
                            price: parseFloat(price).toFixed(2),
                            status: form.querySelector('[name="status"]').checked ? 'Активный' : 'Неактивный',
                            description: description,
                            quantity: parseInt(quantity),
                            image: e.target.result
                        };
                        if (selectedProductIndex !== -1) {
                            productsData[activeCategory][selectedProductIndex] = updatedProduct;
                        }
                        showProducts(activeCategory);
                        showSnackbar('Товар успешно сохранён', 'success');
                        closeSidebar();
                    };
                    reader.readAsDataURL(imageInput.files[0]);
                } else {
                    const updatedProduct = {
                        name: name,
                        sku: sku,
                        price: parseFloat(price).toFixed(2),
                        status: form.querySelector('[name="status"]').checked ? 'Активный' : 'Неактивный',
                        description: description,
                        quantity: parseInt(quantity),
                        image: product.image || ''
                    };
                    if (selectedProductIndex !== -1) {
                        productsData[activeCategory][selectedProductIndex] = updatedProduct;
                    }
                    showProducts(activeCategory);
                    showSnackbar('Товар успешно сохранён', 'success');
                    closeSidebar();
                }
            });
            document.getElementById('image-upload').addEventListener('change', function(e) {
                const file = e.target.files[0];
                const preview = document.getElementById('image-preview');
                preview.innerHTML = '';
                if (file && file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        preview.innerHTML = `<img src="${e.target.result}" alt="Preview" class="preview-image"><i class="fas fa-times remove-image" onclick="removeImage(this)"></i>`;
                    };
                    reader.readAsDataURL(file);
                }
            });
            break;

        case 'delete':
            if (!selectedProduct || selectedProductIndex === -1) {
                console.error('Delete mode: selectedProduct or selectedProductIndex is invalid', { selectedProduct, selectedProductIndex });
                showSnackbar('Ошибка: товар не выбран', 'error');
                return;
            }
            const modal = document.getElementById('delete-modal');
            const productName = document.getElementById('product-name');
            productName.textContent = selectedProduct.name;
            modal.classList.add('active');
            break;
    }
}

function editProduct() {
    if (selectedProduct && selectedProductIndex !== -1) {
        openSidebar('edit', selectedProduct, selectedProductIndex);
    } else {
        showSnackbar('Ошибка: товар не выбран', 'error');
    }
}

function closeSidebar() {
    const panel = document.getElementById('sidebar-panel');
    panel.classList.remove('active');
    selectedProduct = null;
    selectedProductIndex = -1;
}

function confirmDelete() {
    if (selectedProductIndex !== -1 && productsData[activeCategory]) {
        productsData[activeCategory].splice(selectedProductIndex, 1);
        showProducts(activeCategory);
        showSnackbar('Товар успешно удалён', 'success');
        closeModal();
        closeSidebar();
    } else {
        showSnackbar('Ошибка: невозможно удалить товар', 'error');
    }
}

function closeModal() {
    const modal = document.getElementById('delete-modal');
    modal.classList.remove('active');
}

function removeImage(element) {
    const preview = element.parentElement;
    preview.innerHTML = '';
    document.getElementById('image-upload').value = '';
}

function showSnackbar(message, type) {
    const snackbar = document.getElementById('snackbar');
    snackbar.textContent = message;
    snackbar.className = 'show ' + type;
    setTimeout(() => { snackbar.className = snackbar.className.replace('show', ''); }, 3000);
}

function logout() {
    localStorage.clear();
    sessionStorage.clear();
    window.location.replace(`auth.html?nocache=${Date.now()}`);
}

document.addEventListener('DOMContentLoaded', () => {
});