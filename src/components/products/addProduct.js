import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText, Col } from 'reactstrap';

import * as ProductActions from '../../actions/productActions'

export default class AddProduct extends React.Component{
  
  constructor(){
    super();
    this.state = {
      modal: false,   
    };
    this.product = {} 
    this.toggleModal = this.toggleModal.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePricesChange = this.handlePricesChange.bind(this);
    this.createProduct = this.createProduct.bind(this);
  }
  
  toggleModal() {
    this.setState({
      modal: !this.state.modal
    });
  }
  
  createProduct(){
    ProductActions.createProduct(this.product);
    this.props.parentMethod();
  }
  
  handlePricesChange(e){
    this.product.price = e.target.value;
  }
  
  handleNameChange(e){
    this.product.name = e.target.value;
  }
  
  render(){
    return(
      <div>
      
      <Modal isOpen={this.props.isOpen} toggle={this.toggleModal} className={this.props.className}>
        <ModalHeader toggle={this.toggleModal}>Create New Product</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup row>
              <Label for="exampleEmail" sm={2}>Name</Label>
              <Col sm={10}>
                <Input type="email" name="name" onChange={this.handleNameChange} id="productName" placeholder="Product Name" />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="exampleEmail" sm={2}>Prices</Label>
              <Col sm={10}>
                <Input type="email" name="name" onChange={this.handlePricesChange} id="productPrice" placeholder="Add Product Prices" />
              </Col>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.createProduct}>Add Product</Button>{' '}
          <Button color="secondary" onClick={this.props.parentMethod}>Cancel</Button>
        </ModalFooter>
      </Modal>
      </div>
    )
  }
}