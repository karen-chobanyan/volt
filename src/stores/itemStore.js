import {EventEmitter} from 'events';
import Dispatcher from '../dispatcher';
import axios from 'axios';

class ItemStore extends EventEmitter {
    constructor() {
        super();
        this.items = [];
        axios.get(`/api/invoices/items`).then(res => {
           console.log(res.data);
          this.items = res.data;
          this.emit('change');
        });
    }
    
    createItem(item){
      axios.post(`/api/`+item.invoice_id+`/items`, item).then(res => {
        console.log(res.data);
        this.items.push(res.data);
        this.emit('change');
      });
    }
    
    updateItem(item){
      axios.put(`/api/items/`+item.id, item).then(res => {
        console.log(res.data);
        axios.get(`/api/items`).then(res => {
          // console.log(res.data);
          this.items = res.data;
          this.emit('change');
        });
      });
    }
    
    deleteItem(id){
      axios.delete(`/api/items/`+id).then(res => {
        console.log(res.data);
        axios.get(`/api/items`).then(res => {
          // console.log(res.data);
          this.items = res.data;
          this.emit('change');
        });
      });
    }

    getAll() {
      // console.log(this.items);
      return this.items;
    }
    
    handleActions(action){
      console.log(action);
      switch (action.type) {
        case 'CREATE_INVOICE':
          this.createItem(action.item);
        case 'UPDATE_INVOICE':
          this.updateItem(action.item);
        case 'DELTE_INVOICE':
            this.deleteItem(action.id);
          break;
        default:
          
      }
    }
}

const itemStore = new ItemStore;
Dispatcher.register(itemStore.handleActions.bind(itemStore));

export default itemStore;