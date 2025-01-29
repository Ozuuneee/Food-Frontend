"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { MapPin, ChevronRight } from "lucide-react";

export const AddLocation = () => {
  const [address, setAddress] = useState("");
  const [savedAddress, setSavedAddress] = useState("");

  const handleSaveLocation = async () => {
    try {
      const response = await fetch("http://localhost:8000/locations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address }),
      });

      if (response.ok) {
        setSavedAddress(address);
        setAddress("");
      } else {
        console.error("Failed to save address");
      }
    } catch (error) {
      console.error("Error saving address:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Label className="bg-background rounded-full py-2 px-3 flex items-center gap-1 cursor-pointer">
          <MapPin color="red" strokeWidth={1.5} />
          <h3 className="text-red-500">Delivery address:</h3>
          <h3 className="text-gray-500">{savedAddress || "Add location"}</h3>
          <ChevronRight color="gray" strokeWidth={1.5} size={18} />
        </Label>
      </DialogTrigger>

      <DialogContent className="max-w-md p-6 rounded-xl">
        <DialogHeader>
          <DialogTitle>Enter Your Address</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <Label htmlFor="address" className="text-gray-700 font-semibold">
            Address
          </Label>
          <Input
            id="address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter delivery address"
          />
        </div>

        <DialogFooter>
          <Button
            onClick={handleSaveLocation}
            disabled={!address}
            className="w-full bg-red-500"
          >
            Save Address
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
