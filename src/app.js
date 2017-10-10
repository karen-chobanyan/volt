import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, IndexRout, hashHitory, Link} from 'react-router-dom';


import Customers from './components/customers/customers';
import Products from './components/products/products';
import Invoices from './components/invoices/invoices';


import 'bootstrap/dist/css/bootstrap.css';
import 'react-select/dist/react-select.css';
const volt = document.getElementById('app-root');

ReactDOM.render(
    <BrowserRouter history={hashHitory}>
      <div className="container">
        <header className="row">
          <nav className="navbar navbar-expand-lg navbar-light bg-light col-sm-12">
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <h4>Invoice App </h4>
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link className="nav-link" to='invoices'>Invoices</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to='products'>Products</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to='customers'>Customers</Link>
                </li>

              </ul>
            </div>
          </nav>
        </header>
        <div className="row">          
          <Route path='/products' component={Products}></Route>
          <Route path='/customers' component={Customers}></Route>
          <Route path='/invoices' component={Invoices}></Route>
        </div>
      </div>
    </BrowserRouter>, 
volt);