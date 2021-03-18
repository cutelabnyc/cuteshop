import styled from '@emotion/styled'

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  flex-wrap: wrap;
`
export const ProductColumn = styled.div`
  display: flex;
  flex: 2;
  justify-content: space-between;
  height: 100%;
  align-items: start;
  flex-wrap: wrap;
  padding: 0 2rem 0 8px;
`

export const CostColumn = styled.div`
  flex: 1;
  padding: 0 2rem 0 2rem;
  font-size: 1.2em;
  border-left: 1px dashed purple;
  width: 100%;
  align-items: right;
  p {
      font-size: 1.4em;
  }
  i {
      font-size: 0.8em;
      text-align: center;
      margin: auto;
  }
`

export const PurchaseButton = styled.button`
  font-family: "Alegreya-Sans";
  font-size: 1.2em;
  width: 100%;
  height: 40px;
  border: none;
  background-color: purple;
  color: white;
  border-radius: 20px;
  -webkit-appearance: none;
  -moz-appearance: none;
  cursor: pointer;
  margin: 20px;
`
