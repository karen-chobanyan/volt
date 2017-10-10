import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText, Col } from 'reactstrap';

import * as ProductActions from '../../actions/productActions'

export default class DeleteProduct extends React.Component{
  
  constructor(props){
    super(props);
    this.state = {
      modal: false,
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
  }
  
  toggleModal() {
    this.setState({
      modal: !this.state.modal
    });
  }
  
  deleteProduct(){    
    ProductActions.deleteProduct(this.props.product.id);
    this.props.parentMethod();
  }
  
  
  render(){

    return(
      <div>
      
      <Modal isOpen={this.props.isOpen} toggle={this.toggleModal} className={this.props.className}>
        <ModalHeader toggle={this.toggleModal}>Delete Product</ModalHeader>
        <ModalBody>
          Are you sure?
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.deleteProduct}>Deletee Product</Button>{' '}
          <Button color="secondary" onClick={this.props.parentMethod}>Cancel</Button>
        </ModalFooter>
      </Modal>
      </div>
    )
  }
}