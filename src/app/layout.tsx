import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Rubik } from "next/font/google";
import CartSidebar from "@/components/cart-sidebar.client";
import Footer from "@/components/footer.client";
import Navbar from "@/components/navbar.client";
import { CartProvider } from "@/context/CartContext";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
});

const rubik = Rubik({
  subsets: ["latin"],
  variable: "--font-rubik",
});

export const metadata: Metadata = {
  title: "ArcadeX - Gaming Expo",
  description: "The ultimate 7-day gaming marathon.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="scroll-smooth" lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${plusJakarta.variable} ${rubik.variable} bg-background text-on-surface font-body-md antialiased overflow-x-hidden flex flex-col min-h-screen`}
      >
        <CartProvider>
          <Navbar />
          <CartSidebar />
          <main className="grow flex flex-col">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
