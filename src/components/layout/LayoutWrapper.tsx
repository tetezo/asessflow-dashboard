import type React from "react"
import { Header } from "./Header"


export function LayoutWrapper({ children }:  { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="w-full flex flex-col py-5 px-4 my-0 mx-auto md:max-w-7xl md:py-8 md:px-6 ">
                {children}
            </main>
        </div>
    )
}