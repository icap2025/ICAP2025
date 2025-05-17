import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-20 bg-gradient-to-br from-gray-100 to-white dark:from-gray-900 dark:to-gray-950 text-center">
      <Image
        src="/programming.png" // Place an appropriate SVG or image in /public
        alt="Under Development image"
        width={300}
        height={300}
        className="mb-10"
        priority
      />

      <h1 className="text-3xl sm:text-5xl font-bold mb-4 text-gray-800 dark:text-white">
        ICAP 2025
      </h1>

      <h2 className="text-xl sm:text-2xl font-medium mb-6 text-gray-600 dark:text-gray-300">
        International Conference on Advances Physics
      </h2>

      <p className="text-md sm:text-lg max-w-xl text-gray-500 dark:text-gray-400">
        This website is currently under development. Stay tuned for updates about ICAP 2025 — a global gathering of researchers and scholars in Physical Science.
      </p>

      <footer className="mt-20 text-sm text-gray-400 dark:text-gray-600">
        &copy; {new Date().getFullYear()} ICAP 2025. All rights reserved.
      </footer>
    </div>
  );
}
