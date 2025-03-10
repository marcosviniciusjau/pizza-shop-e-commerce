import { styled } from ".."

export const HomeContainer = styled("main", {
  display: "flex",
  width: "100%",
   maxWidth: "calc(100vw - ((100vw - 1180px) / 2))",
  marginLeft: "auto",
  minHeight: 200,
})

export const ProductContainer = styled("div", {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '1rem',

  '& > div': {
    flex: '1 0 20%', // 5 por linha (100 / 5 = 20%)
  },
  '@media(max-width: 768px)': {
    display: 'grid'
  }

})
export const FlavorContainer = styled("div", {
  marginLeft: '2rem',
  maxWidth: '150px'
})


export const Product = styled("div", {
  marginLeft: '2rem',
  background: 'linear-gradient(180deg, #970809 0%, #fa8700 100%)',
  borderRadius: 8,
  position: "relative",
  overflow: "hidden",
  '@media(min-width: 768px)': {
    margin: '2rem',
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
  },

  variants: {
    disabled: {
      true: {

        background: 'none',
        cursor: 'default',
        opacity: 0.4,
      },

    },
  },
  img: {
    borderRadius: '8px',
    marginLeft: '1rem',
    marginRight: '1rem',
    marginTop: '0.75rem',
    objectFit: "cover",
  },

  footer: {
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

  "&:hover": {
    footer: {
      opacity: 1,
      transform: "translateY(0)",
    }
  },

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