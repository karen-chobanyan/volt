import React from 'react';
import { Button } from 'reactstrap';
export default class Invoice extends React.Component{
  
  constructor(props) {
    super(props);
  };
  
  render(){
    return(
      <tr>
        <th scope="row">{this.props.id}</th>
        <td>{this.props.customerName}</td>
        <td>{this.props.discount || 0}</td>
        <td>{this.props.total}</td>
        <td>
          <Button color="primary" size="sm" onClick={() => this.props.parentEditMethod(this.props)}>Edit</Button> 
          <Button color="danger" size="sm" onClick={() => this.props.parentDeleteMethod(this.props)}>Delet</Button>          
        </td>
      </tr>
    );
  }
  
}