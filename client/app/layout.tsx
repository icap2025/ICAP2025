
import type { Metadata } from "next";
import Footer from "@/components/Landingpage-components/Footer";
import Header from "@/components/Landingpage-components/Header";
import ScrollToTop from "@/components/Landingpage-components/ScrollToTop";
import { Inter } from "next/font/google";
import "../styles/index.css";

const inter = Inter({ subsets: ["latin"] });



export const metadata: Metadata = {
  title: "ICAP 2025 | International Conference on Advances in Physics",
  description:
    "Join ICAP 2025, the International Conference on Advanceds in Physics, showcasing the latest advances and research in physics and related fields.",
  keywords: [
    "ICAP 2025",
    "Physics Conference 2025",
    "Advanced Physics",
    "Physics Research",
    "International Conference",
    "ICAP",
    "Physics Innovation",
    "Research Conference",
    "Conference 2025",
    "Technology Advancements",
    "Academic Conference",
    "Global Physics Conference",
    "SUST",
    "Shahjalal University of Science and Technology",
  ],
  openGraph: {
    title: "ICAP 2025 | International Conference on Advances in Physics",
    description:
      "Discover the latest in advanced physics research and innovation at ICAP 2025. Engage with global experts and explore groundbreaking ideas.",
    url: "https://icap2025.sust.edu",
    type: "website",
    images: [
      {
        url: "https://icap2025.sust.edu/ICAPicon.svg",
        width: 1200,
        height: 630,
        alt: "ICAP 2025 Conference Logo",
      },
    ],
  },
  verification: {
    google: 'YOUR_GOOGLE_VERIFICATION_CODE', // ✅ Add this line
  },
  twitter: {
    card: "summary_large_image",
    site: "@icap2025",
    title: "ICAP 2025 | International Conference on Advanced Physics",
    description:
      "Join the ICAP 2025 conference for groundbreaking discussions on advanced physics research and innovation.",
    images: [
      {
        url: "https://icap2025.sust.edu/ICAPicon.svg",
        width: 1200,
        height: 630,
        alt: "ICAP 2025 Conference",
      },
    ],
  },
};















export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html suppressHydrationWarning lang="en">
      <head>
        <title>ICAP 2025 | International Conference on Advances in Physics</title>
        <meta name="description" content="Join ICAP 2025, the International Conference on Advances in Physics, showcasing the latest advances and research in physics and related fields." />
        <meta name="google-site-verification" content="JB36aYvl0Bzauo0JbNcbyxKqOBT2es9rELHKi3rsCLY" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://icap2025.sust.edu" />
        <link rel="icon" href="/ICAPicon.svg" sizes="any" />
        <meta name="author" content="ICAP 2025 Conference Team" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="ICAP 2025" />
        <meta property="og:image" content="https://icap2025.sust.edu/ICAPicon.svg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:title" content="ICAP 2025 | International Conference on Advances in Physics" />
        <meta property="og:description" content="Discover the latest in advanced physics research and innovation at ICAP 2025. Engage with global experts and explore groundbreaking ideas." />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@icap2025" />
        <meta name="twitter:title" content="ICAP 2025 | International Conference on Advanced Physics" />
        <meta name="twitter:description" content="Join the ICAP 2025 conference for groundbreaking discussions on advanced physics research and innovation." />
        <meta name="twitter:image" content="https://icap2025.sust.edu/ICAPicon.svg" />
      </head>
      <body className={`bg-[#FCFCFC] ${inter.className}`}>
        { <Header />}
        {children}
        <div id="modal-root" />
        { <Footer />}
        <ScrollToTop />
      </body>
    </html>
  );
}


