export const metadata = {
  title: "Interview Page",
};

export default function InterviewRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* No sidebar, no main layout styling here */}
        {children}
      </body>
    </html>
  );
}
