import { Button, FlavorContainer, Product, ProductContainer } from "@/styles/pages/product";

import Image from "next/image";

import { useKeenSlider } from "keen-slider/react";

import "keen-slider/keen-slider.min.css";
import { CartActions } from "use-shopping-cart";
import { Product as Products } from "use-shopping-cart/core";

import { useState } from "react";
interface ProductsCardsProps {
  products: Products[];
  addItem: CartActions["addItem"];
}

export default function ProductsCard({ products, addItem }: ProductsCardsProps) {
  const [selectedProducts, setSelectedProducts] = useState<Products[]>([]);

  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  });
  function selectPizza(isChecked: boolean, product: Products) {
    const productId = product.id;
    setSelectedProducts((prev) =>
      isChecked ? [...prev, product] : prev.filter((id) => id !== productId)
    );
  }
  return (
    <ProductContainer>
      <FlavorContainer>
        <h1> Escolha até 2 sabores</h1>
        <Button
          onClick={() =>
            selectedProducts.forEach((product) => addItem(product))
          }
        >
          Adicionar ao carrinho
        </Button>
      </FlavorContainer>

      {selectedProducts.length < 2
        ? products.map((product) => {
            return (
              // eslint-disable-next-line react/jsx-key
              <>
                <Product key={product.id}>
                  <Image
                    src={product.imageUrl}
                    width={160}
                    height={160}
                    alt=""
                  />

                  <footer>
                    <strong>{product.name}</strong>
                    <p>{product.description}</p>

                    <input
                      type="checkbox"
                      name={product.name}
                      onChange={(e) => selectPizza(e.target.checked, product)}
                    />
                    <span>
                      A partir de{" "}
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(product.price)}
                    </span>
                  </footer>
                </Product>
              </>
            );
          })
        : products.map((product) => {
            return (
              // eslint-disable-next-line react/jsx-key
              <>
                <Product
                  key={product.id}
                  disabled={!selectedProducts.includes(product)}
                >
                  <Image
                    src={product.imageUrl}
                    width={200}
                    height={200}
                    alt=""
                  />

                  <footer>
                    <strong>{product.name}</strong>
                    <h2>{product.description}</h2>
                    <input
                      type="checkbox"
                      name={product.name}
                      disabled={!selectedProducts.includes(product)}
                      onChange={(e) => selectPizza(e.target.checked, product)}
                    />
                    <span>
                      A partir de{" "}
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(product.price)}
                    </span>
                  </footer>
                </Product>
              </>
            );
          })}
    </ProductContainer>
  );
}
