import { Signer, Contract, Provider } from "koilib";
import koinCityAbi from "../app/contracts/koincity-abi.json";
const provider = new Provider(["https://api.koinos.io"]);
const signer = Signer.fromSeed(`${process.env.seed}`);
signer.provider = provider;

const koinCityContractAbi = {
  methods: {
    ...koinCityAbi.methods,
  },
  types: koinCityAbi.types,
};

const KoinCityContract = new Contract({
  id: `${process.env.koinCityContract}`,
  abi: koinCityContractAbi,
  provider,
  signer,
});

export const getTokenMetrics = async (
  start: number,
  limit: number,
  direction: number
) => {
  try {
    const { result } = await KoinCityContract.functions.getPresales({
      start: `${start}`,
      limit: `${limit}`,
      direction: `${direction}`,
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getRequiredTokens = async (launchpadNumber: number) => {
  try {
    const { result } = await KoinCityContract.functions.getRequiredTokens({
      value: `${launchpadNumber}`,
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};
