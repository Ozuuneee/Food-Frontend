"use client";
import { useEffect, useState } from "react";
import Category from "./admin/menu/page";
import { RootLayout } from "./admin/layout";

export default function Home() {
  return (
    <>
      <RootLayout>
        <Category />
      </RootLayout>
    </>
  );
}
