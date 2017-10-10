import Dispatcher from '../dispatcher';

export function createProduct(product) {
  Dispatcher.dispatch({
    type: 'CREATE_PRODUCT',
    product
  })
}

export function updateProduct(product) {
  Dispatcher.dispatch({
    type: 'UPDATE_PRODUCT',
    product
  })
}

export function deleteProduct(id) {
  Dispatcher.dispatch({
    type: 'DELTE_PRODUCT',
    id
  })
}