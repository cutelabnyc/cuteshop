import React, { useContext } from 'react'
import {
    Wrapper,
    ProductColumn,
    CostColumn,
    PurchaseButton
} from './styles'

import StoreContext from '~/context/StoreContext'
import LineItem from './LineItem'

const Cart = () => {
    const {
        store: { checkout },
    } = useContext(StoreContext)

    const handleCheckout = () => {
        window.open(checkout.webUrl)
    }

    const lineItems = checkout.lineItems.map((item, idx) => (
        <>
            <LineItem key={item.id.toString()} item={item} doPadTop={idx !== 0} bottomBorder={idx !== checkout.lineItems.length - 1} />
        </>
    ))

    return (
        <div>
            <Wrapper>
                <ProductColumn>
                    <h1>Cart</h1>
                    {lineItems}
                </ProductColumn>
                <CostColumn>
                    <h2>Total</h2>
                    <p>$ {checkout.subtotalPrice}</p>
                    <i>Taxes and shipping calculated at checkout</i>
                    <br />
                    <PurchaseButton
                        onClick={handleCheckout}
                        disabled={checkout.lineItems.length === 0}
                    >
                        Check out
                    </PurchaseButton>
                </CostColumn>
            </Wrapper>
        </div>
    )
}

export default Cart
