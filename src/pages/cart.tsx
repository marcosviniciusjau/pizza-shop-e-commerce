// @ts-nocheck
import { useShoppingCart } from "use-shopping-cart";
import { CartEntry } from "./cart-entry";
import { Button } from "@/styles/pages/cart";
import { useEffect, useState } from "react";
import axios from "axios";
import { stripe } from "@/lib/stripe";
import { CartContainer, Total } from "@/styles/pages/cart-entry";
import { Select } from "@/styles/pages/components/select";
import { CartDiv } from "@/styles/pages/components/cart";
import { useRouter } from "next/router";

export default function Cart() {
  const [isMounted, setIsMounted] = useState(false);
  const { removeItem, cartDetails, clearCart, totalPrice } = useShoppingCart();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div>Carregando carrinho...</div>;
  }

  const cartItems = Object.values(cartDetails ?? {}).map((entry) => ({
    id: entry.id,
    name: entry.name,
    price: entry.price,
    quantity: entry.quantity,
    image: entry.imageUrl,
    size: entry.size,
    priceId: entry.priceId,
  }));

  const size = cartItems.map((item) => item.size);
  const priceId = cartItems.map((item) => item.priceId);

  const imageUrl = cartItems.map((item) => item.image);
  const prices = cartItems.map((item) => ({
    id: item.id,
    price: item.price,
    priceId: item.priceId,
  }));

  function mostExpense(arr: number[]) {
    return Math.max(...arr);
  }

  const mostExpensive = mostExpense(prices.map((item) => item.price));
  const productMostExpensive = prices.filter(
    (item) => item.price === mostExpensive
  );
  const total = mostExpensive * quantity;

  async function deleteProductsWithoutPrice() {
    try {
      const products = await stripe.products.list({ limit: 100 });

      for (const product of products.data) {
        const prices = await stripe.prices.list({ product: product.id });

        if (prices.data.length === 0) {
          await stripe.products.del(product.id);
          console.log(`Produto deletado: ${product.id}`);
        }
      }
    } catch (error) {
      console.error("Erro ao deletar produtos sem preço:", error);
    }
  }

  async function handleBuyAllProducts() {
    if (cartItems.length === 0) {
      alert("Carrinho vazio!");
      return;
    }

    try {
      const names = cartItems.map((item) => item.name);

      switch (cartItems.length) {
        case 1: {
          const response = await axios.post("/api/checkout", {
            priceId,
            quantity,
          });

          const { checkoutUrl } = response.data;
          window.location.href = checkoutUrl;
        }
        case 2: {
          const correctNames = names.join(", ");
          const priceName = await stripe.prices.search({
            limit: 100,
            query: `lookup_key:"${productMostExpensive[0].priceId}"`,
          });
          console.log(priceName);
          if (priceName.data.length < 1) {
            const newPrice = await stripe.prices.create({
              currency: "brl",
              unit_amount: mostExpensive * 100,
              product_data: {
                name: correctNames,
                metadata: {
                  category: "pizzas",
                  size: size[0],
                  productId: productMostExpensive[0].id,
                },
              },
              lookup_key: productMostExpensive[0].priceId,
            });

            await stripe.products.update(newPrice.product.toString(), {
              images: imageUrl,
            });

            const response = await axios.post("/api/checkout", {
              priceId: newPrice.id,
              quantity,
            });

            const { checkoutUrl } = response.data;
            window.location.href = checkoutUrl;
          } else {
            const priceExists = priceName.data.map((item) => item.id);
            const response = await axios.post("/api/checkout", {
              priceId: priceExists[0],
              quantity,
            });
            const { checkoutUrl } = response.data;
            window.location.href = checkoutUrl;
          }
        }
      }
    } catch (err) {
      deleteProductsWithoutPrice();
      console.error("Erro ao processar o checkout:", err);
      alert("Falha ao redirecionar ao checkout");
    }
  }
  return (
    <CartContainer>
      <Total>
        <h2>Carrinho</h2>
        <p>Quantidade</p>
        <Select
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        >
          <option>1</option>

          <option>2</option>

          <option>3</option>

          <option>4</option>

          <option>5</option>
        </Select>
        <p>
          Total:{" "}
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(total > 0 ? total : 0)}
        </p>
        <br />
        <Button onClick={() => clearCart()}>Limpar carrinho</Button>

        <br />
        <Button onClick={handleBuyAllProducts}>Comprar tudo</Button>
      </Total>
      <CartDiv>
        {cartItems.length === 0 ? <p>O carrinho está vazio.</p> : null}
        {cartItems.length > 0 && (
          <>
            {cartItems.map((entry) => (
              <CartEntry
                key={entry.id}
                entry={entry}
                removeItem={removeItem}
                totalPrice={totalPrice}
              />
            ))}
          </>
        )}
      </CartDiv>
    </CartContainer>
  );
}
