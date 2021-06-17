const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/';

class BasketList {
    constructor(container = '.basket_table') {
        this.container = container;
        this.products = [];
        this.amount = 0;
        this.countGoods = 0;
        this._fetchProducts()
            .then(data => {
                this.amount = data.amount;
                this.countGoods = data.countGoods;
                for (let product of data.contents){
                    this.products.push(new BasketItem(product));
                }
                this.render();
            })
    }
    _fetchProducts(){
        return fetch(`${API}getBasket.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }
    render() {
        const block = document.querySelector(this.container);
        const badge = document.querySelector('.badge');
        let list = "";
        for (let product of this.products){
            list += product.render();
        }
        block.innerHTML = list;
        badge.innerHTML = this.countGoods;
        block.insertAdjacentHTML('beforeend', `<tr class="text-center"><td colspan="2">Сумма: </td><td>${this.amount}</td></tr>`);
    }

    deleteItem(id){
        let item_index = this.products.findIndex(i => i.id_product === id);
        if (item_index !== -1){
            this.amount -= this.products[item_index].getSum();
            this.products.splice(item_index, 1);
            this.countGoods -= 1;
            this.render();
        }
    }

    addItem(item){
        let item_index = this.products.findIndex(i => i.id_product === item.id_product);
        if (item_index === -1){
            let new_item = new BasketItem(item);
            new_item.quantity = 1;
            this.products.push(new_item);
            this.amount += new_item.price;
            this.countGoods += 1;
        } else {
            this.products[item_index].quantity += 1;
            this.amount += this.products[item_index].price;
        }
        this.render();
    }
}

class BasketItem {
    constructor(item) {
        this.id_product = item.id_product;
        this.product_name = item.product_name;
        this.price = item.price;
        this.quantity = item.quantity;
    }
    render(){
        return `<tr class="text-center" data-id="${this.id_product}">
                        <td>${this.product_name}</td>
                        <td>${this.price}</td>
                        <td>${this.quantity}</td>
                        <td>${this.getSum()}</td>
                        <td><a href="#" class="delete" onclick="del(${this.id_product})">Х</a></td>
                    </tr>`
    }
    getSum(){
        return this.quantity * this.price;
    }
}

class ProductList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this._fetchProducts()
            .then(data => {
                this.goods = [...data];
                this.render();
            })
    }

    _fetchProducts(){
        return fetch(`${API}catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }

    getFullPrice(){
        return this.goods.reduce((a, p) => a + p.price, 0);
    }

    getProduct(id){
        return this.goods.find(i => i.id_product === id);
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
        this.id = product.id_product;
        this.title = product.product_name;
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
                <button type="button" class="btn btn-success buy" onclick="buy(${this.id})">Купить</button>
            </div>`
    }
}

let page = new ProductList();
let basket = new BasketList();
page.render();
function buy(id){
    basket.addItem(page.getProduct(id));
}
function del(id) {
    basket.deleteItem(id);
}