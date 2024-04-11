export default class ProductService {
    getProducts() {
        return fetch('demo/data/products.json')
            .then((res) => res.json())
            .then((d) => d);
    }
}
