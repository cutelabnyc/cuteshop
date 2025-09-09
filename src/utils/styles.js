import React from 'react'
import { GatsbyImage, StaticImage } from "gatsby-plugin-image"
import styled from '@emotion/styled'
import { Global, css } from '@emotion/react'

export const breakpoints = {
  s: 576,
  m: 768,
  l: 992,
  xl: 1200,
}

export const GlobalStyle = props => (
  <Global
    {...props}
    styles={css`

      body {
        margin: 0;
      }

      html {
        font-family: 'Alegreya-Sans', sans-serif;
        min-height: 100%;
        height: 100%;
        color: purple;
        font-size: 16px;
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
      }

      @font-face {
        font-family: "PressStart2P";
        src: url("/Press_Start_2P/PressStart2P-Regular.ttf") format("woff2");
        font-weight: regluar;
        font-style: regular;
      }
      @font-face {
        font-family: "Roboto";
        src: url("/Roboto/Roboto-Regular.ttf") format("woff2");
        font-weight: regluar;
        font-style: regular;
      }
      @font-face {
        font-family: "Roboto-Thin";
        src: url("/Roboto/Roboto-Thin.ttf") format("woff2");
        font-weight: regluar;
        font-style: regular;
      }
      @font-face {
        font-family: "Alegreya-Sans";
        src: url("/Alegreya_Sans/AlegreyaSans-Regular.ttf") format("woff2");
        font-weight: regluar;
        font-style: regular;
      }
      @font-face {
        font-family: "Alegreya-Sans-Thin";
        src: url("/Alegreya_Sans/AlegreyaSans-Thin.ttf") format("woff2");
        font-weight: regluar;
        font-style: regular;
      }
      @font-face {
        font-family: "Alegreya-Sans-Thin-Italic";
        src: url("/Alegreya_Sans/AlegreyaSans-ThinItalic.ttf") format("woff2");
        font-weight: regluar;
        font-style: regular;
      }
    `}
  />
)

export const Img = styled(GatsbyImage)`
  max-width: 100%;
  margin-left: 0;
  margin-right: 0;
  margin-top: 0;
  padding-bottom: 0;
  padding-left: 0;
  padding-right: 0;
  padding-top: 0;
  margin-bottom: 1.45rem;
`

export const SImg = styled(StaticImage)`
  max-width: 100%;
  margin-left: 0;
  margin-right: 0;
  margin-top: 0;
  padding-bottom: 0;
  padding-left: 0;
  padding-right: 0;
  padding-top: 0;
  margin-bottom: 1.45rem;
`

export const Container = styled.div`
  margin: 0 auto;
  max-width: 960px;
`

export const GalleryContainer = styled.div`
  margin: 0 auto;
  max-width: 960px;
  @media (max-width: 828px) {
    height: 400px;
  }
`

export const FlexContainer = styled.div`
  margin: 0 auto;
  max-width: 960px;
  display: flex;
`

export const TwoColumnGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2rem 1fr;
  grid-template-rows: 1auto;
  grid-template-areas: 'left . right';

  @media (max-width: ${breakpoints.l}px) {
    display: block;
  }
`

export const ThreeColumnGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2rem 1fr 2rem 1fr;
  grid-template-rows: 1auto;
  grid-template-areas: 'left . center . right';

  @media (max-width: ${breakpoints.l}px) {
    display: block;
  }
`

export const GridLeft = styled.div`
  grid-area: left;
`

export const GridCenter = styled.div`
  grid-area: center;
`

export const GridRight = styled.div`
  grid-area: right;
`

export const MainContent = styled.main`
  margin-top: 80px;
  margin-bottom: 40px;

  @media (max-width: ${breakpoints.l}px) {
    margin-top: 40px;
    margin-bottom: 20px;
  }
`
