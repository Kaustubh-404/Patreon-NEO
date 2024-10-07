import { chain } from "@/app/chain";
import { client } from "@/app/client";
import { getContract } from "thirdweb";
import { contractABI } from "./contactAbi";

const contractAddress = "0xBEd591DDCca865D0eDF0Aebc1d5712661FD48a84";

export const contract = getContract({
    client: client,
    chain:chain,
    address: contractAddress,
    abi: contractABI,
})