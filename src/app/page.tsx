"use client";
import { getRequiredTokens, getPresales } from "./utils";
import { useEffect, useState } from "react";
export default function Home() {
  const [launchpadNum, setLaunchPadNum] = useState<number>(4);
  const [requiredTokens, setRequiredTokens] =
    useState<getRequiredTokensQuery | null>(null);
  const [tokenState, setTokenState] = useState<SoldToken | null>();
  const [tokenInfo, setTokenInfo] = useState<TokenInfo | null>();
  const width = 400;
  const half = width / 2;

  // Types will be placed in a diff folder.
  type tokenAllocation = {
    symbol: string;
    amount: number;
    color: string;
    totalSold: number;
  };

  type getRequiredTokensQuery = {
    tokensPresale: string;
    tokensListing: string;
    tokensFee: string;
  };

  type SoldToken = {
    soldToken: string;
  };

  type TokenInfo = {
    name: string;
    symbol: string;
    decimals: number;
    supply: string;
  };

  useEffect(() => {
    const getAllTokenInfo = async () => {
      try {
        const response = await getPresales(launchpadNum);

        const soldToken: SoldToken = response?.value[0].state.soldToken;
        const tokenInfo: TokenInfo = response?.value[0].token_params;
        const getRequiredTokensQuery = (await getRequiredTokens(
          launchpadNum
        )) as getRequiredTokensQuery;
        setRequiredTokens(getRequiredTokensQuery);
        setTokenState(soldToken);
        setTokenInfo(tokenInfo);
      } catch (error) {
        console.log(error);
      }
    };

    getAllTokenInfo();
  }, [launchpadNum]);

  // console.log(requiredTokens);
  // console.log(tokenState);
  // console.log(tokenInfo);

  const tokenAllocation: tokenAllocation[] = [
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
