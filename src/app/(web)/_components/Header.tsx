import Link from "next/link";
import { Logo } from "../../admin/_components/Logo";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import CartSheet from "./SheetTable";
import { AddLocation } from "./AddLocation";

export const Header = () => {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) {
    return null;
  }

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
            <AddLocation />
          </Label>
          <Input id="address" type="adress" className="hidden" />
        </div>

        <CartSheet />

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
