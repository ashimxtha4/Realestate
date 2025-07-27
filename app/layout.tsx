import type { Metadata } from "next";
import { Inter, Pacifico } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/Layout/ClientLayout";

const inter = Inter({ subsets: ["latin"] });
const pacifico = Pacifico({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-pacifico",
});

export const metadata: Metadata = {
  title: "RealEstate - Find Your Dream Home",
  description: "Discover, buy, rent, and sell properties with our comprehensive real estate platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
