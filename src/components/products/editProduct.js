import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText, Col } from 'reactstrap';

import * as ProductActions from '../../actions/productActions'

export default class EditProduct extends React.Component{
  
  constructor(props){
    super(props);
    this.state = {
      modal: false,
      productName: '',
      productPrice: ''
    };
    this.product = {name:'', price: ''};
    this.toggleModal = this.toggleModal.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.updateProduct = this.updateProduct.bind(this);
  }
  
  toggleModal() {
    this.setState({
      modal: !this.state.modal
    });
  }
  
  updateProduct(){    
    ProductActions.updateProduct({name: this.state.productName || this.props.product.name, price: this.state.productPrice || this.props.product.price, id: this.props.product.id});
    this.props.parentMethod();
  }
  
  
  handlePriceChange(e){
    this.setState({
      productPrice: e.target.value
    });
  }
  
  handleNameChange(e){
    this.setState({
      productName: e.target.value
    });

  }
  
  render(){

    return(
      <div>
      
      <Modal isOpen={this.props.isOpen} toggle={this.toggleModal} className={this.props.className}>
        <ModalHeader toggle={this.toggleModal}>Edit Product</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup row>
              <Label for="exampleEmail" sm={2}>Name</Label>
              <Col sm={10}>
                <Input type="email" name="name" defaultValue={this.props.product.name || ''}  onChange={this.handleNameChange} id="productName" placeholder="Product Name" />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="exampleEmail" sm={2}>Price</Label>
              <Col sm={10}>
                <Input type="email" name="price" defaultValue={this.props.product.price || ''} onChange={this.handlePriceChange} id="productPrices" placeholder="Add Product Price" />
              </Col>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.updateProduct}>Update Product</Button>{' '}
          <Button color="secondary" onClick={this.props.parentMethod}>Cancel</Button>
        </ModalFooter>
      </Modal>
      </div>
    )
  }
}