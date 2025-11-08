"use client";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import menuData from "./menuData";
import ClickOutside from "@/components/ClickOutSide";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";

const Header = () => {
  // Navbar toggle
  const [navbarOpen, setNavbarOpen] = useState(false);
  const navbarToggleHandler = () => {
    setNavbarOpen(!navbarOpen);
  };

  // Use Auth Context
  const { isLoggedIn, userData, logout } = useAuth();

 
  // Sticky Navbar
  const [sticky, setSticky] = useState(false);
  const [stickyEnabled, setStickyEnabled] = useState(true);
  
  useEffect(() => {
    const handleStickyNavbar = () => {
      if (stickyEnabled && window.scrollY >= 80) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };

    window.addEventListener("scroll", handleStickyNavbar);

    // Listen for custom event from MasonryImageGrid component
    const handleStickyToggle = (e) => {
      setStickyEnabled(e.detail.enabled);

      // Force immediate update of sticky state
      if (!e.detail.enabled) {
        setSticky(false);
      } else if (window.scrollY >= 80) {
        setSticky(true);
      }
    };

    window.addEventListener("toggleStickyNavbar", handleStickyToggle);

    // Cleanup event listeners
    return () => {
      window.removeEventListener("scroll", handleStickyNavbar);
      window.removeEventListener("toggleStickyNavbar", handleStickyToggle);
    };
  }, [stickyEnabled]);

  // submenu handler
  const [openIndex, setOpenIndex] = useState(-1);
  const handleSubmenu = (index) => {
    if (openIndex === index) {
      setOpenIndex(-1);
    } else {
      setOpenIndex(index);
    }
  };

  const usePathName = usePathname();

  return (
    <>
   
      <ClickOutside onClick={() => setNavbarOpen(false)} className="relative">
        <header
          className={`header left-0 top-0 z-40 flex w-full items-center ${sticky
            ? "fixed z-9999 bg-white !bg-opacity-80 shadow-sticky backdrop-blur-sm transition border-shadow border border-gray-200"
            : "absolute bg-transparent"
            }`}
        >
          <div className="container">
            <div className="relative -mx-4 flex items-center justify-between">
              <div className="w-full md:w-60 px-4 xl:mr-12">
                <Link
                  href="/"
                  className={`header-logo block w-full ${sticky ? "py-3 lg:py-2" : "py-5 lg:py-8"
                    }`}
                >
                  <div className="flex items-center">
                    <div className="relative h-10 w-auto">
                      <Image
                        src="/ICAPicon.svg"
                        alt="ICAP 2025 Logo"
                        width={120}
                        height={48}
                        className="h-full w-auto object-contain"
                      />
                    </div>
                    <span className="ml-2 text-lg font-semibold text-black md:text-xl">
                      ICAP2025
                    </span>
                  </div>
                </Link>
              </div>
              <div className="flex w-full items-center justify-between px-4">
                <div>
                  <button
                    onClick={navbarToggleHandler}
                    id="navbarToggler"
                    aria-label="Mobile Menu"
                    className="absolute right-4 top-1/2 block translate-y-[-50%] rounded-lg px-3 py-[6px] lg:hidden"
                  >
                    <span
                      className={`relative my-1.5 block h-0.5 w-[30px] bg-primary transition-all duration-300  ${navbarOpen ? " top-[7px] rotate-45" : " "
                        }`}
                    />
                    <span
                      className={`relative my-1.5 block h-0.5 w-[30px] bg-primary transition-all duration-300  ${navbarOpen ? "opacity-0 " : " "
                        }`}
                    />
                    <span
                      className={`relative my-1.5 block h-0.5 w-[30px] bg-primary transition-all duration-300  ${navbarOpen ? " top-[-8px] -rotate-45" : " "
                        }`}
                    />
                  </button>
                  <nav
                    id="navbarCollapse"
                    className={`navbar absolute right-0 z-30 w-[250px] rounded border-[.5px] bg-white px-6 py-4 duration-300 lg:visible lg:static lg:w-auto lg:border-none lg:!bg-transparent lg:p-0 lg:opacity-100 ${navbarOpen
                      ? "visibility top-full opacity-100"
                      : "invisible top-[120%] opacity-0"
                      }`}
                  >
                    {/* Mobile User Profile/Auth Section - Only visible on mobile */}
                    <div className="mb-4 pb-4 border-b border-gray-200 lg:hidden">
                      {isLoggedIn ? (
                        <div className="flex items-center gap-3 mb-3">
                          <Avatar className="h-10 w-10 border-2 border-primary/20">
                            <AvatarImage
                              src={userData?.profilePic}
                              alt={userData?.Name || "User"}
                            />
                            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-semibold">
                              {userData?.Name
                                ? userData.Name
                                  .split(" ")
                                  .map((n: string) => n[0])
                                  .join("")
                                  .toUpperCase()
                                  .slice(0, 2)
                                : "U"}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-dark truncate">
                              {userData?.Name || "User"}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                              {userData?.email}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col gap-2">
                          <Link
                            href="/login"
                            onClick={() => setNavbarOpen(false)}
                            className="w-full text-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-opacity-90 transition-colors"
                          >
                            Sign In
                          </Link>
                          
                        </div>
                      )}
                    </div>

                    <ul className="block lg:flex lg:space-x-12">
                      {menuData.map((menuItem, index) => (
                        <li key={index} className="group relative">
                          {menuItem.path ? (
                            <Link
                              href={menuItem.path}
                              className={`flex py-2 text-base lg:mr-0 lg:inline-flex lg:px-0 lg:py-6 ${usePathName === menuItem.path
                                ? "text-primary"
                                : "text-dark hover:text-primary"
                                }`}
                            >
                              {menuItem.title}
                            </Link>
                          ) : (
                            <>
                              <p
                                onClick={() => handleSubmenu(index)}
                                className="flex cursor-pointer items-center justify-between py-2 text-base text-dark group-hover:text-primary lg:mr-0 lg:inline-flex lg:px-0 lg:py-6"
                              >
                                {menuItem.title}
                                <span className="pl-3">
                                  <svg width="25" height="24" viewBox="0 0 25 24">
                                    <path
                                      fillRule="evenodd"
                                      clipRule="evenodd"
                                      d="M6.29289 8.8427C6.68342 8.45217 7.31658 8.45217 7.70711 8.8427L12 13.1356L16.2929 8.8427C16.6834 8.45217 17.3166 8.45217 17.7071 8.8427C18.0976 9.23322 18.0976 9.86639 17.7071 10.2569L12 15.964L6.29289 10.2569C5.90237 9.86639 5.90237 9.23322 6.29289 8.8427Z"
                                      fill="currentColor"
                                    />
                                  </svg>
                                </span>
                              </p>
                              <div
                                className={`submenu relative left-0 top-full rounded-sm bg-white transition-[top] duration-300 group-hover:opacity-100 lg:invisible lg:absolute lg:top-[110%] lg:block lg:w-[250px] lg:p-4 lg:opacity-0 lg:shadow-lg lg:group-hover:visible lg:group-hover:top-full ${openIndex === index ? "block" : "hidden"
                                  }`}
                              >
                                {menuItem.submenu.map((submenuItem, index) => (
                                  <Link
                                    href={submenuItem.path}
                                    key={index}
                                    className="block rounded py-2.5 text-sm text-dark hover:text-primary lg:px-3"
                                  >
                                    {submenuItem.title}
                                  </Link>
                                ))}
                              </div>
                            </>
                          )}
                        </li>
                      ))}
                    </ul>

                    {/* Mobile User Menu - Only visible on mobile when logged in */}
                    {isLoggedIn && (
                      <div className="my-4 pt-4 border-t border-gray-200 lg:hidden">
                        <Link
                          href="/dashboard"
                          onClick={() => setNavbarOpen(false)}
                          className="block py-2 text-sm text-dark hover:text-primary"
                        >
                          Dashboard
                        </Link>
                        <Link
                          href="/registration-fees"
                          onClick={() => setNavbarOpen(false)}
                          className="block py-2 text-sm text-dark hover:text-primary"
                        >
                          Registration Fees
                        </Link>
                        <Link
                          href="/submission"
                          onClick={() => setNavbarOpen(false)}
                          className="block py-2 text-sm text-dark hover:text-primary"
                        >
                          Submit Paper
                        </Link>
                        <button
                          onClick={() => {
                            setNavbarOpen(false);
                            logout();
                          }}
                          className="block w-full text-left py-2 text-sm text-red-600 hover:text-red-700"
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </nav>
                </div>
                <div className="md:flex items-center justify-end pr-16 lg:pr-0 hidden">
                  {isLoggedIn ? (
                    <div className="relative">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="flex items-center gap-3 rounded-full px-2 py-1 hover:bg-slate-100 transition-colors">
                            <Avatar className="h-9 w-9 border-2 border-primary/20">
                              <AvatarImage
                                src={userData?.profilePic}
                                alt={userData?.Name || "User"}
                              />
                              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-semibold">
                                {userData?.Name
                                  ? userData.Name
                                    .split(" ")
                                    .map((n: string) => n[0])
                                    .join("")
                                    .toUpperCase()
                                    .slice(0, 2)
                                  : "U"}
                              </AvatarFallback>
                            </Avatar>
                            <span className="hidden truncate text-sm font-medium md:block">
                              {userData?.Name
                                ? userData.Name.trim().split(/\s+/).slice(0, 2).join(" ")
                                : "User"}
                            </span>
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                          <DropdownMenuLabel className="py-2">
                            <div className="flex flex-col space-y-1">
                              <span className="text-sm font-medium">{userData?.Name || "User"}</span>
                              <span className="text-xs text-muted-foreground truncate">
                                {userData?.email || "user@example.com"}
                              </span>
                            </div>
                          </DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem asChild>
                            <Link href="/dashboard" className="cursor-pointer">
                              Dashboard
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href="/registration-fees" className="cursor-pointer">
                              Registration Fees
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href="/submission" className="cursor-pointer">
                              Submit Paper
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={logout}
                            className="cursor-pointer text-red-600 focus:text-red-600"
                          >
                            Logout
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  ) : (
                    <Link
                      href="/login"
                      className="ease-in-up hidden rounded-xl border border-[#cbd5e1] bg-primary px-5 py-2 shadow-xl backdrop-blur-sm text-base font-medium text-white transform transition duration-500 hover:scale-105 hover:bg-opacity-90 hover:shadow-btn-hover md:block "
                    >
                      Sign In
                    </Link>
                    
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>
        <ScrollProgress
          className={`${sticky ? "fixed top-[63px] md:top-[70px]" : "absolute top-[54px] md:top-[94px]"} z-[9998] w-full`}
        />
      </ClickOutside>
    </>
  );
};

export default Header;
