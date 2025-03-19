// @ts-nocheck
import {
  Button,
  FlavorContainer,
  Product,
  ProductContainer,
} from "@/styles/pages/product";

import Image from "next/image";

import { CartActions } from "use-shopping-cart";
import { Product as Products } from "use-shopping-cart/core";

import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";
interface ProductsCardsProps {
  products: Products[];
  addItem: CartActions["addItem"];
}

export function ProductsCard({ products, addItem }: ProductsCardsProps) {
  const [selectedProducts, setSelectedProducts] = useState<Products[]>([]);
  function selectPizza(isChecked: boolean, product: Products) {
    const productId = product.id;
    if (!isChecked) {
      selectedProducts.pop((item) => item === product);
    }
    setSelectedProducts((prev) =>
      isChecked ? [...prev, product] : prev.filter((id) => id !== productId)
    );
  }
  function addItemToCart(product) {
    toast.success("Adicionou no carrinho");
    addItem(product);
  }
  return (
    <ProductContainer>
      <ToastContainer />
      <FlavorContainer>
        <h1> Escolha até 2 sabores</h1>
        <Button
          onClick={() =>
            selectedProducts.forEach((product) => addItemToCart(product))
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
