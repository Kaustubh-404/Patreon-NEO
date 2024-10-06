import { createThirdwebClient } from "thirdweb";

// const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID as string;
const CLIENT_ID = "0b4a4f7c15106b8f53657d75f8d9b256"

export const client = createThirdwebClient({
    clientId: CLIENT_ID,
});