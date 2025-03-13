// @ts-nocheck
import { ErrorContainer } from "@/styles/pages/error";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Error() {
  const router = useRouter();
  useEffect(() => {
    if (!router.query.session_id) {
      router.push("/");
    }
  }, [router]);

  return (
    <>
      <Head>
        <title>Pedido não efetuado | Pizza Shop</title>

        <meta name="robots" content="noindex" />
      </Head>

      <ErrorContainer>
        <h1>Compra não efetuada</h1>

        <p>
          Ocorreu um erro ao efetuar o pedido, estamos trabalhando para
          resolver. Se tiver alguma dúvida por favor entre em contato conosco
        </p>
        <Link href="/">Voltar ao catalogo</Link>
      </ErrorContainer>
    </>
  );
}
