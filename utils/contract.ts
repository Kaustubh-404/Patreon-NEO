import { chain } from "@/app/chain";
import { client } from "@/app/client";
import { getContract } from "thirdweb";
import { contractABI } from "./contactAbi";

const contractAddress = "0x8120C0755d2297967e5e15384398DB0213e175d9";

export const contract = getContract({
    client: client,
    chain:chain,
    address: contractAddress,
    abi: contractABI,
})