"use client";

import "./globals.css";
import { useState } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}> {/* Add the query client provider */}
          <nav className="p-4 flex justify-end">
          </nav>
          {children}

        </QueryClientProvider>
      </body>
    </html>
  );
}
