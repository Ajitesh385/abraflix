import { Inter } from "next/font/google";
import "./globals.css";
import "./revamp.css";
import Navbar from "@/components/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "AbraFlix — Your Personal Cinema",
  description:
    "A beautiful, liquid glass streaming experience. Search, discover, and watch movies and TV shows.",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('abraflix-theme') || 'soft-green';
                  document.documentElement.setAttribute('data-theme', theme);
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body>
        <div className="bg-animated">
          <div className="bg-orb-1"></div>
          <div className="bg-orb-2"></div>
          <div className="bg-orb-3"></div>
        </div>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
