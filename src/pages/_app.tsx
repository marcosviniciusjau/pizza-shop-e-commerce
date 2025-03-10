import { AppProps } from "next/app";
import { globalStyles } from "@/styles/global";

import logoImg from "../assets/logo.png";
import { Container, Header } from "../styles/pages/app";
import Image from "next/image";
import { CartProvider } from "use-shopping-cart";

import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  const publicKey = process.env.STRIPE_PUBLIC_KEY as string;

  return (
    <Container>
      <CartProvider
        cartMode="checkout-session"
        stripe={publicKey}
        currency="BRL"
        shouldPersist
      >
        <Header>
          <Link href={`/`} prefetch={false}>
            <Image src={logoImg} alt="" />
          </Link>
          <Link href={`/cart`} prefetch={false}>
            <ShoppingCart />
          </Link>
        </Header>

        <Component {...pageProps} />
      </CartProvider>
    </Container>
  );
}
