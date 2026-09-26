import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { WorkoutProvider } from "@/context/WorkoutContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Oswald } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata = {
  title: "FitLog",
  description: "Workout tracking application",
};

export default function RootLayout({ children }) {
  return (
   <html
    lang="en"
    className={`${geistSans.variable} ${geistMono.variable} ${oswald.className} h-full antialiased`}>


      <body className="min-h-full bg-[#0c0d0e] text-white flex flex-col">
        <WorkoutProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <ToastContainer position="top-right" />
        </WorkoutProvider>
      </body>
    </html>
  );
}