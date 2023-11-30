"use client";
import { Group } from "@visx/group";
import { Pie } from "@visx/shape";
import { Text } from "@visx/text";
import { getRequiredTokens, getPresales } from "./utils";
import { useEffect, useState } from "react";
export default function Home() {
  const [active, setActive] = useState<tokenAllocation | undefined>(undefined);
  const [launchpadNum, setLaunchPadNum] = useState<number>(5);
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

  const tokenAllocations: tokenAllocation[] = [
    {
      symbol: "Presale",
      amount: 172.5,
      color: "#e38627",
      totalSold: 420,
    },
    {
      symbol: "Listing",
      amount: 138,
      color: "#c13c38",
      totalSold: 420,
    },
    {
      symbol: "Fees",
      amount: 3.45,
      color: "#6a2135",
      totalSold: 420,
    },
    {
      symbol: "Unlocked",
      amount: 106.05,
      color: "#1f7a8c",
      totalSold: 420,
    },
  ];

  return (
    <svg className="mt-12" width={width} height={width}>
      <Group top={half} left={half}>
        <Pie
          data={tokenAllocations}
          pieValue={(data) => {
            return data.amount / data.totalSold;
          }}
          outerRadius={half}
          innerRadius={({ data }) => {
            const activeSymbol = active?.symbol;
            const dataSymbol = data?.symbol;

            const size = activeSymbol && activeSymbol === dataSymbol ? 18 : 8;
            return half - size;
          }}
          padAngle={0.01}
        >
          {(pie) => {
            return pie.arcs.map((arc) => {
              return (
                <g
                  key={arc.data.symbol}
                  onMouseEnter={() => setActive(arc.data)}
                  onMouseLeave={() => setActive(undefined)}
                >
                  <path d={pie.path(arc) ?? ""} fill={arc.data.color}></path>
                </g>
              );
            });
          }}
        </Pie>
      </Group>
    </svg>
  );
}
