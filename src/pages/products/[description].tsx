import { Button, HomeContainer, Input } from "@/styles/pages/home";

import { GetStaticProps } from "next";

import { useKeenSlider } from "keen-slider/react";

import "keen-slider/keen-slider.min.css";

import { CartActions, useShoppingCart } from "use-shopping-cart";
import { stripe } from "@/lib/stripe";
import ProductsCard  from "../products_card";

import type { Product as Products } from "use-shopping-cart/core";
import { useState } from "react";
import { useRouter } from "next/router";
interface ProductsCardsProps {
  products: Products[];
  addItem: CartActions["addItem"];
}

export default function Products({ products }: ProductsCardsProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  });

  const [isSearching, setIsSearching] = useState(true);
  const [search, setSearch] = useState("");

  const [product, setProduct] = useState(products);
  const cart = useShoppingCart();
  const { addItem } = cart;

  function getName(search: string) {
    if (search.trim() === "") {
      setProduct(products);
      setIsSearching(true);
    } else {
      const filtrado = products.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );

      setProduct(filtrado);
      setIsSearching(false);
    }
  }

  return (
    <>
      <div className="flex">
        <Input
          type="search"
          placeholder="Busque um produto"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            getName(e.target.value);
          }}
          required
        />
        <Button type="submit" onClick={() => getName(search)}>
          🔎
        </Button>
      </div>

      {product.length > 0 ? (
        isSearching ? (
          <HomeContainer>
            <ProductsCard products={products} addItem={addItem} />
          </HomeContainer>
        ) : (
          // Renderiza sem o slider ao fazer uma busca
          <div className="products-container">
            <ProductsCard products={product} addItem={addItem} />
          </div>
        )
      ) : (
        <p>Produto não encontrado</p>
      )}
      <hr
        style={{
          background: "grey",
          height: 1,
          width: "100%",
          maxWidth: "20rem",
        }}
      />
    </>
  );
}

export const getServerSideProps: GetStaticProps<
  any,
  { description: string }
> = async ({ params }) => {
  const description = params!.description;
  const productsResponse = await stripe.products.list({
    expand: ["data.default_price"],
  });
  const products = productsResponse.data;
  const pricesResponse = await stripe.prices.list({ limit: 70 });
  const prices = pricesResponse.data;
  const productsWithPrices = products.map((product) => ({
    ...product,
    prices: prices.filter(
      (price) => price.product === product.id && price.nickname === description
    ),
  }));

  const productsWithActivePrices = productsWithPrices
    .filter((product) => product.metadata.flavor === "unique")
    .map((product) => {
      return {
        id: product.id,
        name: product.name,
        description: product.description,
        size: product.prices[0].nickname,
        imageUrl: product.images[0],
        price: product.prices[0].unit_amount! / 100,
        priceId: product.prices[0].id,
      };
    });

  return {
    props: {
      products: productsWithActivePrices,
    },
  };
};
