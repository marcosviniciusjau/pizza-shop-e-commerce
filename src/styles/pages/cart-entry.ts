import { styled } from "@stitches/react";

import Image from "next/image";
export const CartContainer = styled('div', {
  display: 'flex',
  '@media(max-width: 48rem)': {
    flexDirection: 'column'
  },
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '1.5rem 0',
  gap: '1.5rem',
  placeItems: 'center',
  width: '100%',
  maxWidth: 1180,
}
)
export const Total = styled('div', {
  display: 'grid',
  placeContent: 'center',
  '@media(min-width: 48rem)': {
    paddingLeft: '10rem',
  },
})

export const Button = styled('button', {
  backgroundColor: '$red500',
  border: 0,
  color: '$white',
  borderRadius: 8,
  padding: '0.5rem',
  cursor: 'pointer',
  fontWeight: 'bold',
  fontSize: '$md',

  '&:disabled': {
    opacity: 0.6,
    cursor: 'not-allowed',
  },

  '&:not(:disabled):hover': {
    backgroundColor: '$red300',
  }
})

export const BuyButton = styled('button', {
  marginTop: '1.5rem',
  backgroundColor: '$red700',
  border: 0,
  color: '$white',
  borderRadius: 8,
  padding: '0.5rem',
  cursor: 'pointer',
  fontWeight: 'bold',
  fontSize: '$md',

  '&:disabled': {
    opacity: 0.6,
    cursor: 'not-allowed',
  },

  '&:not(:disabled):hover': {
    backgroundColor: "#ffd700",
  }
})