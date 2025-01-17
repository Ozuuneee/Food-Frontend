"use client";
import { useEffect, useState } from "react";
import Category from "./admin/menu/page";
import { Navigation } from "./admin/_components/Navigation";

export default function Home() {
  return (
    <div className="bg-muted h-screen flex gap-6  ">
      <Navigation />
      <Category />
    </div>
  );
}
