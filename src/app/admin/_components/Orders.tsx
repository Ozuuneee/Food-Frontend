"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const ordersData = Array(10).fill({
  id: 1,
  customer: "Test@gmail.com",
  food: "2 foods",
  date: "2024/12/20",
  total: "$26.97",
  address: "2024/12/СБД, 12-р хороо, СБД, наргиза эмнэлэг",
  state: "Pending",
});

export default function Orders() {
  const [orders, setOrders] = useState(ordersData);

  const getBadgeColor = (state: string) => {
    switch (state) {
      case "Pending":
        return "bg-red-200 text-red-700";
      case "Delivered":
        return "bg-green-200 text-green-700";
      case "Cancelled":
        return "bg-gray-200 text-gray-700";
      default:
        return "bg-blue-200 text-blue-700";
    }
  };

  return (
    <div className="flex">
      <div className="w-full p-6">
        <Card>
          <CardContent>
            <h2 className="text-xl font-bold mb-4">Orders</h2>
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead>#</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Food</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Delivery Address</TableHead>
                  <TableHead>State</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order, index) => (
                  <TableRow key={index} className="cursor-pointer">
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.food}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>{order.total}</TableCell>
                    <TableCell className="truncate w-48">
                      {order.address}
                    </TableCell>
                    <TableCell>
                      <Badge className={getBadgeColor(order.state)}>
                        {order.state}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
