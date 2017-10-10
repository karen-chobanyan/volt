import {EventEmitter} from 'events';
import Dispatcher from '../dispatcher';
import axios from 'axios';

class ProductStore extends EventEmitter {
    constructor() {
        super();
        this.products = [];
        axios.get(`/api/products`).then(res => {
          // console.log(res.data);
          this.products = res.data;
          this.emit('change');
        });
    }
    
    createProduct(product){
      axios.post(`/api/products`, product).then(res => {
        console.log(res.data);
        this.products.push(res.data);
        this.emit('change');
      });
    }
    
    updateProduct(product){
      axios.put(`/api/products/`+product.id, product).then(res => {
        console.log(res.data);
        axios.get(`/api/products`).then(res => {
          this.products = res.data;
          this.emit('change');
        });
      });
    }
    
    deleteProduct(id){
      axios.delete(`/api/products/`+id).then(res => {
        console.log(res.data);
        axios.get(`/api/products`).then(res => {
          // console.log(res.data);
          this.products = res.data;
          this.emit('change');
        });
      });
    }

    getAll() {
      // console.log(this.products);
      return this.products;
    }
    
    handleActions(action){
      console.log(action);
      switch (action.type) {
        case 'CREATE_PRODUCT':
          this.createProduct(action.product);
        case 'UPDATE_PRODUCT':
          this.updateProduct(action.product);
        case 'DELTE_PRODUCT':
            this.deleteProduct(action.id);
          break;
        default:
          
      }
    }
}

const productStore = new ProductStore;
Dispatcher.register(productStore.handleActions.bind(productStore));

export default productStore;