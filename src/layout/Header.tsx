// src/components/Header.tsx

import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

const navLinks = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Apply Now",
    href: "/apply-now",
  },
  {
    title: "Notices",
    href: "/notices",
  },
  {
    title: "Help Desk",
    href: "/help-desk",
  },
];

export default function Header() {
  const location = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Prevent body scroll when sidebar open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileMenuOpen]);

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }

    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* HEADER */}
      <header
        className={`
          fixed
          top-0
          left-0
          right-0
          z-50
          transition-all
          duration-300
          backdrop-blur-xl
          ${
            scrolled
              ? "bg-white/95 shadow-lg border-b border-slate-200"
              : "bg-white shadow-md border-b border-slate-100"
          }
        `}
      >
        <div
          className="
            mx-auto
            flex
            h-[72px]
            w-full
            max-w-[1400px]
            items-center
            justify-between
            px-4
            sm:px-6
            lg:px-10
          "
        >
          {/* LOGO */}
          <Link to="/" className="group">
            <div className="flex flex-col">
              <h1
                className="
                  text-[20px]
                  sm:text-[24px]
                  md:text-[28px]
                  font-black
                  tracking-tight
                  bg-gradient-to-r
                  from-primary
                  to-primary-dark
                  bg-clip-text
                  text-transparent
                  transition-all
                  duration-300
                  group-hover:from-primary-dark
                  group-hover:to-primary
                "
              >
                JTGLCCE 2026
              </h1>

              <div className="flex items-center gap-2 mt-0.5">
                <div className="h-[2px] w-6 bg-primary rounded-full"></div>

                <p
                  className="
                    text-[7px]
                    sm:text-[8px]
                    font-semibold
                    uppercase
                    tracking-[0.25em]
                    text-slate-500
                  "
                >
                  Examination Portal
                </p>

                <div className="h-[2px] w-6 bg-primary rounded-full"></div>
              </div>
            </div>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden lg:flex items-center gap-2">
            {navLinks.map((item) => (
              <Link
                key={item.title}
                to={item.href}
                className={`
                  relative
                  px-6
                  py-2.5
                  rounded-xl
                  text-[13px]
                  font-semibold
                  tracking-wide
                  transition-all
                  duration-300
                  ${
                    isActive(item.href)
                      ? "text-primary bg-primary/10 shadow-sm"
                      : "text-slate-600 hover:text-primary hover:bg-slate-50"
                  }
                `}
              >
                {item.title}

                {isActive(item.href) && (
                  <span
                    className="
                      absolute
                      bottom-0
                      left-1/2
                      -translate-x-1/2
                      w-8
                      h-[2px]
                      rounded-full
                      bg-primary
                    "
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* RIGHT SECTION */}
          <div className="flex items-center gap-3">
            {/* DESKTOP BUTTONS */}
            <div className="hidden sm:flex items-center gap-3">
              <Link to="/candidate-login">
                <button
                  className="
                    px-6
                    py-2.5
                    text-[12px]
                    font-bold
                    uppercase
                    tracking-wider
                    rounded-full
                    border-2
                    border-primary
                    text-primary
                    transition-all
                    duration-300
                    hover:bg-primary
                    hover:text-white
                    hover:shadow-lg
                  "
                >
                  Sign In
                </button>
              </Link>

              <Link to="/apply-now">
                <button
                  className="
                    px-6
                    py-2.5
                    text-[12px]
                    font-bold
                    uppercase
                    tracking-wider
                    rounded-full
                    text-white
                    bg-gradient-to-r
                    from-primary
                    to-primary-dark
                    transition-all
                    duration-300
                    hover:shadow-xl
                  "
                >
                  Register
                </button>
              </Link>
            </div>

            {/* MOBILE MENU ICON RIGHT SIDE */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="
                lg:hidden
                flex
                items-center
                justify-center
                w-11
                h-11
                rounded-xl
                border
                border-slate-200
                bg-white
                text-slate-700
                shadow-sm
                transition-all
                duration-300
                hover:bg-slate-100
                hover:text-primary
              "
              aria-label="Open Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE SIDEBAR */}
      <>
        {/* OVERLAY */}
        <div
          onClick={() => setMobileMenuOpen(false)}
          className={`
            fixed
            inset-0
            z-40
            bg-black/40
            backdrop-blur-sm
            transition-all
            duration-300
            lg:hidden
            ${
              mobileMenuOpen
                ? "opacity-100 visible"
                : "opacity-0 invisible"
            }
          `}
        />

        {/* SIDEBAR */}
        <div
          className={`
            fixed
            top-0
            right-0
            z-50
            h-screen
            w-[220px]
            bg-white
            shadow-2xl
            transition-all
            duration-300
            lg:hidden
            flex
            flex-col
            ${
              mobileMenuOpen
                ? "translate-x-0"
                : "translate-x-full"
            }
          `}
        >
          {/* SIDEBAR HEADER */}
          <div
            className="
              flex
              items-center
              justify-between
              px-5
              h-[72px]
              border-b
              border-slate-200
            "
          >
            <div>
              <h2 className="text-lg font-black text-primary">
                JTGLCCE
              </h2>

              <p className="text-[10px] uppercase tracking-widest text-slate-500">
                Portal Menu
              </p>
            </div>

            <button
              onClick={() => setMobileMenuOpen(false)}
              className="
                flex
                items-center
                justify-center
                w-10
                h-10
                rounded-xl
                text-slate-600
                hover:bg-slate-100
                hover:text-primary
                transition-all
                duration-300
              "
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* NAVIGATION */}
          <div className="flex-1 overflow-y-auto px-4 py-5">
            <div className="flex flex-col gap-2">
              {navLinks.map((item) => (
                <Link
                  key={item.title}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`
                    px-5
                    py-3.5
                    rounded-2xl
                    text-[15px]
                    font-semibold
                    transition-all
                    duration-300
                    ${
                      isActive(item.href)
                        ? "bg-gradient-to-r from-primary to-primary-dark text-white shadow-lg"
                        : "text-slate-700 hover:bg-slate-100"
                    }
                  `}
                >
                  {item.title}
                </Link>
              ))}
            </div>

            {/* DIVIDER */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>

              <div className="relative flex justify-center text-xs">
                <span className="bg-white px-3 text-slate-400">
                  Account
                </span>
              </div>
            </div>

            {/* MOBILE BUTTONS */}
            <div className="flex flex-col gap-3">
              <Link
                to="/candidate-login"
                onClick={() => setMobileMenuOpen(false)}
              >
                <button
                  className="
                    w-full
                    px-5
                    py-3
                    rounded-2xl
                    border-2
                    border-primary
                    text-primary
                    font-semibold
                    transition-all
                    duration-300
                    hover:bg-primary
                    hover:text-white
                  "
                >
                  Sign In
                </button>
              </Link>

              <Link
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
              >
                <button
                  className="
                    w-full
                    px-5
                    py-3
                    rounded-2xl
                    bg-gradient-to-r
                    from-primary
                    to-primary-dark
                    text-white
                    font-semibold
                    transition-all
                    duration-300
                    hover:shadow-xl
                  "
                >
                  Register
                </button>
              </Link>
            </div>
          </div>
        </div>
      </>

      {/* HEADER SPACER */}
      <div className="h-[72px]"></div>
    </>
  );
}