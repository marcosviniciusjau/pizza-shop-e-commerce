import { Button, HomeContainer, Product } from "@/styles/pages/home";
import Link from "next/link";

import Image from "next/image";

import { useKeenSlider } from "keen-slider/react";

import "keen-slider/keen-slider.min.css";
import { Product as Products } from "use-shopping-cart/core";
interface ProductsTableProps {
  products: Products[];
}

export default function ProductsTable({ products }: ProductsTableProps) {
  const [sliderRef, sliderInstance] = useKeenSlider<HTMLDivElement>({
    slides: {
      perView: 3,
      spacing: 48,
    },
  });

  return (
    <HomeContainer>
      {products.map((product) => {
        return (
          <Link
            href={`/products/${product.description}`}
            key={product.description}
            prefetch={false}
            style={{ textDecoration: 'none' }}
          >
            <Product>
              <Image src={product.imageUrl} width={400} height={400} alt={product.name}/>
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
