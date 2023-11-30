export type tokenAllocation = {
  symbol: string;
  amount: number;
  color: string;
  totalSold: number;
};

export type getRequiredTokensQuery = {
  tokensPresale: string;
  tokensListing: string;
  tokensFee: string;
};

export type SoldToken = {
  soldToken: string;
};

export type TokenInfo = {
  name: string;
  symbol: string;
  decimals: number;
  supply: string;
};
