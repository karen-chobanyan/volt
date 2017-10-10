import Dispatcher from '../dispatcher';

export function createItem(item) {
  Dispatcher.dispatch({
    type: 'CREATE_ITEM',
    item
  })
}

export function updateInvoice(invoice) {
  Dispatcher.dispatch({
    type: 'UPDATE_ITEM',
    item
  })
}

export function deleteInvoice(id) {
  Dispatcher.dispatch({
    type: 'DELTE_IITEM',
    id
  })
}