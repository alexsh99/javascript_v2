class BasketList {
    constructor() {
        this.products = [];
    }
    addProduct(){

    }
    delProduct(){

    }
    getSum(){

    }
    getCount(){

    }
}

class BasketItem {
    render(){

    }
}

class ProductList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this._fetchProducts();
    }

    _fetchProducts(){
        this.goods = [
            {id: 1, title: "Notebook", price: 2000, img: 'notebook.jpg', desk: 'Быстрый ноутбук'},
            {id: 2, title: 'Mouse', price: 20, img: 'mouse.jpg', desk: 'Отличная мышка'},
            {id: 3, title: 'Keyboard', price: 200, img: 'keyboard.jpg'},
            {id: 4, title: 'Gamepad', price: 50, img: 'gamepad.jpg', desk: 'Удобный геймпад'},
        ];
    }

    getFullPrice(){
        return this.goods.reduce((a, p) => a + p.price, 0);
    }

    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods){
            const productObj = new ProductItem(product);
            block.insertAdjacentHTML('beforeend', productObj.render());
        }
    }
}


class ProductItem {
    constructor(product) {
        this.id = product.id;
        this.title = product.title;
        this.price = product.price;
        this.img = product.img;
        this.desk = product.desk;
    }

    render(){
        return `<div class="product-item" data-id="${this.id}">
                <img src="img/${this.img ?? "no-image.jpg"}" alt="">
                <h3>${this.title ?? "Название продукта"}</h3>
                <p class="desk">${this.desk ?? 'Краткое описание'}</p>
                <p class="price">${this.price ?? "Халява сэр!!!"}</p>
                <button class="buy-btn">Купить</button>
            </div>`
    }
}

let page = new ProductList();
page.render();