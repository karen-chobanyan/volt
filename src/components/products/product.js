import React from 'react';
import { Button } from 'reactstrap';
export default class Product extends React.Component{
  
  constructor(props) {
    super(props);
  };
  
  render(){
    return(
      <tr>
        <th scope="row">{this.props.id}</th>
        <td>{this.props.name}</td>
        <td>{this.props.price}</td>
        
        <td>
          <Button color="primary" size="sm" onClick={() => this.props.parentEditMethod(this.props)}>Edit</Button> 
          <Button color="danger" size="sm" onClick={() => this.props.parentDeleteMethod(this.props)}>Delet</Button>          
        </td>
      </tr>
    );
  }
  
}