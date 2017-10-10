import React from 'react';
import InvoiceStore from '../../stores/invoiceStore'
import CustomerStore from '../../stores/customerStore'
import Invoice from './invoice'
import AddInvoice from './addInvoice'
import EditInvoice from './editInvoice'
import DeleteInvoice from './deleteInvoice'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default class Invoices extends React.Component{
  constructor(){
    super();
    document.title = 'Invoices';    
    this.state = {
      invoices: InvoiceStore.getAll(),
      customers: CustomerStore.getAll(),
      addModal: false,
      eInvoice: {}
    };
    this.getInvoices = this.getInvoices.bind(this);
    this.getCustomers = this.getCustomers.bind(this);
    this.toggleAddModal = this.toggleAddModal.bind(this);
    this.toggleEditModal = this.toggleEditModal.bind(this);
    this.toggleDeleteModal = this.toggleDeleteModal.bind(this);
    this.editInvoice = this.editInvoice.bind(this);
    this.deleteInvoice = this.deleteInvoice.bind(this);
  }
  toggleAddModal() {
    this.setState({
      addModal: !this.state.addModal
    });
  }
  toggleEditModal() {
    this.setState({
      editModal: !this.state.editModal
    });
  }
  toggleDeleteModal() {
    this.setState({
      deleteModal: !this.state.deleteModal
    });
  }
  componentWillMount(){
    InvoiceStore.on('change', this.getInvoices);
    CustomerStore.on('change', this.getCustomers);
  }
  
  componentWillUnmount(){
    InvoiceStore.removeListener('change', this.getInvoices);
    InvoiceStore.removeListener('change', this.getInvoices);
  }

getInvoices(){
  this.setState({
    invoices: InvoiceStore.getAll()
  })
}
getCustomers(){
  this.setState({
    customers: CustomerStore.getAll()
  })
}

editInvoice(invoice){
  this.setState({
    editModal: !this.state.editModal
  });
  this.setState({
    eInvoice: invoice
  });
}

deleteInvoice(invoice){
  this.setState({
    deleteModal: !this.state.deleteModal
  });
  this.setState({
    dInvoice: invoice
  });
}
  
  render(){
    const { invoices } = this.state;
    let InvoiceComponents;
    if(!!invoices){
      InvoiceComponents = invoices.map((invoice, index) => {
         return <Invoice parentEditMethod={this.editInvoice} customerName={this.state.customers.filter(( itm ) => { return itm.id == invoice.customer_id; })[0].name} parentDeleteMethod={this.deleteInvoice} key={index} {...invoice}/>
      })
    }
    
    return(
      <div className="col-sm-12">
        <h1 className="pull-left">Invoice List </h1>
        <Button color="success" onClick={this.toggleAddModal} className='pull-right'>Create</Button>
        <AddInvoice isOpen={this.state.addModal} parentMethod={this.toggleAddModal}/>
        <EditInvoice isOpen={this.state.editModal} invoice={this.state.eInvoice} parentMethod={this.toggleEditModal}/>
        <DeleteInvoice isOpen={this.state.deleteModal} invoice={this.state.dInvoice} parentMethod={this.toggleDeleteModal}/>
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Customer</th>
              <th>Discount</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          {InvoiceComponents}
        </tbody>
      </table>
      
      </div>    
      
    );
  }
  
}