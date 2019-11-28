import React from 'react'
import { connect } from 'react-redux'
import { Col } from 'react-bootstrap'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import swal from '@sweetalert/with-react'
import { addOrderFetch } from '../shop/ShopActions'
import './Cart.scss'

const StepTwo = props => {
  //let b = document.querySelector('input[name="delivery"]:checked')
  let memberID = JSON.parse(localStorage.getItem('user')).MR_number
  let orderPrice = localStorage.getItem('totalPrice')
  let created_time = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
  let bookName = [],
    singlePrice = [],
    bookAmount = []
  for (let i = 0; i < (props.cartPayload && props.cartPayload.totalCart); i++) {
    bookName[i] =
      props.cartPayload &&
      props.cartPayload.cart &&
      props.cartPayload.cart[i].name
    singlePrice[i] =
      props.cartPayload &&
      props.cartPayload.cart &&
      props.cartPayload.cart[i].fixed_price
    bookAmount[i] = localStorage.getItem(
      props.cartPayload &&
        props.cartPayload.cart &&
        props.cartPayload.cart[i].sid
    )
  }
  function pay() {
    swal({
      title: '確認送出訂單?',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then(sure => {
      if (sure) {
        for (
          let i = 0;
          i < (props.cartPayload && props.cartPayload.totalCart);
          i++
        ) {
          props.dispatch(
            addOrderFetch(
              memberID,
              bookName[i],
              singlePrice[i],
              bookAmount[i],
              orderPrice,
              created_time
            )
          )
        }
        props.setOrder(1)
        swal('送出訂單成功', {
          icon: 'success',
        }).then(() => {
          props.changeSteps(2)
        })
      } else {
        swal('送出訂單失敗')
      }
    })
  }
  return (
    <>
      <Col md={12}>
        <div className="checkout my-5">
          <button className="backToCart" onClick={() => props.changeSteps(0)}>
            <FontAwesomeIcon icon={faAngleLeft} /> 返回購物車
          </button>
          <div className="d-flex justify-content-center my-3">
            <div className="input-wrapper d-flex flex-column mx-3">
              <div className="choose py-3">請選擇配送方式</div>
              <div className="mt-3 ml-3">
                <input
                  type="radio"
                  name="delivery"
                  value="ConvenienceStore"
                  id="ConvenienceStore"
                />
                <label htmlFor="ConvenienceStore">便利商店取貨</label>
              </div>
              <div className="mt-3 ml-3">
                <input
                  type="radio"
                  name="delivery"
                  value="sendHome"
                  id="sendHome"
                />
                <label htmlFor="sendHome">宅配到府</label>
              </div>
            </div>{' '}
            <div className="input-wrapper d-flex flex-column mx-3">
              <div className="choose py-3">請選擇發票資訊</div>
              <div className="mt-3 ml-3">
                <input type="radio" name="receipt" value="donate" id="donate" />
                <label htmlFor="donate">捐贈發票</label>
              </div>
              <div className="mt-3 ml-3">
                <input
                  type="radio"
                  name="receipt"
                  value="electronic"
                  id="electronic"
                />
                <label htmlFor="electronic">電子發票</label>
              </div>
            </div>
            <div className="input-wrapper d-flex flex-column mx-3">
              <div className="choose py-3">請選擇付款方式</div>
              <div className="mt-3 ml-3">
                <input type="radio" name="pay" value="cash" id="cash" />
                <label htmlFor="cash">貨到付款</label>
              </div>
              <div className="mt-3 ml-3">
                <input
                  type="radio"
                  name="pay"
                  value="creditCard"
                  id="creditCard"
                />
                <label htmlFor="creditCard">信用卡付款</label>
              </div>
            </div>
          </div>
          <div className="SubscriberWrapper mx-auto">
            <div className="d-flex align-items-center justify-content-center info">
              訂購人資訊
            </div>
            <div className="formWrap m-3">
              <label htmlFor="name">訂購人姓名</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="真實姓名"
                autoComplete="off"
              />
            </div>
            <div className="formWrap m-3">
              <label htmlFor="phone">聯絡電話</label>
              <input type="text" name="phone" id="phone" autoComplete="off" />
            </div>
            <div className="formWrap m-3">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" autoComplete="off" />
            </div>
            <div className="formWrap m-3">
              <label htmlFor="address">地址</label>
              <br />
              <input
                type="text"
                name="address"
                id="code"
                placeholder="郵遞區號"
                autoComplete="off"
              />
              <input type="text" name="address" id="address" />
            </div>
          </div>
          <div className="nextStep d-flex justify-content-end">
            <button className="last m-3" onClick={() => pay()}>
              確認送出訂單
            </button>
          </div>
        </div>
      </Col>
    </>
  )
}

const mapStateToProps = state => ({
  addOrder: state.addOrder,
})

export default connect(mapStateToProps)(StepTwo)
