"use client";
import { getTokenMetrics, getRequiredTokens } from "./utils";
import { useEffect, useState } from "react";
export default function Home() {
  useEffect(() => {
    const getAllTokenInfo = async () => {
      const tokenMetrics = await getTokenMetrics(5, 1, 1);
      const requiredTokenMetrics = await getRequiredTokens(5);
    };

    getAllTokenInfo();
  }, []);
  const width = 400;
  const half = width / 2;

  type tokenAllocationType = {
    symbol: string;
    amount: number;
    color: string;
    totalSold: number;
  };
  const tokenAllocation: tokenAllocationType[] = [
    {
      symbol: "Presale",
      amount: 172.5,
      color: "#e38627",
      totalSold: 420,
    },
    {
      symbol: "Listing",
      amount: 138,
      color: "#e38627",
      totalSold: 420,
    },
    {
      symbol: "Fees",
      amount: 3.45,
      color: "#e38627",
      totalSold: 420,
    },
    {
      symbol: "Unlocked",
      amount: 106.05,
      color: "#e38627",
      totalSold: 420,
    },
  ];

  return <svg className="mt-12" width={width} height={width}></svg>;
}
