const productsData = {
    'food-bread': [
        { name: 'Белый хлеб', sku: 'bread-001', initialPrice: '2.00', markupPercentage: 25, finalPrice: '2.50', discountPercentage: 10, status: 'Активный', description: 'Свежий хлеб', quantity: 50, images: [] },
        { name: 'Булочка с корицей', sku: 'bread-002', initialPrice: '0.80', markupPercentage: 25, finalPrice: '1.00', discountPercentage: 0, status: 'Неактивный', description: 'Сладкая выпечка', quantity: 30, images: [] }
    ],
    'food-fruits': [
        { name: 'Инжир свежий', sku: 'fruit-001', initialPrice: '4.00', markupPercentage: 25, finalPrice: '5.00', discountPercentage: 0, status: 'Активный', description: 'Сезонный фрукт', quantity: 100, images: [] },
        { name: 'Гранаты', sku: 'fruit-002', initialPrice: '3.60', markupPercentage: 25, finalPrice: '4.50', discountPercentage: 0, status: 'Активный', description: 'Полезные ягоды', quantity: 80, images: [] }
    ],
    'food-meat': [
        { name: 'Говядина свежая', sku: 'meat-001', initialPrice: '8.00', markupPercentage: 25, finalPrice: '10.00', discountPercentage: 0, status: 'Активный', description: 'Свежая Говядина', quantity: 20, images: [] },
        { name: 'Молоко 2.5%', sku: 'milk-001', initialPrice: '0.96', markupPercentage: 25, finalPrice: '1.20', discountPercentage: 0, status: 'Неактивный', description: 'Пастеризованное молоко', quantity: 150, images: [] }
    ],
    'clothing-coats': [
        { name: 'Зимняя куртка', sku: 'coat-001', initialPrice: '40.00', markupPercentage: 25, finalPrice: '50.00', discountPercentage: 0, status: 'Активный', description: 'Теплая куртка', quantity: 15, images: [] }
    ],
    'clothing-national': [
        { name: 'Чакан', sku: 'national-001', initialPrice: '24.00', markupPercentage: 25, finalPrice: '30.00', discountPercentage: 0, status: 'Неактивный', description: 'Национальный костюм', quantity: 10, images: [] }
    ],
    'clothing-kids-shoes': [
        { name: 'Детские ботинки', sku: 'kids-shoes-001', initialPrice: '12.00', markupPercentage: 25, finalPrice: '15.00', discountPercentage: 0, status: 'Активный', description: 'Удобная обувь', quantity: 40, images: [] }
    ],
    'household-cleaning': [
        { name: 'Универсальный очиститель', sku: 'clean-001', initialPrice: '2.40', markupPercentage: 25, finalPrice: '3.00', discountPercentage: 0, status: 'Активный', description: 'Для всех поверхностей', quantity: 60, images: [] }
    ],
    'household-dishes': [
        { name: 'Набор тарелок', sku: 'dishes-001', initialPrice: '16.00', markupPercentage: 25, finalPrice: '20.00', discountPercentage: 0, status: 'Неактивный', quantity: 25, images: [] }
    ],
    'household-textile': [
        { name: 'Постельное белье', sku: 'textile-001', initialPrice: '20.00', markupPercentage: 25, finalPrice: '25.00', discountPercentage: 0, status: 'Активный', description: 'Хлопок', quantity: 30, images: [] }
    ],
    'electronics-phones': [
        { name: 'Смартфон X', sku: 'phone-001', initialPrice: '160.00', markupPercentage: 25, finalPrice: '200.00', discountPercentage: 0, status: 'Активный', description: 'Мощный смартфон', quantity: 5, images: [] }
    ],
    'electronics-lights': [
        { name: 'LED лампа', sku: 'light-001', initialPrice: '4.00', markupPercentage: 25, finalPrice: '5.00', discountPercentage: 0, status: 'Неактивный', description: 'Энергоэффективная', quantity: 70, images: [] }
    ],
    'electronics-small': [
        { name: 'Электрочайник', sku: 'small-001', initialPrice: '12.00', markupPercentage: 25, finalPrice: '15.00', discountPercentage: 0, status: 'Активный', description: 'Быстрый нагрев', quantity: 20, images: [] }
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
    const dashboardContainer = document.getElementById('dashboard-container');
    const tbody = document.getElementById('products-body');

    welcomeMessage.style.display = 'none';
    productsContainer.style.display = 'block';
    dashboardContainer.style.display = 'none';

    tbody.innerHTML = '';
    const products = productsData[category] || [];
    if (products.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4">Товары не найдены</td></tr>';
        return;
    }

    products.forEach((product, index) => {
        const row = document.createElement('tr');
        row.onclick = () => openSidebar('view', product, index);
        const discount = parseFloat(product.discountPercentage) || 0;
        const discountedPrice = discount > 0
            ? (parseFloat(product.finalPrice) * (1 - discount / 100)).toFixed(2)
            : null;
        row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.sku}</td>
            <td>
                ${discount > 0 ? `<span class="strikethrough-price">${product.finalPrice}</span> <span class="discounted-price">${discountedPrice}</span>` : product.finalPrice}
            </td>
            <td><span class="${product.status === 'Активный' ? 'status-active' : 'status-inactive'}">${product.status}</span></td>
        `;
        tbody.appendChild(row);
    });
}

function showSection(section) {
    const welcomeMessage = document.getElementById('welcome-message');
    const productsContainer = document.getElementById('products-container');
    const dashboardContainer = document.getElementById('dashboard-container');
    const menuItems = document.querySelectorAll('.menu-item');

    welcomeMessage.style.display = 'none';
    productsContainer.style.display = 'none';
    dashboardContainer.style.display = 'block';

    menuItems.forEach(item => item.classList.remove('active'));
    if (section === 'dashboard') {
        document.querySelector('a[onclick="showSection(\'dashboard\')"]').parentElement.classList.add('active');
    }
}

function openSidebar(mode, product = null, index = -1) {
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
            const discount = parseFloat(product.discountPercentage) || 0;
            const discountedPrice = discount > 0
                ? (parseFloat(product.finalPrice) * (1 - discount / 100)).toFixed(2)
                : product.finalPrice;
            panelBody.innerHTML = `
                <div class="form-card">
                    <div class="form-group">
                        <label>Изображения</label>
                        <div class="image-carousel">
                            <button class="carousel-arrow left" onclick="scrollCarousel('left')"><i class="fas fa-chevron-left"></i></button>
                            <div class="image-carousel-container" id="image-carousel">
                                ${product.images && product.images.length > 0 ? product.images.map(img => `
                                    <div class="image-carousel-item">
                                        <img src="${img}" alt="${product.name}" class="carousel-image">
                                    </div>
                                `).join('') : '<p>Изображения не загружены</p>'}
                            </div>
                            <button class="carousel-arrow right" onclick="scrollCarousel('right')"><i class="fas fa-chevron-right"></i></button>
                        </div>
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
                        <label>Цены</label>
                        <div class="price-info">
                            <p>Начальная: ${product.initialPrice}</p>
                            <p ${discount > 0 ? 'class="strikethrough-price"' : ''}>Итоговая: ${product.finalPrice}</p>
                            ${discount > 0 ? `<p class="discounted-price">Со скидкой: ${discountedPrice}</p>` : ''}
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Скидка</label>
                        <p>${product.discountPercentage}%</p>
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
            updateCarouselArrows();
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
                            <textarea name="description" placeholder="Описание" required></textarea>
                        </div>
                        <div class="form-group">
                            <label>Начальная цена</label>
                            <input type="number" step="0.01" name="initialPrice" placeholder="0.00" required>
                        </div>
                        <div class="form-group">
                            <label>Процент наценки (%)</label>
                            <input type="number" step="0.01" name="markupPercentage" placeholder="0" value="0">
                        </div>
                        <div class="form-group">
                            <label>Итоговая цена</label>
                            <input type="number" step="0.01" name="finalPrice" placeholder="0.00" required>
                        </div>
                        <div class="form-group">
                            <label>Скидка (%)</label>
                            <input type="number" step="0.01" name="discountPercentage" placeholder="0" value="0">
                        </div>
                        <div class="form-group">
                            <label>Количество</label>
                            <input type="number" name="quantity" placeholder="0" required>
                        </div>
                        <div class="form-group">
                            <label>Изображения</label>
                            <div class="file-upload">
                                <input type="file" name="images" accept="image/*" id="image-upload" multiple>
                                <label for="image-upload" class="file-label"><i class="fas fa-upload"></i> Выберите файлы</label>
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
            const form = document.getElementById('add-product-form');
            const initialPriceInput = form.querySelector('[name="initialPrice"]');
            const markupPercentageInput = form.querySelector('[name="markupPercentage"]');
            const finalPriceInput = form.querySelector('[name="finalPrice"]');
            const imageInput = form.querySelector('#image-upload');
            const preview = document.getElementById('image-preview');

            function updateFinalPrice() {
                const initialPrice = parseFloat(initialPriceInput.value) || 0;
                const markupPercentage = parseFloat(markupPercentageInput.value) || 0;
                const calculatedFinalPrice = initialPrice * (1 + markupPercentage / 100);
                finalPriceInput.value = calculatedFinalPrice.toFixed(2);
            }

            initialPriceInput.addEventListener('input', updateFinalPrice);
            markupPercentageInput.addEventListener('input', updateFinalPrice);

            imageInput.addEventListener('change', () => {
                preview.innerHTML = '';
                Array.from(imageInput.files).forEach((file, index) => {
                    if (file && file.type.startsWith('image/')) {
                        const reader = new FileReader();
                        reader.onload = function(e) {
                            const imgContainer = document.createElement('div');
                            imgContainer.className = 'image-preview-item';
                            imgContainer.innerHTML = `
                                <img src="${e.target.result}" alt="Preview ${index}" class="preview-image">
                                <i class="fas fa-times remove-image" data-index="${index}" onclick="removeImage(this)"></i>
                            `;
                            preview.appendChild(imgContainer);
                        };
                        reader.readAsDataURL(file);
                    }
                });
            });

            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                const name = form.querySelector('[name="name"]').value.trim();
                const sku = form.querySelector('[name="sku"]').value.trim();
                const initialPrice = form.querySelector('[name="initialPrice"]').value.trim();
                const markupPercentage = form.querySelector('[name="markupPercentage"]').value.trim();
                const finalPrice = form.querySelector('[name="finalPrice"]').value.trim();
                const discountPercentage = form.querySelector('[name="discountPercentage"]').value.trim();
                const quantity = form.querySelector('[name="quantity"]').value.trim();
                const description = form.querySelector('[name="description"]').value.trim();
                const images = [];

                if (!name || !sku || !initialPrice || !finalPrice || !quantity || !description) {
                    showSnackbar('Заполните обязательные поля', 'error');
                    return;
                }

                if (imageInput.files.length > 0) {
                    for (const file of imageInput.files) {
                        const dataUrl = await new Promise((resolve) => {
                            const reader = new FileReader();
                            reader.onload = (e) => resolve(e.target.result);
                            reader.readAsDataURL(file);
                        });
                        images.push(dataUrl);
                    }
                }

                const product = {
                    name,
                    sku,
                    initialPrice: parseFloat(initialPrice).toFixed(2),
                    markupPercentage: parseFloat(markupPercentage) || 0,
                    finalPrice: parseFloat(finalPrice).toFixed(2),
                    discountPercentage: parseFloat(discountPercentage) || 0,
                    status: form.querySelector('[name="status"]').checked ? 'Активный' : 'Неактивный',
                    description,
                    quantity: parseInt(quantity),
                    images
                };

                if (!productsData[activeCategory]) productsData[activeCategory] = [];
                productsData[activeCategory].push(product);
                showProducts(activeCategory);
                showSnackbar('Товар успешно добавлен', 'success');
                form.reset();
                preview.innerHTML = '';
                closeSidebar();
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
                            <label>Начальная цена</label>
                            <input type="number" step="0.01" name="initialPrice" value="${product.initialPrice}" required>
                        </div>
                        <div class="form-group">
                            <label>Процент наценки (%)</label>
                            <input type="number" step="0.01" name="markupPercentage" value="${product.markupPercentage || 0}">
                        </div>
                        <div class="form-group">
                            <label>Итоговая цена</label>
                            <input type="number" step="0.01" name="finalPrice" value="${product.finalPrice}" required>
                        </div>
                        <div class="form-group">
                            <label>Скидка (%)</label>
                            <input type="number" step="0.01" name="discountPercentage" value="${product.discountPercentage || 0}">
                        </div>
                        <div class="form-group">
                            <label>Количество</label>
                            <input type="number" name="quantity" value="${product.quantity}" required>
                        </div>
                        <div class="form-group">
                            <label>Изображения</label>
                            <div class="file-upload">
                                <input type="file" name="images" accept="image/*" id="image-upload" multiple>
                                <label for="image-upload" class="file-label"><i class="fas fa-upload"></i> Выберите файлы</label>
                                <div class="image-preview" id="image-preview">
                                    ${product.images && product.images.length > 0 ? product.images.map((img, idx) => `
                                        <div class="image-preview-item">
                                            <img src="${img}" alt="${product.name}" class="preview-image">
                                            <i class="fas fa-times remove-image" data-index="${idx}" onclick="removeExistingImage(this)"></i>
                                        </div>
                                    `).join('') : ''}
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
            const editForm = document.getElementById('edit-product-form');
            const editInitialPriceInput = editForm.querySelector('[name="initialPrice"]');
            const editMarkupPercentageInput = editForm.querySelector('[name="markupPercentage"]');
            const editFinalPriceInput = editForm.querySelector('[name="finalPrice"]');
            const editImageInput = editForm.querySelector('#image-upload');
            const editPreview = document.getElementById('image-preview');
            let existingImages = [...product.images] || [];

            function updateEditFinalPrice() {
                const initialPrice = parseFloat(editInitialPriceInput.value) || 0;
                const markupPercentage = parseFloat(editMarkupPercentageInput.value) || 0;
                const calculatedFinalPrice = initialPrice * (1 + markupPercentage / 100);
                editFinalPriceInput.value = calculatedFinalPrice.toFixed(2);
            }

            editInitialPriceInput.addEventListener('input', updateEditFinalPrice);
            editMarkupPercentageInput.addEventListener('input', updateEditFinalPrice);

            editImageInput.addEventListener('change', () => {
                const existingCount = existingImages.length;
                Array.from(editImageInput.files).forEach((file, index) => {
                    if (file && file.type.startsWith('image/')) {
                        const reader = new FileReader();
                        reader.onload = function(e) {
                            const imgContainer = document.createElement('div');
                            imgContainer.className = 'image-preview-item';
                            imgContainer.innerHTML = `
                                <img src="${e.target.result}" alt="Preview ${index}" class="preview-image">
                                <i class="fas fa-times remove-image" data-index="${existingCount + index}" data-isnew="true" onclick="removeImage(this)"></i>
                            `;
                            editPreview.appendChild(imgContainer);
                        };
                        reader.readAsDataURL(file);
                    }
                });
            });

            editForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const name = editForm.querySelector('[name="name"]').value.trim();
                const sku = editForm.querySelector('[name="sku"]').value.trim();
                const initialPrice = editForm.querySelector('[name="initialPrice"]').value.trim();
                const markupPercentage = editForm.querySelector('[name="markupPercentage"]').value.trim();
                const finalPrice = editForm.querySelector('[name="finalPrice"]').value.trim();
                const discountPercentage = editForm.querySelector('[name="discountPercentage"]').value.trim();
                const quantity = editForm.querySelector('[name="quantity"]').value.trim();
                const description = editForm.querySelector('[name="description"]').value.trim();
                const images = [...existingImages];

                if (!name || !sku || !initialPrice || !finalPrice || !quantity || !description) {
                    showSnackbar('Заполните обязательные поля', 'error');
                    return;
                }

                if (editImageInput.files.length > 0) {
                    for (const file of editImageInput.files) {
                        const dataUrl = await new Promise((resolve) => {
                            const reader = new FileReader();
                            reader.onload = (e) => resolve(e.target.result);
                            reader.readAsDataURL(file);
                        });
                        images.push(dataUrl);
                    }
                }

                const updatedProduct = {
                    name,
                    sku,
                    initialPrice: parseFloat(initialPrice).toFixed(2),
                    markupPercentage: parseFloat(markupPercentage) || 0,
                    finalPrice: parseFloat(finalPrice).toFixed(2),
                    discountPercentage: parseFloat(discountPercentage) || 0,
                    status: editForm.querySelector('[name="status"]').checked ? 'Активный' : 'Неактивный',
                    description,
                    quantity: parseInt(quantity),
                    images
                };

                if (selectedProductIndex !== -1) {
                    productsData[activeCategory][selectedProductIndex] = updatedProduct;
                }
                showProducts(activeCategory);
                showSnackbar('Товар успешно сохранён', 'success');
                editForm.reset();
                editPreview.innerHTML = '';
                closeSidebar();
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

function scrollCarousel(direction) {
    const container = document.getElementById('image-carousel');
    const scrollAmount = container.clientWidth;
    if (direction === 'left') {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
    setTimeout(updateCarouselArrows, 300);
}

function updateCarouselArrows() {
    const container = document.getElementById('image-carousel');
    const leftArrow = document.querySelector('.carousel-arrow.left');
    const rightArrow = document.querySelector('.carousel-arrow.right');
    if (!container || !leftArrow || !rightArrow) return;

    const maxScroll = container.scrollWidth - container.clientWidth;
    leftArrow.style.display = container.scrollLeft > 0 ? 'flex' : 'none';
    rightArrow.style.display = container.scrollLeft < maxScroll ? 'flex' : 'none';
}

function removeImage(element) {
    const index = parseInt(element.dataset.index);
    const isNew = element.dataset.isnew === 'true';
    const imageInput = document.getElementById('image-upload');
    if (isNew) {
        const files = Array.from(imageInput.files);
        files.splice(index - (files.length - imageInput.files.length), 1);
        const dataTransfer = new DataTransfer();
        files.forEach(file => dataTransfer.items.add(file));
        imageInput.files = dataTransfer.files;
    }
    element.parentElement.remove();
}

function removeExistingImage(element) {
    const index = parseInt(element.dataset.index);
    const editForm = document.getElementById('edit-product-form');
    if (editForm) {
        const images = productsData[activeCategory][selectedProductIndex].images;
        images.splice(index, 1);
        element.parentElement.remove();
    }
}

function closeSidebar() {
    const panel = document.getElementById('sidebar-panel');
    panel.classList.remove('active');
    const form = document.getElementById('add-product-form') || document.getElementById('edit-product-form');
    if (form) {
        form.reset();
        const preview = document.getElementById('image-preview');
        if (preview) preview.innerHTML = '';
    }
}

function showSnackbar(message, type) {
    const snackbar = document.getElementById('snackbar');
    snackbar.textContent = message;
    snackbar.className = `show ${type}`;
    setTimeout(() => {
        snackbar.className = snackbar.className.replace('show', '');
    }, 3000);
}

function editProduct() {
    if (selectedProduct && selectedProductIndex !== -1) {
        openSidebar('edit', selectedProduct, selectedProductIndex);
    }
}

function confirmDelete() {
    if (selectedProductIndex !== -1 && activeCategory) {
        productsData[activeCategory].splice(selectedProductIndex, 1);
        showProducts(activeCategory);
        showSnackbar('Товар успешно удалён', 'success');
        closeModal();
        closeSidebar();
        selectedProduct = null;
        selectedProductIndex = -1;
    }
}

function closeModal() {
    const modal = document.getElementById('delete-modal');
    modal.classList.remove('active');
}

function logout() {
    localStorage.removeItem('isAuthenticated');
    window.location.href = 'auth.html';
}