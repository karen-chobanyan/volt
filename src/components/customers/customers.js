import React from 'react';
import CustomerStore from '../../stores/customerStore'
import Customer from './customer'
import AddCustomer from './addCustomer'
import EditCustomer from './editCustomer'
import DeleteCustomer from './deleteCustomer'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default class Customers extends React.Component{
  constructor(){
    super();
    document.title = 'Customers';
    this.getCustomers = this.getCustomers.bind(this);
    this.state = {
      customers: CustomerStore.getAll(),
      addModal: false,
      eCustomer: {}
    };
    this.toggleAddModal = this.toggleAddModal.bind(this);
    this.toggleEditModal = this.toggleEditModal.bind(this);
    this.toggleDeleteModal = this.toggleDeleteModal.bind(this);
    this.editCustomer = this.editCustomer.bind(this);
    this.deleteCustomer = this.deleteCustomer.bind(this);
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
    CustomerStore.on('change', this.getCustomers);
  }
  
  componentWillUnmount(){
    CustomerStore.removeListener('change', this.getCustomers);
  }

getCustomers(){
  this.setState({
    customers: CustomerStore.getAll()
  })
}

editCustomer(customer){
  this.setState({
    editModal: !this.state.editModal
  });
  this.setState({
    eCustomer: customer
  });
  // console.log(this.state.eCustomer);
}

deleteCustomer(customer){
  this.setState({
    deleteModal: !this.state.deleteModal
  });
  this.setState({
    dCustomer: customer
  });
}
  
  render(){
    const { customers } = this.state;
    let CustomerComponents;
    if(!!customers){
      CustomerComponents = customers.map((customer, index) => {
         return <Customer parentEditMethod={this.editCustomer} parentDeleteMethod={this.deleteCustomer}key={index} {...customer}/>
      })
    }
    
    return(
      <div className="col-sm-12">
        <h1 className="pull-left">Customer List </h1>
        <Button color="success" onClick={this.toggleAddModal}>Create</Button>
        <AddCustomer isOpen={this.state.addModal} parentMethod={this.toggleAddModal}/>
        <EditCustomer isOpen={this.state.editModal} customer={this.state.eCustomer} parentMethod={this.toggleEditModal}/>
        <DeleteCustomer isOpen={this.state.deleteModal} customer={this.state.dCustomer} parentMethod={this.toggleDeleteModal}/>
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          {CustomerComponents}
        </tbody>
      </table>
      
      </div>    
      
    );
  }
  
}