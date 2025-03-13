// @ts-nocheck
import Head from "next/head";

import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

import { Product as Products } from "use-shopping-cart/core";
import ProductsTable from "./products_table";
import { HomeContainer } from "@/styles/pages/home";

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

      <ProductsTable products={products} />
    </>
  );
}
