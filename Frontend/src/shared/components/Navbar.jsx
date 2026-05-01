import React, { useState } from "react";
import { Link, NavLink } from "react-router";
import { FiMenu, FiX, FiSun, FiMoon } from "react-icons/fi";
import { SiOpslevel } from "react-icons/si";
import { useTheme } from "../../features/Theme/hooks/useTheme";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Incidents", path: "/incidents" },
    { name: "Status", path: "/status" },
    { name: "Docs", path: "/docs" },
    { name: "About Us", path: "/about" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-bg/80 backdrop-blur-md p-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="p-2 rounded-lg transition-colors">
                <SiOpslevel className="text-text text-2xl" />
              </div>
              <span className="font-bold text-2xl tracking-tight text-text">
                MayDayOps
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-6 sm:text-lg">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={
                    ({ isActive }) =>
                      isActive
                        ? "text-text -translate-y-1" // Active styles
                        : "text-text-muted" // Inactive styles
                  }>
                  {link.name}
                </NavLink>
              ))}
            </div>
            <button
              onClick={toggleTheme}
              className="p-2 text-text-muted hover:text-text transition-all outline-none flex items-center justify-center bg-bg cursor-pointer"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? <FiSun size={20} className="text-ring" /> : <FiMoon size={20} className="text-text" />}
            </button>
            <Link
              to="/dashboard"
              className="bg-primary text-primary-foreground px-5 py-2 rounded-full font-semibold sm:text-lg hover:bg-primary/90 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5">
              Dashboard
            </Link>
          </div>

          {/* Mobile menu button & Theme Toggler */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-text-muted hover:text-text hover:bg-bg-surface transition-all focus:outline-none border border-border flex items-center justify-center bg-bg"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? <FiSun size={20} className="text-ring" /> : <FiMoon size={20} className="text-text" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-text-muted hover:text-text focus:outline-none p-2">
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute w-full bg-bg border-b border-border transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}>
        <div className="px-4 pt-2 pb-6 space-y-2 shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-text-muted hover:text-primary hover:bg-bg-muted transition-colors">
              {link.name}
            </Link>
          ))}
          <div className="pt-2">
            <Link
              to="/dashboard"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center bg-primary text-primary-foreground px-4 py-2 rounded-full font-semibold hover:bg-primary/90 transition-colors">
              Dashboard
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
