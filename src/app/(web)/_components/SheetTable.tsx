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
import { useState, useEffect } from "react";
import DeliveryForm from "./DeliveryForm";

const SheetTable = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const [showForm, setShowForm] = useState(false);
  const [orderItems, setOrderItems] = useState<any[]>([]);

  useEffect(() => {
    const storedItems = localStorage.getItem("orderItems");
    if (storedItems) {
      try {
        const parsedItems = JSON.parse(storedItems);

        if (JSON.stringify(parsedItems) !== JSON.stringify(orderItems)) {
          setOrderItems(parsedItems);
        }
      } catch (error) {
        console.error("Error parsing cart data:", error);
        setOrderItems([]);
      }
    }
  }, [cart]);

  const subtotal = orderItems.reduce(
    (acc, item) => acc + (item.food.price || 0) * item.quantity,
    0
  );
  const shipping = 0.99;
  const total = subtotal + shipping;

  const handleRemove = (id: string) => {
    const updatedItems = orderItems
      .map((item) =>
        item.food._id === id ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item) => item.quantity > 0);

    setOrderItems(updatedItems);
    localStorage.setItem("orderItems", JSON.stringify(updatedItems));
    removeFromCart(id);
  };
  const handleAdd = (id: string) => {
    const updatedItems = orderItems.map((item) =>
      item.food._id === id ? { ...item, quantity: item.quantity + 1 } : item
    );

    setOrderItems(updatedItems);
    localStorage.setItem("orderItems", JSON.stringify(updatedItems));
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="bg-secondary text-secondary-foreground rounded-full p-3">
          <ShoppingCart size={15} />
        </button>
      </SheetTrigger>
      <SheetContent className="bg-[#404040] text-primary-foreground min-w-[540px] border-none ">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-3 text-lg text-primary-foreground">
            <ShoppingCart size={20} /> Order Detail
          </SheetTitle>
        </SheetHeader>

        <div className="flex items-center justify-center my-4 w-[471px] bg-white">
          <button className="bg-red-500 text-white rounded-full px-4 py-2">
            Cart
          </button>
          <button className="text-gray-400 ml-4">Order</button>
        </div>

        {orderItems.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        ) : (
          <div className="bg-white p-4 rounded-xl">
            <h2 className="text-black font-bold text-lg mb-4">My cart</h2>

            {orderItems.map((item) => (
              <div
                key={item.food._id}
                className="flex items-center gap-3 border-b pb-4 mb-4"
              >
                <img
                  src={item.food.image}
                  alt={item.food.name}
                  className="w-24 h-24 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-red-500 font-bold">{item.food.name}</h3>
                  <p className="text-gray-500 text-sm">
                    {item.food.ingredients}
                  </p>
                  <div className="flex items-center mt-2">
                    <button
                      className="px-2 py-1 border rounded-full text-black"
                      onClick={() => handleRemove(item.food._id)}
                    >
                      -
                    </button>
                    <span className="px-3 text-black">{item.quantity}</span>
                    <button
                      className="px-2 py-1 border rounded-full text-black"
                      onClick={() => handleAdd(item.food._id)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <button onClick={() => handleRemove(item.food._id)}>
                    <X size={20} className="text-red-500 hover:text-black" />
                  </button>
                  <p className="font-semibold text-black mt-12">
                    ${item.food.price * item.quantity}
                  </p>
                </div>
              </div>
            ))}

            <button
              className="w-full border rounded-full py-2 text-red-500"
              onClick={() => (window.location.href = "/")}
            >
              Add food
            </button>
          </div>
        )}

        {orderItems.length > 0 && (
          <div className="bg-white p-4 mt-4 rounded-xl">
            <h2 className="text-black font-bold text-lg mb-4">Payment info</h2>
            <div>
              <div className="flex justify-between mb-4 text-black">
                <p>Items</p>
                <p className="font-semibold">${subtotal.toFixed(2)}</p>
              </div>
              <div className="flex justify-between mb-4 text-black">
                <p>Shipping</p>
                <p className="font-semibold">${shipping.toFixed(2)}</p>
              </div>
              <div className="border-b mb-4 "></div>
              <div className="flex justify-between mb-4 text-black">
                <p>Total</p>
                <p className="font-semibold">${total.toFixed(2)}</p>
              </div>
            </div>
            <button
              className="bg-red-500 text-white rounded-full w-full py-3 mt-4"
              onClick={() => setShowForm(true)}
            >
              Checkout
            </button>
          </div>
        )}

        {showForm && (
          <DeliveryForm onSubmit={(details) => console.log(details)} />
        )}
      </SheetContent>
    </Sheet>
  );
};

export default SheetTable;
