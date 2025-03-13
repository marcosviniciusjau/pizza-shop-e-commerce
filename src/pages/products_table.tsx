// @ts-nocheck
import { Button, HomeContainer, Product } from "@/styles/pages/home";
import Link from "next/link";

import Image from "next/image";

import { Product as Products } from "use-shopping-cart/core";
interface ProductsTableProps {
  products: Products[];
}

export default function ProductsTable({ products }: ProductsTableProps) {
  if (!products) return null;
  return (
    <HomeContainer>
      {products &&
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
  );
}
