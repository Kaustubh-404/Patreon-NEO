import { ConnectButton } from "@/app/thirdweb";
import { client } from "./client";
import { chain } from "./chain";
import { HomePage } from "@/app/pages/HomePage"

export default function Home() {
  return (
    <div>
      <HomePage/>
    </div>
  );
}