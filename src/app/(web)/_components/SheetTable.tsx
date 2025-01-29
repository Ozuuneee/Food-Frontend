import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ShoppingCart, X } from "lucide-react";
import { useState } from "react";

const SheetTable = () => {
  const [activeTab, setActiveTab] = useState("cart");
  const cartItems = [
    {
      id: 1,
      name: "Sunshine Stackers",
      description:
        "Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.",
      price: 12.99,
      quantity: 1,
      image: "",
    },
    {
      id: 2,
      name: "Sunshine Stackers",
      description:
        "Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.",
      price: 12.99,
      quantity: 1,
      image: "",
    },
    {
      id: 3,
      name: "Sunshine Stackers",
      description:
        "Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.",
      price: 12.99,
      quantity: 1,
      image: "",
    },
  ];

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shipping = 0.99;
  const total = subtotal + shipping;

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

        <div className="flex mt-4 bg-secondary p-1 rounded-full">
          <button
            onClick={() => setActiveTab("cart")}
            className={`flex-1 py-2 text-sm font-semibold rounded-full ${
              activeTab === "cart" ? "bg-red-500 text-white" : "text-gray-400"
            }`}
          >
            Cart
          </button>
          <button
            onClick={() => setActiveTab("order")}
            className={`flex-1 py-2 text-sm font-semibold rounded-full ${
              activeTab === "order" ? "bg-red-500 text-white" : "text-gray-400"
            }`}
          >
            Order
          </button>
        </div>

        {activeTab === "cart" && (
          <div className="mt-6 bg-primary-foreground p-4 rounded-lg">
            <h2 className="text-lg font-bold text-black">My Cart</h2>

            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b border-gray-700 py-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    // src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-md object-cover"
                  />
                  <div>
                    <h3 className="text-red-500 font-bold">{item.name}</h3>
                    <p className="text-gray-400 text-xs">{item.description}</p>
                  </div>
                </div>
                <div className="text-white font-bold">
                  ${item.price.toFixed(2)}
                </div>
                <button className="text-red-500 hover:text-black">
                  <X size={20} />
                </button>
              </div>
            ))}

            <button className="border border-red-500 text-red-500 rounded-full px-4 py-2 w-full mt-4 hover:bg-red-500 hover:text-white">
              Add Food
            </button>
          </div>
        )}

        {activeTab === "cart" && (
          <div className="mt-6 bg-primary-foreground p-4 rounded-lg">
            <h2 className="text-lg font-bold text-black">Payment Info</h2>
            <div className="flex justify-between text-gray-400 text-sm">
              <span className="mt-2">Items</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-400 text-sm">
              <span className="mt-2">Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="border-t border-gray-700 my-2 mt-5"></div>
            <div className="flex justify-between font-bold text-black text-lg">
              <span className="mt-2">Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button className="bg-red-500 text-white rounded-full w-full py-3 mt-4 hover:bg-red-600">
              Checkout
            </button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default SheetTable;
