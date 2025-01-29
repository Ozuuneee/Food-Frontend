import { Card } from "@/components/ui/card";
import React from "react";
import { EditDish } from "./EditDish";

export const CardComp = ({ food, id, setFoods }: any) => {
  return (
    <Card className="bg-white w-[270px] h-[241px] rounded-3xl border relative">
      <div>
        <img
          src={food.image}
          alt={food.name || "No Name"}
          className="w-full h-[135px] object-cover object-center rounded-t-3xl"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center mt-2">
          <span className="text-red-500 font-semibold text-[14px]">
            {food.name || "Unnamed Food"}
          </span>
          <span className="text-[12px] font-semibold">
            ${food.price ? food.price.toFixed(2) : "0.00"}
          </span>
        </div>
        <p className="text-[12px] text-gray-600 mt-2">
          {food.ingredients || "No ingredients listed"}
        </p>
      </div>
      <div className="absolute top-16 right-6">
        <EditDish food={food} id={id} setFoods={setFoods} />
      </div>
    </Card>
  );
};
