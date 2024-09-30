"use client"
import { chain } from "@/app/chain";
import { client } from "@/app/client";
import { useState } from "react";
import { prepareContractCall, toWei } from "thirdweb";
import { ConnectButton,  TransactionButton,  useActiveAccount, useReadContract } from "thirdweb/react"
import { contract } from "../../../utils/contract";


export const BuyMeCoffee = ()=>{

    const [tipaccount, setTipAmount]= useState(0);
    const [message, setMessage] = useState("");

    const {
        data: totalCoffee,
        refetch: refetchTotalCoffee,
    } = useReadContract({
        
        contract: contract,
        method: "getTotalCoffee",
    });

    

    const account = useActiveAccount();
        if(account){
            return(
                <div
                    style={{
                        marginTop: "2rem", 
                        border: "1px solid #252525",
                        padding: "2rem",
                        borderRadius: "6px",
                        width: "500px",
                    }}>
                    <div style={{
                        textAlign: "center",
                        marginBottom : "2rem"
                    }}>
                    <ConnectButton
                        client={client}
                        chain={chain}
                    >
                    </ConnectButton>
                    </div>
                    <div style={{
                        display: "flex",
                        flexDirection: "column"
                    }}>
                        <label style={{fontSize:"1.15rem",}}>Tip Ammount</label>
                        <p style={{fontSize:"10px",color:"#888",marginBottom:"0.5rem"}}>* must be greater than 0</p>
                        <input type="number" 
                            value={tipaccount}
                            onChange={(e)=>{setTipAmount(Number(e.target.value))}}
                            step={0.01}
                            style={{
                                padding: "0.5rem",
                                border: "none",
                                marginBottom: "1rem",
                            }}
                        />
                        <label style={{ fontSize: "1.15rem", marginBottom: "0.5rem"}}>Message</label>
                    <input 
                        type="text" 
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Enter a message..."
                        style={{
                            padding: "0.5rem",
                            border: "none",
                            marginBottom: "1rem",
                        }}
                    />
                    {message && tipaccount >0 &&(
                        <TransactionButton
                            transaction={()=>(prepareContractCall({
                                contract: contract,
                                method: "buymecoffee",
                                params: [message],
                                value: BigInt(toWei(tipaccount.toString())),
                            }))}
                            onTransactionConfirmed={()=>{
                                alert("Thank Ypu for the coffee");
                                setTipAmount(0);
                                setMessage("");
                                refetchTotalCoffee();
                            }}
                            style={{
                                marginTop: "2rem",
                                backgroundColor: "royalblue",
                                color: "white",
                                fontSize: "0.75rem",
                                marginBottom: "2rem",
                            }}
                        >Buy A Coffee</TransactionButton>
                    )}

                    <div>
                        <h3 style={{marginBottom: "1rem"}}>Total coffees : {totalCoffee?.toString()}</h3>
                    </div>

                    </div>
            </div>
            )
    }
}

