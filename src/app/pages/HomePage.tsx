"use client"
import { chain } from "@/app/chain";
import { client } from "@/app/client";
import { useState } from "react";
import { prepareContractCall, toWei } from "thirdweb";
import { ConnectButton, TransactionButton, useActiveAccount, useReadContract } from "thirdweb/react";
import { contract } from "../../../utils/contract";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Coffee, DollarSign, Users, Star } from "lucide-react"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export const HomePage = () => {

    const [tipaccount, setTipAmount] = useState(0);
    const [message, setMessage] = useState("");
    const [selectedCreator, setSelectedCreator] = useState('')

    const {
        data: totalCoffee,
        refetch: refetchTotalCoffee,
    } = useReadContract({
        contract: contract,
        method: "getTotalCoffee",
    });

    return (
        <div className="flex flex-col min-h-screen">
        {/* <header className="px-4 lg:px-6 h-14 flex items-center bg-gray-100 "> */}
        <header className="px-4 lg:px-6 h-14 flex items-center bg-gradient-to-b from-gray-300 to-gray-100">
        <Link className="flex items-center justify-center" href="/">
          <Coffee className="h-6 w-6 mr-2" />
          <span className="text-xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 inline-block text-transparent bg-clip-text  ">NeoTron</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/">
            Home
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/register">
            Creator Register
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/login">
            Login
          </Link>
        </nav>
      </header>
      <main className="flex-1">
      <section className="w-full py-8 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-6xl font-bold tracking-tighter bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 inline-block text-transparent bg-clip-text ">
                  NeoTron
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  The new Patreon.
                </p>
              </div>
              <div className="space-x-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-1 rounded-xl">
              <ConnectButton client={client} chain={chain}  />
              </div>
            </div>
          </div>
        </section>

        <section className="w-full md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4">
              <h2 className="text-3xl font-bold text-center">Support Your Favorite Creator</h2>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label htmlFor="tipAmount" className="block text-sm font-medium text-gray-700 mb-1">
                      Tip Amount
                    </label>
                    <Input
                      id="tipAmount"
                      type="number"
                      placeholder="Enter amount"
                      min="0"
                      step="0.01"
                      required
                      className="w-full"
                      value={tipaccount}
                      onChange={(e) => setTipAmount(Number(e.target.value))}
                    />
                  </div>

                  
                    <div className="flex-1">
                    <label htmlFor="creator" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                      Creator
                    </label>
                    <Select onValueChange={setSelectedCreator} value={selectedCreator}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a creator" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="creator1">Creator 1</SelectItem>
                        <SelectItem value="creator2">Creator 2</SelectItem>
                        <SelectItem value="creator3">Creator 3</SelectItem>
                        {/* Add more creators as needed */}
                      </SelectContent>
                    </Select>
                    </div>


                  <div className="flex-1">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <Input
                      id="message"
                      type="text"
                      placeholder="Leave a message"
                      className="w-full"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-x-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-1 rounded-xl">

              {message && tipaccount > 0 && selectedCreator && (
                <TransactionButton
                        transaction={() => (
                          prepareContractCall({
                            contract: contract,
                            method: "buymecoffee",
                            params: [message],
                            value: BigInt(toWei(tipaccount.toString())),
                          })
                        )}
                        onTransactionConfirmed={() => {
                            alert("ThankYou");
                            setTipAmount(0);
                            setMessage("");
                            refetchTotalCoffee();
                          }}
                          className="w-full bg-gradient-to-r p-2 from-green-800 via-green-300 to-green-800 text-white" >
                        Submit
                    </TransactionButton>
                    )}
                  </div>

            </div>
          </div>
        </section>
      </main>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 border-gray-200 p-4 rounded-lg">
                <Coffee className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Easy Support</h3>
                <p className="text-gray-500 dark:text-gray-400 text-center">
                  Supporters can buy you a coffee with just a few clicks.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-200 p-4 rounded-lg">
                <DollarSign className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Flexible Funding</h3>
                <p className="text-gray-500 dark:text-gray-400 text-center">
                  Choose between one-time donations or recurring support.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-200 p-4 rounded-lg">
                <Users className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Community Building</h3>
                <p className="text-gray-500 dark:text-gray-400 text-center">
                  Engage with your supporters and build a loyal community.
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* <div className="mt-8 border border-gray-700 p-8 rounded-lg w-[500px]">
            <div className="text-center mb-8">
                <ConnectButton client={client} chain={chain} />
            </div>
            <div className="flex flex-col">
                <label className="text-lg">Tip Amount</label>
                <p className="text-xs text-gray-500 mb-2">* must be greater than 0</p>
                <input
                    type="number"
                    value={tipaccount}
                    onChange={(e) => setTipAmount(Number(e.target.value))}
                    step={0.01}
                    className="p-2 mb-4 border-none bg-gray-100 rounded-md"
                />
                <label className="text-lg mb-2">Message</label>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Enter a message..."
                    className="p-2 mb-4 border-none bg-gray-100 rounded-md"
                />
                {message && tipaccount > 0 && (
                    // <TransactionButton
                    //     transaction={() => (
                    //         prepareContractCall({
                    //             contract: contract,
                    //             method: "buymecoffee",
                    //             params: [message],
                    //             value: BigInt(toWei(tipaccount.toString())),
                    //         })
                    //     )}
                    //     onTransactionConfirmed={() => {
                    //         alert("Thank you for the coffee");
                    //         setTipAmount(0);
                    //         setMessage("");
                    //         refetchTotalCoffee();
                    //     }}
                    //     className="mt-8 bg-royalblue text-white text-sm py-2 px-4 rounded"
                    // >
                    //     Buy A Coffee
                    // </TransactionButton>
                )}
                <div>
                    <h3 className="mb-4">Total coffees: {totalCoffee?.toString()}</h3>
                </div>
            </div>
            <Link href="/dashboard" className="mb-4 inline-block text-royalblue">
                Go to Dashboard
            </Link>
            <Link href="/testpage" className="mb-4 inline-block text-royalblue">
                Go to testpage
            </Link>
        </div> */}
      </div>
    );
};
