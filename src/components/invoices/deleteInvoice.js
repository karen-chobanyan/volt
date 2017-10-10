import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText, Col } from 'reactstrap';

import * as InvoiceActions from '../../actions/invoiceActions'

export default class DeleteInvoices extends React.Component{
  
  constructor(props){
    super(props);
    this.state = {
      modal: false,
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.deleteInvoice = this.deleteInvoice.bind(this);
  }
  
  toggleModal() {
    this.setState({
      modal: !this.state.modal
    });
  }
  
  deleteInvoice(){    
    InvoiceActions.deleteInvoice(this.props.invoice.id);
    this.props.parentMethod();
  }
  
  
  render(){

    return(
      <div>
      
      <Modal isOpen={this.props.isOpen} toggle={this.toggleModal} className={this.props.className}>
        <ModalHeader toggle={this.toggleModal}>Delete Invoice</ModalHeader>
        <ModalBody>
          Are you sure?
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.deleteInvoice}>Deletee Invoice</Button>{' '}
          <Button color="secondary" onClick={this.props.parentMethod}>Cancel</Button>
        </ModalFooter>
      </Modal>
      </div>
    )
  }
}