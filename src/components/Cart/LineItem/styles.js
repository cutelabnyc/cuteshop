import styled from '@emotion/styled'

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding: ${props => props.doPadTop ? "2rem 0 2rem 0" : "0 0 2rem 0"};
  width: 100%;
  border-bottom: ${props => props.bottomBorder ? "2px solid purple" : "none"};
`

export const RemoveButton = styled.button`
  font-family: "Alegreya-Sans";
  font-size: 1em;
  border: none;
  padding: 0 10px 0 10px;
  background-color: purple;
  color: white;
  border-radius: 20px;
  -webkit-appearance: none;
  -moz-appearance: none;
  cursor: pointer;
`