import React, { useContext } from 'react'
import { Link } from 'gatsby'

import StoreContext from '~/context/StoreContext'
import { Wrapper, RemoveButton } from './styles'

const LineItem = props => {
    const { item } = props
    const {
        removeLineItem,
        store: { client, checkout },
    } = useContext(StoreContext)

    const variantImage = item.variant.image ? (
        <img
            src={item.variant.image.src}
            alt={`${item.title} product shot`}
            height="60px"
        />
    ) : null

    const selectedOptions = item.variant.selectedOptions
        ? item.variant.selectedOptions.map(
            option => `${option.name}: ${option.value} `
        )
        : null

    const handleRemove = () => {
        removeLineItem(client, checkout.id, item.id)
    }

    return (
        <Wrapper doPadTop={props.doPadTop} bottomBorder={props.bottomBorder}>
            <Link to={`/product/${item.variant.product.handle}/`}>
                {variantImage}
            </Link>
            <p>
                {item.title}
                {`  `}
                {/* {item.variant.title === !'Default Title' ? item.variant.title : ''} */}
            </p>
            {/* {selectedOptions} */}
            {item.quantity}
            <p>
                {'$' + Number.parseFloat(item.variant.price) * Number.parseFloat(item.quantity)}
                <span style={{ color: "gray" }}>{item.quantity > 1 ? " - ($" + Number.parseInt(item.variant.price) + "/e)" : null}</span>
            </p>
            <RemoveButton onClick={handleRemove}>Remove</RemoveButton>
        </Wrapper>
    )
}

export default LineItem
