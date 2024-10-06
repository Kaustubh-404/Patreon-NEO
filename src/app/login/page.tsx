"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Link from "next/link"
import { Coffee } from "lucide-react"

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    // For this example, we'll just log it and show a mock error
    console.log({ username, password })
    setError('Login failed. Please try again.')
  }

  return (
    <div className="flex flex-col min-h-screen">

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
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>Create a new account to get started.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input 
                id="username" 
                type="text" 
                placeholder="Enter your username" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="Enter your password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && (
                `${alert("Login successful")}`
            )}
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
                <Link href="/dashboard">
                    Login
                </Link>
                </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
    </div>
  )
}