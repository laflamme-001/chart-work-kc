"use client";
import { getTokenMetrics, getRequiredTokens } from "./utils";
import { useEffect } from "react";
export default function Home() {
  useEffect(() => {
    const getAllTokenInfo = async () => {
      const tokenMetrics = await getTokenMetrics(5, 1, 1);
      const requiredTokens = await getRequiredTokens(5);
    };

    getAllTokenInfo();
  }, []);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24"></main>
  );
}
