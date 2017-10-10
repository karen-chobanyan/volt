import React from 'react';
import ProductStore from '../../stores/productStore'
import Product from './product'
import AddProduct from './addProduct'
import EditProduct from './editProduct'
import DeleteProduct from './deleteProduct'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default class Products extends React.Component{
  constructor(){
    super();
    document.title = 'Products';
    this.getProducts = this.getProducts.bind(this);
    this.state = {
      products: ProductStore.getAll(),
      addModal: false,
      eProduct: {}
    };
    this.toggleAddModal = this.toggleAddModal.bind(this);
    this.toggleEditModal = this.toggleEditModal.bind(this);
    this.toggleDeleteModal = this.toggleDeleteModal.bind(this);
    this.editProduct = this.editProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
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
    ProductStore.on('change', this.getProducts);
  }
  
  componentWillUnmount(){
    ProductStore.removeListener('change', this.getProducts);
  }

getProducts(){
  this.setState({
    products: ProductStore.getAll()
  })
}

editProduct(product){
  this.setState({
    editModal: !this.state.editModal
  });
  this.setState({
    eProduct: product
  });

}

deleteProduct(product){
  this.setState({
    deleteModal: !this.state.deleteModal
  });
  this.setState({
    dProduct: product
  });
}
  
  render(){
    const { products } = this.state;
    let ProductComponents;
    if(!!products){
      ProductComponents = products.map((product, index) => {
         return <Product parentEditMethod={this.editProduct} parentDeleteMethod={this.deleteProduct}key={index} {...product}/>
      })
    }
    
    return(
      <div className="col-sm-12">
        <h1 className="pull-left">Product List </h1>
        <Button color="success" onClick={this.toggleAddModal}>Create</Button>
        <AddProduct isOpen={this.state.addModal} parentMethod={this.toggleAddModal}/>
        <EditProduct isOpen={this.state.editModal} product={this.state.eProduct} parentMethod={this.toggleEditModal}/>
        <DeleteProduct isOpen={this.state.deleteModal} product={this.state.dProduct} parentMethod={this.toggleDeleteModal}/>
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Price</th>              
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          {ProductComponents}
        </tbody>
      </table>
      
      </div>    
      
    );
  }
  
}