import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText, Col } from 'reactstrap';

import * as CustomerActions from '../../actions/customerActions'

export default class EditCustomers extends React.Component{
  
  constructor(props){
    super(props);
    this.state = {
      modal: false,
      customerName: '',
      customerAddres: '',
      customerPhone: '',
    };
    this.customer = {name:'', address: '', phone: ''};
    this.toggleModal = this.toggleModal.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
    this.updateCustomer = this.updateCustomer.bind(this);
  }
  
  toggleModal() {
    this.setState({
      modal: !this.state.modal
    });
  }
  
  updateCustomer(){    
    CustomerActions.updateCustomer({name: this.state.customerName || this.props.customer.name, address: this.state.customerAddress || this.props.customer.address, phone: this.state.customerPhone || this.props.customer.phone, id: this.props.customer.id});
    this.props.parentMethod();
  }
  
  handlePhoneChange(e){
    this.setState({
      customerPhone: e.target.value
    });
  }
  
  handleAddressChange(e){
    this.setState({
      customerAddress: e.target.value
    });
  }
  
  handleNameChange(e){
    this.setState({
      customerName: e.target.value
    });

  }
  
  render(){

    return(
      <div>
      
      <Modal isOpen={this.props.isOpen} toggle={this.toggleModal} className={this.props.className}>
        <ModalHeader toggle={this.toggleModal}>Edit Customer</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup row>
              <Label for="exampleEmail" sm={2}>Name</Label>
              <Col sm={10}>
                <Input type="email" name="name" defaultValue={this.props.customer.name || ''}  onChange={this.handleNameChange} id="customerName" placeholder="Customer Name" />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="exampleEmail" sm={2}>Address</Label>
              <Col sm={10}>
                <Input type="email" name="address" defaultValue={this.props.customer.address || ''} onChange={this.handleAddressChange} id="customerAddres" placeholder="Add Customer Address" />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="exampleEmail" sm={2}>Phone</Label>
              <Col sm={10}>
                <Input type="email" name="phone" defaultValue={this.props.customer.phone || ''} onChange={this.handlePhoneChange} id="customerPhone" placeholder="Add Customer Phone" />
              </Col>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.updateCustomer}>Update Customer</Button>{' '}
          <Button color="secondary" onClick={this.props.parentMethod}>Cancel</Button>
        </ModalFooter>
      </Modal>
      </div>
    )
  }
}