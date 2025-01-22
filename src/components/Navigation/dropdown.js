import React, { useState } from 'react'
import styled from '@emotion/styled'
import { Link } from 'gatsby' // Gatsby's Link
import { breakpoints } from '../../utils/styles'

const DropdownContainer = styled.div`
    position: relative;
    display: inline-block;
    margin-left: 20px;
`

const DropdownToggle = styled.button`
    background: none;
    border: none;
    color: purple;
    font-family: 'Alegreya-Sans-Thin';
    font-size: 24px;
    padding: 0;
    cursor: pointer;
    text-decoration: none;
    &:hover {
        box-shadow: inset -3px 0px 0px 0px purple, inset 3px 0px 0px 0px purple;
        transition: 1s;
        animation-timing-function: ease-out;
    }
    @media (max-width: ${breakpoints.s}) {
        font-size: 1.4rem;
    }
`

const DropdownMenu = styled.div`
    position: absolute;
    top: 100%;
    left: 0;
    background: white;
    border: 1px dashed purple;
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
    z-index: 1;
    min-width: 160px;
    border-radius: 4px;
`

const DropdownItem = styled(Link)`
    display: block;
    padding: 10px 15px;
    color: purple;
    font-family: 'Alegreya-Sans-Thin';
    font-size: 18px;
    text-decoration: none;
    &:hover {
        background-color: rgba(128, 0, 128, 0.1); /* Purple tint */
        transition: 0.3s ease-in-out;
    }
`

const Dropdown = ({ productCollection }) => {
    const [isOpen, setIsOpen] = useState(false)

    const toggleDropdown = () => {
        setIsOpen(!isOpen)
    }

    const closeDropdown = () => {
        setIsOpen(false)
    }
    return (
        <DropdownContainer onMouseLeave={closeDropdown}>
            <DropdownToggle onMouseOver={toggleDropdown}>
                &nbsp;&nbsp;{productCollection.title}&nbsp;&nbsp;
            </DropdownToggle>
            {isOpen && (
                <DropdownMenu>
                    {productCollection.products.map((collection, key) => {
                        return (
                            <DropdownItem
                                to={`/${productCollection.handle}/${collection.handle}`}
                                key={key}
                            >
                                {collection.title}
                            </DropdownItem>
                        )
                    })}
                </DropdownMenu>
            )}
        </DropdownContainer>
    )
}

export default Dropdown
