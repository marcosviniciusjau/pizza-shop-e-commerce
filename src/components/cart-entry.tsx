import { CartActions, CartEntry as ICartEntry } from "use-shopping-cart/core";
import { Button, CartContainer } from "@/styles/pages/cart-entry";
import { useEffect } from "react";
import Image from "next/image";
export function CartEntry({
  entry,
  removeItem,
}: {
  entry: ICartEntry;
  removeItem: CartActions["removeItem"];
  totalPrice: number;
}) {
  useEffect(() => {
    entry;
  }, [entry]);
  if (!entry) return null;
  return (
    <>
      {entry && (
        <CartContainer>
          <h3>{entry.name}</h3>
          {entry.image ? (
            <Image
              width={100}
              height={100}
              src={entry.image}
              alt={entry.description!}
            />
          ) : null}
          <p>
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(entry.price)}{" "}
          </p>
          <Button onClick={() => removeItem(entry.id)}>
            Remover do carrinho
          </Button>
        </CartContainer>
      )}
    </>
  );
}
