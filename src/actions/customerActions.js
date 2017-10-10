import Dispatcher from '../dispatcher';

export function createCustomer(customer) {
  Dispatcher.dispatch({
    type: 'CREATE_CUSTOMER',
    customer
  })
}

export function updateCustomer(customer) {
  Dispatcher.dispatch({
    type: 'UPDATE_CUSTOMER',
    customer
  })
}

export function deleteCustomer(id) {
  Dispatcher.dispatch({
    type: 'DELTE_CUSTOMER',
    id
  })
}