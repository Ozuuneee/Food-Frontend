"use client";
import { Button } from "@/components/ui/button";
import { Minus, Plus, PlusIcon } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { FoodType } from "./Dishes";

interface CartItem {
  food: FoodType;
  quantity: number;
}

export const AddOrder = ({ food, id }: { food: FoodType; id: string }) => {
  const [order, setOrder] = useState(1);
  const isAvailable = order >= 2 ? "border-primary" : "";

  const addFoodOrder = (food: FoodType) => {
    const existingCart: CartItem[] = JSON.parse(
      localStorage.getItem("orderItems") || "[]"
    );

    const existingItemIndex = existingCart.findIndex(
      (item: CartItem) => item.food._id === food._id
    );

    if (existingItemIndex !== -1) {
      existingCart[existingItemIndex].quantity += order;
    } else {
      existingCart.push({
        food,
        quantity: order,
      });
    }

    localStorage.setItem("orderItems", JSON.stringify(existingCart));

    setOrder(1);
  };

  return (
    <Dialog>
      <DialogTitle className="text-center">
        <DialogTrigger asChild>
          <Button variant={"outline"} className="rounded-full px-3 py-5">
            <Plus color={"red"} />
          </Button>
        </DialogTrigger>
      </DialogTitle>
      <DialogContent className="max-w-3xl flex rounded-[20px] gap-6 p-6">
        <div
          className="w-[377px] h-[364px] rounded-xl bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${food.image})` }}
        ></div>
        <div className="flex flex-col justify-between mt-[36px] w-[377px]">
          <div className="grid gap-3">
            <h2 className="text-red-500 text-3xl font-semibold">{food.name}</h2>
            <h4 className="text-base font-normal text-foreground">
              {food.ingredients}
            </h4>
          </div>
          <div className="grid gap-6">
            <div className="flex w-full justify-between items-center">
              <div>
                <h4 className="text-base font-normal">Total price</h4>
                <h4 className="text-2xl font-semibold">
                  ${(food.price * order).toFixed(2)}
                </h4>
              </div>
              <div className="flex gap-3 items-center">
                <Button
                  variant={"outline"}
                  className={`${isAvailable} rounded-full px-3 py-5`}
                  onClick={() => {
                    if (order > 1) {
                      setOrder(order - 1);
                    }
                  }}
                >
                  <Minus />
                </Button>
                {order}
                <Button
                  variant={"outline"}
                  className="rounded-full px-3 py-5 border border-primary"
                  onClick={() => {
                    setOrder(order + 1);
                  }}
                >
                  <PlusIcon />
                </Button>
              </div>
            </div>
            <DialogClose asChild>
              <Button
                className="rounded-full"
                onClick={() => {
                  addFoodOrder(food);
                }}
              >
                Add to cart
              </Button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
