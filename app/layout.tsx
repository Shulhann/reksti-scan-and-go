import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Roboto } from "next/font/google";
import "./globals.css";
import Link from "next/link";

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
    <html lang="en">
      <body className={roboto.className}>
        {/* <header className="bg-[#7AB2B2] flex justify-evenly">
          <div className="flex justify-center">
            <Link href="/as">
              <button className="py-8 px-5 text-white text-2xl font-semibold hover:bg-emerald-600">About</button>
            </Link>
            <Link href="/as">
              <button className="py-8 px-5 text-white text-2xl font-semibold hover:bg-emerald-600">Pengguna</button>
            </Link>
            <Link href="/as">
              <button className="py-8 px-5 text-white text-2xl font-semibold hover:bg-emerald-600">Riwayat</button>
            </Link>
          </div>
          <div className="flex justify-center">
            <Link href="/as">
              <button className="py-8 px-5 text-white text-2xl font-semibold hover:bg-emerald-600">Login</button>
            </Link>
            <Link href="/as">
              <button className="py-8 px-5 text-white text-2xl font-semibold hover:bg-emerald-600">Register</button>
            </Link>
          </div>
        </header> */}
        
        <main className="app">
          {children}
        </main>
        
        {/* <footer className=" w-full flex justify-center absolute bottom-0">
          <h1>
            @Scan and Go Rekayasa Sistem dan Teknologi Informasi
          </h1>
        </footer> */}
      </body>
    </html>
  );
}
