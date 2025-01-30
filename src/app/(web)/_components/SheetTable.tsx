"use client";
import { useCart } from "./cartContext";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ShoppingCart, X } from "lucide-react";
import { useState } from "react";
import DeliveryForm from "./DeliveryForm";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const SheetTable = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const [showForm, setShowForm] = useState(false);

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shipping = 0.99;
  const total = subtotal + shipping;

  const foods = localStorage.getItem("orderItems");
  const orderItems: CartItem[] = JSON.parse(foods || "[]");

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="bg-secondary text-secondary-foreground rounded-full p-3">
          <ShoppingCart size={15} />
        </button>
      </SheetTrigger>
      <SheetContent className="bg-primary text-primary-foreground w-[400px]">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-3 text-lg text-primary-foreground">
            <ShoppingCart size={20} /> Order Detail
          </SheetTitle>
        </SheetHeader>

        {orderItems.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        ) : (
          orderItems.map((item, index) => (
            <div
              key={item.id || index}
              className="flex justify-between border-b py-4"
            >
              <div>
                <h3 className="text-red-500 font-bold">{item.name}</h3>
                <p className="text-gray-400">
                  {item.quantity} x ${item.price}
                </p>
              </div>
              <button onClick={() => removeFromCart(item.id)}>
                <X size={20} className="text-red-500 hover:text-black" />
              </button>
            </div>
          ))
        )}

        {cart.length > 0 && (
          <>
            <div className="flex justify-between py-4">
              <p className="text-gray-500">Subtotal:</p>
              <p className="font-semibold">${subtotal.toFixed(2)}</p>
            </div>
            <div className="flex justify-between py-4">
              <p className="text-gray-500">Shipping:</p>
              <p className="font-semibold">${shipping.toFixed(2)}</p>
            </div>
            <div className="flex justify-between py-4">
              <p className="text-gray-500">Total:</p>
              <p className="font-semibold">${total.toFixed(2)}</p>
            </div>
            <button
              className="bg-red-500 text-white rounded-full w-full py-3 mt-4"
              onClick={() => setShowForm(true)}
            >
              Checkout
            </button>
          </>
        )}

        {showForm && (
          <DeliveryForm
            onSubmit={(details) => {
              console.log("Order Details:", details);
              clearCart();
            }}
          />
        )}
      </SheetContent>
    </Sheet>
  );
};

export default SheetTable;
