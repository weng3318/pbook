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
    
    componentDidMount(){
        this.queryOrder()
    }

    queryOrder = () =>{
        let number = JSON.parse(localStorage.getItem('user')).MR_number

        axios.get('http://localhost:5555/books/order/MR00173')
            .then( rows =>{
                console.log(rows);
                
            })
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
                    <div className="order_title">您目前的訂單有1筆</div>
                    <Table striped bordered hover size="sm"
                        style={{marginLeft: '80px', marginTop: '30px'}}
                    >
                        <thead>
                            <tr>
                            <th>訂單編號</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Username</th>
                            <th>Username</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td>1</td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                            <td>@mdo</td>
                            </tr>
                            <tr>
                            <td>2</td>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                            <td>@fat</td>
                            </tr>
                            <tr>
                            <td>3</td>
                            <td colSpan="2">Larry the Bird</td>
                            <td>@twitter</td>
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