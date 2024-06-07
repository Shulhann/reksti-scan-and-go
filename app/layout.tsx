import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Roboto } from "next/font/google";
import "./globals.css";
import AuthProvider from "../contexts/AuthProvider";

const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: "Scan and Go",
  description: "Website untuk memudahkan parkir",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className={roboto.className}>
          
          <main className="app">
            {children}
          </main>
          
        </body>
      </html>
     </AuthProvider> 
  );
}
