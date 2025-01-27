import { useAuth } from "@clerk/nextjs";
import path from "path";
import { use, useEffect, useState } from "react";
import { CategoryType } from "@/app/admin/_components/Dishes";

export function useAuthFetch(path: any) {
  const { getToken } = useAuth();
  const [data, setData] = useState<CategoryType[]>();

  async function getFetchData() {
    const token = await getToken();
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${path}`, {
      headers: {
        Authentication: `token`,
      },
    })
      .then((res) => res.json())
      .then((data) => setData(data));
  }
  useEffect(() => {
    getFetchData();
  }, []);

  return data;
}
