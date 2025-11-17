
import type { Metadata } from "next";
import ScrollToTop from "@/components/Landingpage-components/ScrollToTop";
import { Inter } from "next/font/google";
import "../styles/index.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster } from "sonner";
import { Toaster as ShadcnToaster } from "@/components/ui/toaster";
import ConditionalLayout from "./ConditionalLayout";

const inter = Inter({ subsets: ["latin"] });




export const metadata: Metadata = {
  title: "ICAP 2025 | International Conference on Advances in Physics",
  description:
    "Join ICAP 2025, the International Conference on Advanceds in Physics, showcasing the latest advances and research in physics and related fields.",
  keywords: [
    "ICAP 2025",
    "ICAP SUST",
    "SUST Conference 2025",
    "icap2025",
    "ICAP Conference 2025",
    "ICAP 2025 Conference",
    "ICAP Physics",
    "SUST International Conference",
    "SUST Physics",
    "ICAP Conference",
    "International Conference on Advances in Physics",
    "Physics Conference 2025",
    "SUST Physics Conference",
    "SUST Physics Department",
    "International Conference on Physics 2025",
    "International Conference on Physics",
    "ICAP Registration Fee",
    "International Conference in December 2025",
    "International Physics Conference",
    "Shahjalal University of Science and Technology",
    "Advanced Physics Research",
    "Condensed Matter Physics",
    "Quantum Physics Conference",
    "Theoretical Physics",
    "Experimental Physics",
    "Computational Physics",
    "Astrophysics Conference",
    "Nuclear Physics",
    "Particle Physics",
    "Applied Physics",
    "Materials Science",
    "Nanotechnology",
    "Photonics",
    "Plasma Physics",
    "Biophysics",
    "Physics Symposium Bangladesh",
    "Physics Research Sylhet",
    "Academic Conference Bangladesh",
    "Scientific Conference 2025",
    "Physics Innovation",
    "Research Presentation",
    "Abstract Submission Physics",
    "Call for Papers Physics",
    "Physics Workshop",
    "Physics Seminar",
    "Emerging Physics Technologies",
    "Physics Education",
    "Physics Collaboration",
    "International Physics Community",
    "Physics Networking Event",
    "December 2025 Conference",
    "South Asian Physics Conference",
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
        width: 128,
        height: 128,
        alt: "ICAP 2025 Conference Logo",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
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
        width: 128,
        height: 128,
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
        {/* for Richer Search Result */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Event",
              name: "International Conference on Advances in Physics 2025",
              startDate: "2025-12-17T09:00:00+06:00",
              endDate: "2025-12-18T17:00:00+06:00",
              eventStatus: "https://schema.org/EventScheduled",
              eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
              location: {
                "@type": "Place",
                name: "SUST Campus Auditorium",
                address: {
                  "@type": "PostalAddress",
                  streetAddress: "University Avenue",
                  addressLocality: "Sylhet",
                  postalCode: "3114",
                  addressCountry: "BD"
                }
              },
              image: [
                "https://icap2025.sust.edu/hero_image.svg"
              ],
              description: "International Conference on Advances in Physics 2025, hosted by SUST Department of Physics.",
              organizer: {
                "@type": "Organization",
                name: "Department of Physics, SUST",
                logo: "https://icap2025.sust.edu/ICAPicon.svg",
                url: "https://icap2025.sust.edu"
              }
            }),
          }}
        />
      </head>
      <body className={` ${inter.className}`}>
        <AuthProvider>
          <Toaster position="top-right" richColors />
          <ShadcnToaster />
          <ConditionalLayout>
            {children}
          </ConditionalLayout>
          <div id="modal-root" />
          <ScrollToTop />
        </AuthProvider>
      </body>
    </html>
  );
}


