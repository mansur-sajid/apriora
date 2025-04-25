export const metadata = {
    title: "Log In | Naxiora",
  };
  
  export default function AuthRootLayout({ children }: { children: React.ReactNode }) {
    return (
      <html lang="en">
        <body>
          {/* No sidebar, no main layout styling here */}
          {children}
        </body>
      </html>
    );
  }
  