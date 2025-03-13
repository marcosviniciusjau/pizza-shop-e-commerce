// @ts-nocheck
import Head from "next/head";
import { Button, HomeContainer, Product } from "@/styles/pages/home";
import Link from "next/link";

import Image from "next/image";

import { Product as Products } from "use-shopping-cart/core";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

import { Product as Products } from "use-shopping-cart/core";
import ProductsTable from "./products_table";

export default function Home() {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  });
  const products: Products[] = [
    {
      name: "Pizzas broto",
      description: "small",
      price: "35,90",
      imageUrl:
        "https://files.stripe.com/links/MDB8YWNjdF8xUDF1VVJFZW9kaVJvYkhRfGZsX3Rlc3RfRlJHV3lXcXlVTE9OQTNVUVVmY2hGOU12006XpJgrrz",
    },
    {
      name: "Pizzas médias",
      description: "medium",
      price: "45,90",
      imageUrl:
        "https://files.stripe.com/links/MDB8YWNjdF8xUDF1VVJFZW9kaVJvYkhRfGZsX3Rlc3RfM0Q3anFhZmlkUkNBMWVOME4zZHhUamM000ynJiYgL4",
    },
    {
      name: "Pizzas grande",
      description: "big",
      price: "59,90",
      imageUrl:
        "https://files.stripe.com/links/MDB8YWNjdF8xUDF1VVJFZW9kaVJvYkhRfGZsX3Rlc3RfM0Q3anFhZmlkUkNBMWVOME4zZHhUamM000ynJiYgL4",
    },
  ];

  return (
    <>
      <Head>
        <title>Home | Pizza Shop</title>
      </Head>

      <HomeContainer>
        {products &&
          products.length > 0 &&
          products.map((product) => {
            return (
              <Link
                href={`/products/${product.description}`}
                key={product.description}
                prefetch={false}
                style={{ textDecoration: "none" }}
              >
                <Product>
                  <Image
                    src={product.imageUrl}
                    width={400}
                    height={400}
                    alt={product.name}
                  />
                  <footer>
                    <strong>{product.name}</strong>
                    <span>A partir de {product.price}</span>

                    <Button>Selecionar</Button>
                  </footer>
                </Product>
              </Link>
            );
          })}
      </HomeContainer>
    </>
  );
}
