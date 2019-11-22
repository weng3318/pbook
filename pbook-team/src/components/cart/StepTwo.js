import React from 'react'
import ShopDetail from './ShopDetail'
import CartSummary from './CartSummary'
import './Cart.scss'

const StepOne = props => {
  return (
    <>
      <ShopDetail></ShopDetail>
      <CartSummary></CartSummary>
    </>
  )
}

export default StepOne
