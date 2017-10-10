import {EventEmitter} from 'events';
import Dispatcher from '../dispatcher';
import axios from 'axios';

class InvoiceStore extends EventEmitter {
    constructor() {
        super();
        this.invoices = [];
        axios.get(`/api/invoices`).then(res => {
           console.log(res.data);
          this.invoices = res.data;
          this.emit('change');
        });
    }
    
    createInvoice(invoice){
      axios.post(`/api/invoices`, invoice).then(res => {
        console.log(res.data);
        this.invoices.push(res.data);
        this.emit('change');
      });
    }
    
    updateInvoice(invoice){
      axios.put(`/api/invoices/`+invoice.id, invoice).then(res => {
        console.log(res.data);
        axios.get(`/api/invoices`).then(res => {
          // console.log(res.data);
          this.invoices = res.data;
          this.emit('change');
        });
      });
    }
    
    deleteInvoice(id){
      axios.delete(`/api/invoices/`+id).then(res => {
        console.log(res.data);
        axios.get(`/api/invoices`).then(res => {
          // console.log(res.data);
          this.invoices = res.data;
          this.emit('change');
        });
      });
    }

    getAll() {
      // console.log(this.invoices);
      return this.invoices;
    }
    
    handleActions(action){
      console.log(action);
      switch (action.type) {
        case 'CREATE_INVOICE':
          this.createInvoice(action.invoice);
        case 'UPDATE_INVOICE':
          this.updateInvoice(action.invoice);
        case 'DELTE_INVOICE':
            this.deleteInvoice(action.id);
          break;
        default:
          
      }
    }
}

const invoiceStore = new InvoiceStore;
Dispatcher.register(invoiceStore.handleActions.bind(invoiceStore));

export default invoiceStore;