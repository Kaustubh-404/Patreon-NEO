"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { BarChart, Bar, LineChart, PieChart, Pie , Cell,Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Home, LayoutDashboard, DollarSign, CreditCard, Wallet } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// Mock data for the chart
const monthlyEarnings = [
  { month: "Jan", earnings: 1000 },
  { month: "Feb", earnings: 1500 },
  { month: "Mar", earnings: 1200 },
  { month: "Apr", earnings: 1800 },
  { month: "May", earnings: 2000 },
  { month: "Jun", earnings: 2400 },
]

// Mock data for transactions
const transactions = [
  { from: "User A", amount: 500, time: "2023-06-01 10:30 AM" },
  { from: "User B", amount: 750, time: "2023-06-02 2:45 PM" },
  { from: "User C", amount: 1000, time: "2023-06-03 9:15 AM" },
  { from: "User D", amount: 250, time: "2023-06-04 4:00 PM" },
  { from: "User E", amount: 1500, time: "2023-06-05 11:20 AM" },
]

// Mock data for transactions per month
const transactionsPerMonth = [
  { month: "Jan", transactions: 50 },
  { month: "Feb", transactions: 80 },
  { month: "Mar", transactions: 70 },
  { month: "Apr", transactions: 90 },
  { month: "May", transactions: 110 },
  { month: "Jun", transactions: 130 },
]

const audienceData = [
  { name: "YouTube", value: 40, color: "#FF0000" },
  { name: "Instagram", value: 26, color: "#E1306C" },
  { name: "Twitter", value: 10, color: "#1DA1F2" },
  { name: "Reddit", value: 24, color: "#FF4500" },
]

// Mock data for donation sources
const donationData = [
  { name: "Reddit", value: 60, color: "#FF4500" },
  { name: "Other", value: 40, color: "#0099FF" },
]
export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")

  const totalEarnings = monthlyEarnings.reduce((sum, month) => sum + month.earnings, 0)
  const totalTransactions = transactionsPerMonth.reduce((sum, month) => sum + month.transactions, 0)
  const [withdrawAmount, setWithdrawAmount] = useState("")

  const totalCollection = transactions.reduce((sum, transaction) => sum + transaction.amount, 0)

  const handleWithdraw = () => {
    // Implement withdrawal logic here
    console.log(`Withdrawing $${withdrawAmount}`)
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            {/* Replace with your actual logo */}
            <svg
              className="h-8 w-8 text-blue-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            <span className="ml-2 text-xl font-bold">MyDashboard</span>
          </div>
          <h1 className="flex items-center justify-center">
            <Wallet className="mr-2 h-4 w-4" /> 
            Connect Wallet
          </h1>
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-md">
          <div className="p-4">
            <nav>
              <Button
                variant={activeTab === "home" ? "default" : "ghost"}
                className="w-full justify-start mb-2"
                onClick={() => setActiveTab("home")}
              >
                <Home className="mr-2 h-4 w-4" /> Home
              </Button>
              <Button
                variant={activeTab === "dashboard" ? "default" : "ghost"}
                className="w-full justify-start mb-2"
                onClick={() => setActiveTab("dashboard")}
              >
                <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
              </Button>
              <Button
                variant={activeTab === "payout" ? "default" : "ghost"}
                className="w-full justify-start mb-2"
                onClick={() => setActiveTab("payout")}
              >
                <DollarSign className="mr-2 h-4 w-4" /> Payout
              </Button>
              <Button
                variant={activeTab === "transactions" ? "default" : "ghost"}
                className="w-full justify-start mb-2"
                onClick={() => setActiveTab("transactions")}
              >
                <CreditCard className="mr-2 h-4 w-4" /> Transactions
              </Button>
            </nav>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 p-8 overflow-auto">
          {activeTab === "dashboard" && (
            <div>
              <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Total Earnings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">${totalEarnings.toLocaleString()}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Average Monthly Earnings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">
                      ${(totalEarnings / monthlyEarnings.length).toLocaleString()}
                    </p>
                  </CardContent>
                </Card>
              </div>
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Monthly Earnings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={monthlyEarnings}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="earnings" fill="#3b82f6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          {activeTab === "home" && (
            <div>
              <h1 className="text-3xl font-bold mb-6">Home</h1>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Audience Analytics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart layout="vertical" data={audienceData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis type="number" />
                          <YAxis dataKey="name" type="category" />
                          <Tooltip />
                          <Bar dataKey="value" fill="#8884d8">
                            {audienceData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Donation Sources</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={donationData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            label
                          >
                            {donationData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
            {activeTab === "payout" && (
            <div>
              <h1 className="text-3xl font-bold mb-6">Payout</h1>
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Total Collection</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">${totalCollection.toLocaleString()}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Withdraw Funds</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    <Input
                      type="number"
                      placeholder="Enter amount"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                    />
                    <Button onClick={handleWithdraw}>Withdraw</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          {activeTab === "transactions" && (
            <div>
              <h1 className="text-3xl font-bold mb-6">Transactions</h1>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Total Transactions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">{totalTransactions}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Transactions (Last 30 Days)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">{transactionsPerMonth[5].transactions}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Total Earnings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">${totalEarnings.toLocaleString()}</p>
                  </CardContent>
                </Card>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Transactions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>From</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Time</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {transactions.map((transaction, index) => (
                          <TableRow key={index}>
                            <TableCell>{transaction.from}</TableCell>
                            <TableCell>${transaction.amount}</TableCell>
                            <TableCell>{transaction.time}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Transactions per Month</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={transactionsPerMonth}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Line type="monotone" dataKey="transactions" stroke="#3b82f6" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}