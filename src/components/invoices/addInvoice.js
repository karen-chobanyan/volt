import React from 'react';
import CustomerStore from '../../stores/customerStore'
import ProductStore from '../../stores/productStore'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText, Col } from 'reactstrap';

import * as InvoiceActions from '../../actions/invoiceActions'
import * as ItemActions from '../../actions/itemActions'

export default class AddInvoices extends React.Component{
  
  constructor(){
    super();
    this.state = {
      ItemList: [],
      modal: false,  
      customers: CustomerStore.getAll(), 
      products: ProductStore.getAll(),
      items: [],
      total: 0
    };

    this.invoice = {};
    this.item = {};
    this.toggleModal = this.toggleModal.bind(this);
    this.handleCustomerChange = this.handleCustomerChange.bind(this);
    this.handleProductChange = this.handleProductChange.bind(this);
    this.createInvoice = this.createInvoice.bind(this);
    this.getCustomers = this.getCustomers.bind(this);
    this.getProducts = this.getProducts.bind(this);
    this.addItem = this.addItem.bind(this);
  }
  
  componentWillMount(){
    CustomerStore.on('change', this.getCustomers);
    ProductStore.on('change', this.getProducts);
  }
  
  componentWillUnmount(){
    CustomerStore.removeListener('change', this.getCustomers);
    ProductStore.removeListener('change', this.getProducts);
  }

getCustomers(){
  this.setState({
    customers: CustomerStore.getAll()
  })
}

getProducts(){
  this.setState({
    products: ProductStore.getAll()
  })
}
  
  toggleModal() {
    this.setState({
      modal: !this.state.modal
    });
  }
  
  createInvoice(){
    InvoiceActions.createInvoice(this.invoice);
    for (var i = 0; i < this.state.items.length; i++) {
      ItemActions.createItem(this.state.items[i]);
      console.log(this.state.items[i]);
    }
    this.props.parentMethod();
  }
  
  handleCustomerChange(e){
    this.invoice.customer_id = e.target.value;
  }
  
  handleProductChange(e){
    let id = e.target.value;
    this.item = this.state.products.filter(( itm ) => { return itm.id == id; })[0];
    // console.log(item);
  }
  
  addItem(){
    let item = this.item;
    this.state.items.push(item);
    this.setState({
      items: this.state.items
    });
    console.log(this.state.items);
    const { items } = this.state;
    this.state.total += this.item.price;
    this.invoice.total = this.state.total;
    this.state.ItemList = this.state.items.map((item, index) => {      
       return <tr key={index}><td>{item.name}</td><td>{item.price}</td><td><input type='number' defaultValue='1'/></td></tr>          
    })
  }
  
  
  render(){
        const { customers } = this.state;
        let CustomerList;
        if(!!customers){
          CustomerList = customers.map((customer, index) => {
             return <option key={index} value={customer.id}>{customer.name}</option>
          })
        }
        
        const { products } = this.state;
        let ProductList;
        if(!!products){
          ProductList = products.map((product, index) => {
             return <option key={index} value={product.id}>{product.name}</option>
          })
        }
        

        
    return(
      <div>
      
      <Modal isOpen={this.props.isOpen} toggle={this.toggleModal} className='modal-lg'>
        <ModalHeader toggle={this.toggleModal}>Create New Invoice</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup row>
              <Label for="exampleEmail" sm={2}>Discount</Label>
              <Col sm={10}>
                <Input type="text" name="name" defaultValue='0' onChange={this.handleDiscountChange} id="invoiceAddres" placeholder="Discount" />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="exampleEmail" sm={2}>Customer</Label>
              <Col sm={10}>                
                <div className="form-group">                  
                  <select onChange={this.handleCustomerChange} className="form-control" id="sel1">
                    <option >Select...</option>
                    {CustomerList}
                  </select>
                </div>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="exampleEmail" sm={2}>Product</Label>
              <Col sm={6}>                
                <div className="form-group">                  
                  <select onChange={this.handleProductChange} className="form-control" id="sel1">
                    <option >Select...</option>
                    {ProductList}
                  </select>
                </div>
              </Col>
              <Col sm={2}> <Button color="primary" onClick={this.addItem}>Add</Button></Col>
            </FormGroup>
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
              {this.state.ItemList}
            </tbody>
          </table>
          </Form>
          <h3>Total: {this.state.total}</h3>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.createInvoice}>Add Invoice</Button>{' '}
          <Button color="secondary" onClick={this.props.parentMethod}>Cancel</Button>
        </ModalFooter>
      </Modal>
      </div>
    )
  }
}