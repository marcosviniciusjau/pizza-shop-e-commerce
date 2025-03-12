import { GetServerSideProps } from "next";
import Link from "next/link";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";
import Image from "next/image";

import { ImageContainer, SuccessContainer } from "@/styles/pages/success";
import Head from "next/head";

import { pizzaApi } from "@/lib/pizza-api";
import { env } from "@/env";
import { useEffect, useState } from "react";
interface SuccessProps {
  customerName: string;
  customerEmail: string;
  product: {
    id: string;
    name: string;
    category: string;
    quantity: number;
    imageUrl: string;
  };
}
export default function Success({ customerName, product }: SuccessProps) {
  const [categoryType, setCategoryType] = useState("");
  useEffect(() => {
    if (product.category === "pizzas") {
      setCategoryType("Pizza");
    }
  }, [product.category]);

  return (
    <>
      <Head>
        <title>Compra efetuada | Pizza Shop</title>

        <meta name="robots" content="noindex" />
      </Head>

      <SuccessContainer>
        <h1>Compra efetuada</h1>
        <ImageContainer>
          <Image src={product.imageUrl} width={120} height={110} alt="" />
        </ImageContainer>

        <p>
          Uhuul <strong>{customerName}</strong>, sua{" "}
          <strong>
            {categoryType} {product.name}
          </strong>{" "}
          já foi comprada e já está sendo preparada para entrega!
        </p>
        <Link href="/">Voltar ao catalogo</Link>
      </SuccessContainer>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const customerId = Math.floor(Math.random() * 1000).toString();
  const sessionId = String(query.session_id);

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items", "line_items.data.price.product"],
  });

  const customerName = session!.customer_details!.name;
  const customerEmail = session!.customer_details!.email;
  const product = session!.line_items!.data[0]!.price!
    .product as Stripe.Product;
  const price = session!.line_items!.data[0]!.price!.unit_amount;

  const quantity = session!.line_items!.data[0].quantity;

  const name = product.name;
  const category = product.metadata.category;
  const size = product.metadata.size;

  const productId = product.id;
  const response = await pizzaApi.post(
    `${env.NEXT_API_BASE_URL}/restaurants/${env.NEXT_RESTAURANT_ID}/orders/`,
    {
      customerName,
      customerEmail,
      items: [
        { productId, name, quantity, price: "teste ruim", category, size },
      ],
    }
  );

  // Se quiser o response.data:
  const responseStatus = response.status;
  const responseData = response.data;

  console.log('Response Status:', responseStatus);
  console.log('Response Data:', responseData);
  return {
    props: {
      customerName,
      customerEmail,
      product: {
        name: product.name,
        category: product.metadata.category,
        imageUrl: product.images[0],
        quantity,
      },
    },
  };
};
