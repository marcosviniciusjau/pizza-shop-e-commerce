
import { styled } from ".."

import Image from "next/image";
export const HomeContainer = styled('main', {
  '@media(min-width: 768px)': {
    display: 'flex',
  },
  width: '100%',
  maxWidth: 'calc(100vw - ((100vw - 1180px) / 2))',
  marginLeft: 'auto',
  minHeight: 656
})


export const Product = styled('div', {
  borderRadius: 8,
  cursor: 'pointer',
  position: 'relative',
  overflow: 'hidden',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',


  img: {
    objectFit: 'cover',
    '@media(max-width: 768px)': {
      width: 165,
      height: 165
    },
  },

  footer: {
    '@media(max-width: 768px)': {
      textDecoration: 'none',
      bottom: "0.25rem",
      left: "0.25rem",
      right: "0.25rem",
      marginTop: "1rem",
      borderRadius: 6,

      padding: "0.5rem",
      alignItems: "center",
      justifyContent: "space-between",


      strong: {
        fontSize: "$lg",
        color: "$white",
      },

      span: {
        fontSize: "$xl",
        fontWeight: "bold",
        color: "$white",
      }
    },
    '@media(min-width: 768px)': {
      position: 'absolute',
      bottom: '0.25rem',
      left: '0.25rem',
      right: '0.25rem',
      padding: '2rem',

      borderRadius: 6,

      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',

      backgroundColor: 'rgba(0, 0, 0, 0.6)',


      strong: {
        fontSize: '$lg',
        color: '$gray100',
      },

      span: {
        fontSize: "$xl",
        fontWeight: "bold",
        color: "$white",
      }
    },

    '&:hover': {
      footer: {
        transform: 'translateY(0%)',
        opacity: 1
      }
    }
  }
})
export const Input = styled("input", {
  marginBottom: 25,
  marginLeft: 30,
  width: "25%",
  height: 54,
  borderRadius: 6,
  backgroundColor: "$gray100",
  border: "1px solid rgba(0,0,0,0.2)",
})

export const Button = styled("button", {
  height: 54,
  marginTop: 16,
  marginLeft: 5,
  borderRadius: 6,
  backgroundColor: "$red700",
  border: 0,
  color: "$white",
  fontWeight: "bold",
  cursor: "pointer",
  transition: "background-color 0.2s",
})