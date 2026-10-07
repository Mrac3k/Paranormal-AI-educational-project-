import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "ПРОТОКОЛ", href: "#problem" },
  { label: "УСТРОЙСТВО", href: "#solution" },
  { label: "БЕСТИАРИЙ", href: "/bestiary", external: true },
  { label: "КАРТА", href: "#map" },
  { label: "ДОСТУП", href: "#pricing" },
  { label: "ЛОГИ", href: "#logs" },
];

interface HeaderProps {
  onConnect?: () => void;
}

export function Header({ onConnect }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isLanding = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAnchor = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      if (!isLanding) {
        window.location.href = "/" + href;
        return;
      }
      const target = document.querySelector(href);
      target?.scrollIntoView({ behavior: "smooth" });
      setMobileOpen(false);
    }
  };

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-[100] transition-all duration-300 ${
        scrolled ? "border-b border-red-900/30 bg-black/90 backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="font-serif text-xl font-black tracking-widest text-white">
          PARANORMAL <span className="text-red-500">AI</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) =>
            link.external ? (
              <Link
                key={link.href}
                to={link.href}
                className="font-mono text-xs tracking-widest text-neutral-400 transition-colors hover:text-red-500"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleAnchor(e, link.href)}
                className="font-mono text-xs tracking-widest text-neutral-400 transition-colors hover:text-red-500"
              >
                {link.label}
              </a>
            )
          )}
          <button onClick={onConnect} className="btn-red px-4 py-2 text-xs">
            ПОДКЛЮЧИТЬСЯ
          </button>
        </nav>

        <button
          className="md:hidden text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-b border-red-900/30 bg-black/95 px-4 py-6 md:hidden">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) =>
              link.external ? (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-mono text-sm tracking-widest text-neutral-300 hover:text-red-500"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleAnchor(e, link.href)}
                  className="font-mono text-sm tracking-widest text-neutral-300 hover:text-red-500"
                >
                  {link.label}
                </a>
              )
            )}
            <button
              onClick={() => {
                setMobileOpen(false);
                onConnect?.();
              }}
              className="btn-red mt-2 py-3 text-center text-sm"
            >
              ПОДКЛЮЧИТЬСЯ К СЕТИ
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
