"use client"

import { useState, useEffect } from "react";

import Container from "@/components/ui/container";
import useCart from "@/hooks/use-cart";

import CartItem from "./components/cart-item";
import Summary from "./components/summary";

export const revalidate = 0;

const CartPage = () => {
  const cart = useCart();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return ( 
    <div className="bg-white">
      <Container>
        <div className="px-4 py-16 sm:px-6 lg:px-6">
          <h1 className="text-3xl font-bold text-black">
            Giỏ hàng
          </h1>
          <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
            <div className="lg:col-span-7">
              {cart.items.length === 0 && <p className="text-neutral-500">Hãy thêm ít nhất một sản phẩm vào giỏ hàng</p>}
              <ul>
                {cart.items.map((item) => (
                  <CartItem 
                    key={item.id}
                    data={item}
                  />
                ))}
              </ul>
            </div>
            <Summary />
          </div>
        </div>
      </Container>
    </div>
  );
}

export default CartPage;