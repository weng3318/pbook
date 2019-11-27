import React from 'react'
import './lukeStyle.scss'
import {Table} from 'react-bootstrap';
import axios from 'axios'
import swal from '@sweetalert/with-react'

class QueryOrder extends React.Component {
      constructor(){
        super()
        this.state = {
            orderData: [],
        }
      }


    render() {
        let orderData = this.state.orderData
        console.log(orderData);
        
        return(
        <>
            <div className="queryOrder">
                <div className="Book_title">查詢訂單</div>
                {
                    (false) ? (
                    <>
                        <div className="nobook">目前還沒有訂單，趕快去買書</div>
                    </>
                    ):(
                    <>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Username</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td>1</td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                            </tr>
                            <tr>
                            <td>2</td>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                            </tr>
                            <tr>
                            <td>3</td>
                            <td colSpan="2">Larry the Bird</td>
                            <td>@twitter</td>
                            </tr>
                        </tbody>
                        </Table>
                    </>
                    )
                }
                </div>
            </>
        )
    }
}






export default QueryOrder