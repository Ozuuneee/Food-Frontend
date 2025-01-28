"use client";
import { Logo } from "./Logo";
import { LayoutDashboard, Settings, Truck } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navigation = () => {
  const path = usePathname();

  return (
    <div className="h-full py-9 px-5 flex flex-col gap-10 bg-background">
      <Link href={`/`}>
        <div className="flex gap-2">
          <Logo />
          <div>
            <h1 className="text-lg font-semibold">NomNom</h1>
            <h2 className="text-xs text-muted-foreground">Swift delivery</h2>
          </div>
        </div>
      </Link>

      <div className="flex flex-col w-[165px] gap-6">
        <Link href={`/admin/menu`}>
          <button
            className={`flex px-6 py-2 items-center gap-[10px] rounded-full ${
              path === "/admin/menu" ? "bg-black text-white" : ""
            }`}
          >
            <LayoutDashboard strokeWidth={1} />
            <h3 className="text-sm font-medium">Food menu</h3>
          </button>
        </Link>

        <Link href={`/admin/order`}>
          <button
            className={`flex px-6 py-2 items-center gap-[10px] rounded-full ${
              path === "/admin/order" ? "bg-black text-white" : ""
            }`}
          >
            <Truck strokeWidth={1} />
            <h3 className="text-sm font-medium">Orders</h3>
          </button>
        </Link>

        <Link href={`/admin/settings`}>
          <button
            className={`flex px-6 py-2 items-center gap-[10px] rounded-full ${
              path === "/admin/settings" ? "bg-black text-white" : ""
            }`}
          >
            <Settings strokeWidth={1} />
            <h3 className="text-sm font-medium">Settings</h3>
          </button>
        </Link>
      </div>
    </div>
  );
};
