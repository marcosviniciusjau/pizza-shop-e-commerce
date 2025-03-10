import { styled } from "..";

export const ErrorContainer = styled('main', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto',
  height: 656,

  h1: {
    fontSize: '$2xl',
    color: '$gray100',
  },

  p: {
    fontSize: '$xl',
    color: '$gray300',
    maxWidth: 560,
    textAlign: 'center',
    marginTop: '2rem',
    lineHeight: 1.4,
  },

  a: {
    display: 'block',
    marginTop: '5rem',
    fontSize: '$lg',
    color: '$red700',
    textDecoration: 'none',
    fontWeight: 'bold',

    '&:hover': {
      background: 'linear-gradient(180deg, #ffd700 10%, #fa8700 100%)',
    }
  }
});
