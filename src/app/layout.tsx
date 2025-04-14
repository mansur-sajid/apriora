"use client";

import "./globals.css";
import { useState } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SessionProviderWrapper from "./session-provider"; // Import the new provider


export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}> {/* Add the query client provider */}
        <SessionProviderWrapper>
          <nav className="p-4 flex justify-end">
          </nav>
          {children}
        </SessionProviderWrapper>
        </QueryClientProvider>
      </body>
    </html>
  );
}
