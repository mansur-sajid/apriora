export const metadata = {
  title: "Interview Room | Naxiora",
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
