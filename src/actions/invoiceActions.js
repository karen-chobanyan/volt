import Dispatcher from '../dispatcher';

export function createInvoice(invoice) {
  Dispatcher.dispatch({
    type: 'CREATE_INVOICE',
    invoice
  })
}

export function updateInvoice(invoice) {
  Dispatcher.dispatch({
    type: 'UPDATE_INVOICE',
    invoice
  })
}

export function deleteInvoice(id) {
  Dispatcher.dispatch({
    type: 'DELTE_INVOICE',
    id
  })
}