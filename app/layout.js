// layout.js
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ChatSphere",
  description: "An innovative AI-powered search engine",
  icons: {
    icon: "@/app/logo.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang='en' className='bg-background-light dark:bg-background-dark'>
      <body className={inter.className}>
        <div className='bg-background-light dark:bg-background-dark min-h-screen min-w-screen flex flex-col'>
          <main className='flex-grow flex items-center justify-center'>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
