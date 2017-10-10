import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText, Col } from 'reactstrap';

import * as CustomerActions from '../../actions/customerActions'

export default class AddCustomers extends React.Component{
  
  constructor(){
    super();
    this.state = {
      modal: false,   
    };
    this.customer = {} 
    this.toggleModal = this.toggleModal.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
    this.createCustomer = this.createCustomer.bind(this);
  }
  
  toggleModal() {
    this.setState({
      modal: !this.state.modal
    });
  }
  
  createCustomer(){
    CustomerActions.createCustomer(this.customer);
    this.props.parentMethod();
  }
  
  handlePhoneChange(e){
    this.customer.phone = e.target.value;
  }
  
  handleAddressChange(e){
    this.customer.address = e.target.value;
  }
  
  handleNameChange(e){
    this.customer.name = e.target.value;
  }
  
  render(){
    return(
      <div>
      
      <Modal isOpen={this.props.isOpen} toggle={this.toggleModal} className={this.props.className}>
        <ModalHeader toggle={this.toggleModal}>Create New Customer</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup row>
              <Label for="exampleEmail" sm={2}>Name</Label>
              <Col sm={10}>
                <Input type="email" name="name" onChange={this.handleNameChange} id="customerName" placeholder="Customer Name" />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="exampleEmail" sm={2}>Address</Label>
              <Col sm={10}>
                <Input type="email" name="name" onChange={this.handleAddressChange} id="customerAddres" placeholder="Add Customer Address" />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="exampleEmail" sm={2}>Phone</Label>
              <Col sm={10}>
                <Input type="email" name="name" onChange={this.handlePhoneChange} id="customerPhone" placeholder="Add Customer Phone" />
              </Col>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.createCustomer}>Add Customer</Button>{' '}
          <Button color="secondary" onClick={this.props.parentMethod}>Cancel</Button>
        </ModalFooter>
      </Modal>
      </div>
    )
  }
}