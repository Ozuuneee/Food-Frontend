"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Facebook, Instagram } from "lucide-react";
import { Logo } from "@/app/admin/_components/Logo";

interface Category {
  _id: string;
  categoryName: string;
}

const Footer: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:8000/food-category");
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError("Error loading categories");
      }
    };

    fetchCategories();
  }, []);

  return (
    <footer className="bg-black text-white mt-16">
      <div className="bg-black w-[100%] h-10"></div>
      <div className="bg-red-500 overflow-hidden whitespace-nowrap">
        <div className="flex py-6 animate-marquee space-x-24">
          <span className="text-3xl text-white">Fast food delivery</span>
          <span className="text-3xl text-white">Fast food delivery</span>
          <span className="text-3xl text-white">Fast food delivery</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center">
              <span className="text-white font-bold text-lg">
                <Logo />
              </span>
            </div>
            <div>
              <h1 className="text-xl font-bold">NomNom</h1>
              <p className="text-gray-400 text-sm">Swift delivery</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="font-bold mb-4 text-lg">NOMNOM</h2>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>
              <a href="/" className="hover:text-white">
                Home
              </a>
            </li>
            <li>
              <a href="/" className="hover:text-white">
                Contact us
              </a>
            </li>
            <li>
              <a href="/" className="hover:text-white">
                Delivery zone
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-bold mb-4 text-lg">CATEGORIES</h2>
          {error && <p className="text-red-400">{error}</p>}
          <ul className="grid grid-cols-2 gap-4 text-gray-400 text-sm">
            {categories.length > 0 ? (
              categories.map((category) => (
                <li key={category._id}>
                  <Link href={`/${category._id}`} className="hover:text-white">
                    {category.categoryName}
                  </Link>
                </li>
              ))
            ) : (
              <p className="text-gray-400">Loading categories...</p>
            )}
          </ul>
        </div>

        <div>
          <h2 className="font-bold mb-4 text-lg">FOLLOW US</h2>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white">
              <Facebook className="w-5 h-5" />
              <span className="sr-only">Facebook</span>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <Instagram className="w-5 h-5" />
              <span className="sr-only">Instagram</span>
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 py-4 text-center text-gray-500 text-xs">
        <div className="container mx-auto">
          <p>
            Copyright © 2024 Nomnom LLC |{" "}
            <a href="#" className="hover:text-white">
              Privacy policy
            </a>{" "}
            |{" "}
            <a href="#" className="hover:text-white">
              Terms and condition
            </a>{" "}
            |{" "}
            <a href="#" className="hover:text-white">
              Cookie policy
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
