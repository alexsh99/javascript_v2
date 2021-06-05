const products = [
    {id: 1, title: "Notebook", price: 2000, icon: 'notebook.jpg', desk: 'Быстрый ноутбук'},
    {id: 2, title: 'Mouse', price: 20, icon: 'mouse.jpg', desk: 'Отличная мышка'},
    {id: 3, title: 'Keyboard', price: 200, icon: 'keyboard.jpg'},
    {id: 4, title: 'Gamepad', price: 50, icon: 'gamepad.jpg', desk: 'Удобный геймпад'},
    {}

];
//Функция для формирования верстки каждого товара
//Добавить в выводе изображение
const renderProduct = (product) => {
    return `<div class="product-item">
                <img src="img/${product.icon ?? "no-image.jpg"}" alt="">
                <h3>${product.title ?? "Название продукта"}</h3>
                <p class="desk">${product.desk ?? 'Краткое описание'}</p>
                <p class="price">${product.price ?? "Халява сэр!!!"}</p>
                <button class="buy-btn">Купить</button>
            </div>`
};
const renderPage = list => {
    const productsList = list.map(item => renderProduct(item));
    console.log(productsList);
    document.querySelector('.products').innerHTML = productsList.join('');
};

renderPage(products);
