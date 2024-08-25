import { Inter } from "next/font/google";
import "./globals.css";
import { ChatProvider } from "../context/ChatContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Rate My Professor",
  description:
    "Find the best professors in your university for your next class",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ChatProvider>{children}</ChatProvider>
      </body>
    </html>
  );
}
