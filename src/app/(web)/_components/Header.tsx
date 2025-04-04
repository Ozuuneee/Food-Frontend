"use client";
import Link from "next/link";
import { Logo } from "../../admin/_components/Logo";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ChevronRight,
  MapPin,
  Minus,
  Plus,
  ShoppingCart,
  User,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FoodType } from "./Dishes";
import { useEffect, useState } from "react";
import DeliveryForm from "./DeliveryForm";

export type OrderItem = {
  food: FoodType;
  quantity: number;
};

export const Header = () => {
  const { isSignedIn, user, isLoaded } = useUser();

  const [showForm, setShowForm] = useState(false);

  const existingOrderString = localStorage.getItem("orderItems");
  const existingOrder = JSON.parse(existingOrderString || "[]");
  const [foodOrderItems, setFoodOrderItems] =
    useState<OrderItem[]>(existingOrder);

  const onMinusOrderItems = (idx: number) => {
    if (foodOrderItems[idx].quantity > 1) {
      foodOrderItems[idx].quantity--;
      setFoodOrderItems([...foodOrderItems]);
      localStorage.setItem("orderItems", JSON.stringify(foodOrderItems));
    } else {
      return foodOrderItems;
    }
  };

  const onPlusOrderItems = (idx: number) => {
    foodOrderItems[idx].quantity++;
    setFoodOrderItems([...foodOrderItems]);
    localStorage.setItem("orderItems", JSON.stringify(foodOrderItems));
  };

  const deleteFoodFromOrder = (food: FoodType) => {
    const oldValues = localStorage.getItem("orderItems");
    const oldValuesItems = JSON.parse(oldValues || "[]");
    const oldFood = oldValuesItems.find(
      (item: OrderItem) => item.food._id === food?._id
    );
    if (oldFood) {
      oldValuesItems.splice(oldValuesItems.indexOf(oldFood), 1);
    }
    localStorage.setItem("orderItems", JSON.stringify(oldValuesItems));
  };

  const subtotal = foodOrderItems.reduce(
    (acc, item) => acc + (item.food.price || 0) * item.quantity,
    0
  );

  const shipping = 0.99;

  const total = subtotal + shipping;

  useEffect(() => {}, []);

  if (!isLoaded) {
    return null;
  }

  console.log({ foodOrderItems });

  return (
    <div className="py-3 px-[88px] flex bg-primary text-primary-foreground justify-between">
      <Link href={`/`}>
        <div className="flex gap-2 ">
          <div>
            <Logo />
          </div>
          <div>
            <h1 className=" text-lg font-semibold ">
              Nom<span className="text-red-500">Nom</span>
            </h1>
            <h2 className="text-xs text-muted-foreground  ">Swift delivery</h2>
          </div>
        </div>
      </Link>
      <div className="flex gap-3 items-center">
        <div>
          <Label
            htmlFor="address"
            className="bg-background rounded-full py-2 px-3 flex items-center gap-1"
          >
            <MapPin color="red" strokeWidth={1.5} />
            <h3 className="text-red-500">Delivery address:</h3>
            <h3 className="text-gray-500">Add location</h3>
            <ChevronRight color={`gray`} strokeWidth={1.5} size={18} />
          </Label>
          <Input id="address" type="adress" className="hidden" />
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <button className="bg-secondary text-secondary-foreground rounded-full p-3">
              <ShoppingCart size={15} />{" "}
            </button>
          </SheetTrigger>
          <SheetContent className="min-w-[535px] bg-neutral-700 border-none flex flex-col gap-6 rounded-bl-[20px] rounded-tl-[20px] ">
            <SheetTitle className="flex gap-3 text-primary-foreground">
              <ShoppingCart />
              <p>Order detail</p>
            </SheetTitle>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold">My card</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-5">
                {foodOrderItems.map((order: OrderItem, idx: any) => (
                  <div
                    key={order?.food?._id}
                    className="flex flex-col gap-[15px] "
                  >
                    <div className="flex gap-[10px]">
                      <div
                        className=" bg-center bg-no-repeat bg-cover min-w-[124px] h-[120px] rounded-xl"
                        style={{
                          backgroundImage: `url(${order?.food?.image})`,
                        }}
                      ></div>
                      <div className="flex flex-col gap-6">
                        <div className="flex gap-[10px]">
                          <div>
                            <h3 className="font-bold text-base text-red-500">
                              {order?.food?.name}
                            </h3>
                            <h4 className="font-normal text-xs text-foreground">
                              {order?.food?.ingredients}
                            </h4>
                          </div>
                          <Button
                            variant={"outline"}
                            className="border-red-500 px-3 py-5 rounded-full  "
                            onClick={() => {
                              deleteFoodFromOrder(order?.food);
                            }}
                          >
                            <X color="red" />
                          </Button>
                        </div>
                        <div className="w-full flex justify-between">
                          <div className="flex gap-3 items-center">
                            <button
                              className="rounded-full py-2 px-2 text-sm"
                              onClick={() => onMinusOrderItems(idx)}
                            >
                              <Minus size={13} />
                            </button>
                            <p className="font-semibold text-lg">
                              {order?.quantity}
                            </p>
                            <button
                              className="rounded-full py-2 px-2 text-sm"
                              onClick={() => onPlusOrderItems(idx)}
                            >
                              <Plus size={13} />
                            </button>
                          </div>
                          <div>${order?.quantity * order?.food?.price}</div>
                        </div>
                      </div>
                    </div>
                    {idx !== existingOrder.length - 1 && (
                      <hr className="border-[1px] border-dashed border-neutral-500" />
                    )}
                    <button
                      className="w-full border border-red-500 rounded-full py-2 text-red-500"
                      onClick={() => (window.location.href = "/")}
                    >
                      Add food
                    </button>
                  </div>
                ))}
              </CardContent>
              <CardFooter></CardFooter>
            </Card>
            {foodOrderItems.length > 0 && (
              <div className="bg-white p-4 mt-4 rounded-xl">
                <h2 className="text-black font-bold text-lg mb-4">
                  Payment info
                </h2>
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
                {showForm && (
                  <DeliveryForm onSubmit={(details) => console.log(details)} />
                )}
              </div>
            )}
          </SheetContent>
        </Sheet>
        {!isSignedIn && (
          <Popover>
            <PopoverTrigger className="bg-red-500 text-primary-foreground rounded-full px-3 py-[11px] flex items-center">
              <User size={18} strokeWidth={1.5} />
            </PopoverTrigger>
            <PopoverContent>
              <SignInButton />
            </PopoverContent>
          </Popover>
        )}
        <UserButton />
      </div>
    </div>
  );
};
