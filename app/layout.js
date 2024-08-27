import { Inter } from "next/font/google";
import "./globals.css";
import { ChatProvider } from "../context/ChatContext";
import { AuthProvider } from "../context/AuthContext";
import {
  ClerkProvider
} from '@clerk/nextjs'

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Rate My Professor",
  description:
    "Find the best professors in your university for your next class",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <AuthProvider>
        <html lang="en">
          <body className={inter.className}>
            <ChatProvider>{children}</ChatProvider>
          </body>
        </html>
      </AuthProvider>
    </ClerkProvider>
  );
}
