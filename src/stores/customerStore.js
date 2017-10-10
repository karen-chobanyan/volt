import {EventEmitter} from 'events';
import Dispatcher from '../dispatcher';
import axios from 'axios';

class CustomerStore extends EventEmitter {
    constructor() {
        super();
        this.customers = [];
        axios.get(`/api/customers`).then(res => {
          // console.log(res.data);
          this.customers = res.data;
          this.emit('change');
        });
    }
    
    createCustomer(customer){
      axios.post(`/api/customers`, customer).then(res => {
        console.log(res.data);
        this.customers.push(res.data);
        this.emit('change');
      });
    }
    
    updateCustomer(customer){
      axios.put(`/api/customers/`+customer.id, customer).then(res => {
        console.log(res.data);
        axios.get(`/api/customers`).then(res => {
          // console.log(res.data);
          this.customers = res.data;
          this.emit('change');
        });
      });
    }
    
    deleteCustomer(id){
      axios.delete(`/api/customers/`+id).then(res => {
        console.log(res.data);
        axios.get(`/api/customers`).then(res => {
          // console.log(res.data);
          this.customers = res.data;
          this.emit('change');
        });
      });
    }

    getAll() {
      // console.log(this.customers);
      return this.customers;
    }
    
    handleActions(action){
      console.log(action);
      switch (action.type) {
        case 'CREATE_CUSTOMER':
          this.createCustomer(action.customer);
        case 'UPDATE_CUSTOMER':
          this.updateCustomer(action.customer);
        case 'DELTE_CUSTOMER':
            this.deleteCustomer(action.id);
          break;
        default:
          
      }
    }
}

const clientStore = new CustomerStore;
Dispatcher.register(clientStore.handleActions.bind(clientStore));

export default clientStore;