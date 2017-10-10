import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText, Col } from 'reactstrap';

import * as CustomerActions from '../../actions/customerActions'

export default class DeleteCustomers extends React.Component{
  
  constructor(props){
    super(props);
    this.state = {
      modal: false,
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.deleteCustomer = this.deleteCustomer.bind(this);
  }
  
  toggleModal() {
    this.setState({
      modal: !this.state.modal
    });
  }
  
  deleteCustomer(){    
    CustomerActions.deleteCustomer(this.props.customer.id);
    this.props.parentMethod();
  }
  
  
  render(){

    return(
      <div>
      
      <Modal isOpen={this.props.isOpen} toggle={this.toggleModal} className={this.props.className}>
        <ModalHeader toggle={this.toggleModal}>Delete Customer</ModalHeader>
        <ModalBody>
          Are you sure?
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.deleteCustomer}>Deletee Customer</Button>{' '}
          <Button color="secondary" onClick={this.props.parentMethod}>Cancel</Button>
        </ModalFooter>
      </Modal>
      </div>
    )
  }
}