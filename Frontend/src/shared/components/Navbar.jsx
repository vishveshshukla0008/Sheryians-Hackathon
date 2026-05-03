import { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router";
import { FiMenu, FiX, FiSun, FiMoon } from "react-icons/fi";
import { SiOpslevel } from "react-icons/si";
import { useTheme } from "../../features/Theme/hooks/useTheme";
import { useSelector } from "react-redux";
import { useAuth } from "../../features/Authentication/hook/useAuth";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { theme, toggleTheme } = useTheme();
  const { logoutHandler } = useAuth();

  const authLoading = useSelector((state) => state.auth.authLoading);
  const user = useSelector((state) => state.auth.user);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // The custom SVG you provided, wrapped in a component for clean rendering
  const ContactIcon = () => (
    <svg
      id="Layer_1"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 122.88 84.04"
      className="w-6 h-6 fill-current" // Tailwind classes to control size and color
    >
      <title>call-message</title>
      <path d="M34.11,3h83a5.8,5.8,0,0,1,5.79,5.79V70.27a5.76,5.76,0,0,1-1,3.25,2.32,2.32,0,0,1-.55.82,2.2,2.2,0,0,1-.54.38,5.78,5.78,0,0,1-3.7,1.35H68a15.44,15.44,0,0,0,.42-4.45h47.22L84.8,39.23,74.62,47.91h0a2.22,2.22,0,0,1-2.84,0L61.1,39.23h0l-9.69,9.71A12.4,12.4,0,0,0,47,47.07L57.64,36.41,37.91,20.32a14,14,0,0,0-.68-3.42l-.79-3.49L73.15,43.34,115.26,7.46H35.11L34.11,3ZM17.46,31a61.46,61.46,0,0,0,4.73,14.91A51.89,51.89,0,0,0,32.61,60.48a1.47,1.47,0,0,0,1.17.45,5.31,5.31,0,0,0,2-.67,17.91,17.91,0,0,0,2.1-1.36c3.14-2.18,7-4.89,10.29-1.85.08.07.12.14.2.2L58.84,68.78a1.13,1.13,0,0,1,.1.13,6.09,6.09,0,0,1,.79,5.77,14.31,14.31,0,0,1-3.94,5.76,13.76,13.76,0,0,1-7.94,3.46,29.8,29.8,0,0,1-8.28-.4,27.16,27.16,0,0,1-11.31-4.73,54.16,54.16,0,0,1-9.86-9.43l-.24-.29c-1.52-1.8-3.16-3.73-4.69-5.88A78.72,78.72,0,0,1,1,34.34C-.72,25.59-.37,16.85,3.33,9.62c2-4,5.06-7.2,9-8.69,3.44-1.32,7.51-1.34,12.13.63a1.67,1.67,0,0,1,1,1.24l3.73,16.58a4.57,4.57,0,0,1-.82,4.88,9.43,9.43,0,0,1-4.29,2.5c-.56.24-1.21.45-1.9.67-2.27.74-4.86,1.61-4.73,3.65v0Zm70.72,5.33,30.26,31.73V10.58L88.18,36.36Z" />
    </svg>
  );

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Incidents", path: "/admin/incidents" },
    { name: "Status", path: "/status" },
    { name: "Docs", path: "/docs" },
    { name: "About Us", path: "/about" },
    {
      name: "Contact Us",
      path: "/contact",
      icon: <ContactIcon />
    },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-bg/80 backdrop-blur-md p-1 border-b border-border">
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
            <div className="flex space-x-6 sm:text-lg items-center">
              <button
                onClick={toggleTheme}
                className="p-2 text-text transition-all outline-none flex items-center justify-center  cursor-pointer"
                aria-label="Toggle Theme">
                {theme === "dark" ? <FiSun size={20} /> : <FiMoon size={20} />}
              </button>
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `flex items-center transition-all ${isActive ? "text-text -translate-y-1" : "text-text-muted hover:text-text"
                    }`
                  }
                >
                  {/* Logic: Show icon if it exists, otherwise show name */}
                  {link.icon ? link.icon : link.name}
                </NavLink>
              ))}
            </div>

            {user && (
              <Link
                to="/dashboard"
                className="bg-primary text-primary-foreground px-5 py-2 rounded-full font-semibold sm:text-lg hover:bg-primary/90 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5">
                Dashboard
              </Link>
            )}
            {authLoading ? (
              <div className="h-10 w-10 rounded-full bg-bg-surface animate-pulse"></div>
            ) : user ? (
              <div
                ref={dropdownRef}
                className="relative group cursor-pointer flex items-center h-full py-2">
                <div
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="bg-bg-surface h-10 w-10 flex items-center justify-center rounded-full text-primary font-bold text-xl uppercase border border-border shadow-sm hover:bg-bg-muted transition-colors">
                  {user?.name?.charAt(0)}
                </div>

                {/* Dropdown Menu (Hover and Click Triggered) */}
                <div
                  className={`absolute right-0 top-full w-48 pt-2 transition-all duration-200 z-50 transform origin-top-right ${
                    isDropdownOpen
                      ? "opacity-100 visible translate-y-0"
                      : "opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0"
                  }`}>
                  <div className="bg-bg border border-border rounded-xl shadow-lg overflow-hidden flex flex-col py-2">
                    <Link
                      to="/profile"
                      onClick={() => setIsDropdownOpen(false)}
                      className="px-4 py-2 text-text hover:bg-bg-surface hover:text-primary transition-colors">
                      Profile
                    </Link>
                    <Link
                      to="/dummy"
                      onClick={() => setIsDropdownOpen(false)}
                      className="px-4 py-2 text-text hover:bg-bg-surface hover:text-primary transition-colors">
                      Dummy
                    </Link>
                    <button
                      onClick={() => {
                        setIsDropdownOpen(false);
                        logoutHandler();
                      }}
                      className="text-left px-4 py-2 text-error hover:bg-error/10 transition-colors">
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
               <NavLink
                  to={"/login"}
                  className={({ isActive }) =>
                    isActive ? "text-primary" : "text-text-muted text-lg"
                  }>
                Sign In
              </NavLink>
            )}
            {/* <button
              onClick={toggleTheme}
              className="p-2 text-text-muted hover:text-text transition-all outline-none flex items-center justify-center bg-bg cursor-pointer rounded-full"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? <FiSun size={20} className="text-ring" /> : <FiMoon size={20} className="text-text" />}
            </button> */}
            <Link
              to="/dashboard"
              className="bg-primary text-primary-foreground px-5 py-2 rounded-full font-semibold sm:text-lg hover:bg-primary/90 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              Dashboard
            </Link>
          </div>

          {/* Mobile UI Controls */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-text-muted hover:text-text border border-border flex items-center justify-center bg-bg"
              aria-label="Toggle Theme">
              {theme === "dark" ? (
                <FiSun size={20} className="text-ring" />
              ) : (
                <FiMoon size={20} className="text-text" />
              )}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-text-muted hover:text-text focus:outline-none p-2"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Content */}
      <div
        className={`md:hidden absolute w-full bg-bg border-b border-border transition-all duration-300 ease-in-out ${isOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
          }`}
      >
        <div className="px-4 pt-2 pb-6 space-y-2 shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="flex items-center px-3 py-2 rounded-md text-base font-medium text-text-muted hover:text-primary hover:bg-bg-muted transition-colors"
            >
              {link.icon ? link.icon : link.name}
            </Link>
          ))}
          {user && (
            <div className="pt-2 pb-2">
              <Link
                to="/dashboard"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center bg-primary text-primary-foreground px-4 py-2 rounded-full font-semibold"
            >
                Dashboard
              </Link>
            </div>
          )}

          {/* Mobile User Links */}
          <div className="pt-4 border-t border-border space-y-2">
            {authLoading ? (
              <div className="h-10 w-full rounded-md bg-bg-surface animate-pulse"></div>
            ) : user ? (
              <>
                <div className="flex items-center gap-3 px-3 py-2 mb-2">
                  <div className="bg-bg-surface shrink-0 h-10 w-10 flex items-center justify-center rounded-full text-primary font-bold text-xl uppercase border border-border shadow-sm">
                    {user?.name?.charAt(0)}
                  </div>
                  <div className="flex flex-col overflow-hidden">
                    <span className="font-medium text-text truncate">
                      {user?.name}
                    </span>
                    <span className="text-sm text-text-muted truncate">
                      {user?.email}
                    </span>
                  </div>
                </div>
                <Link
                  to="/profile"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-text-muted hover:text-primary hover:bg-bg-muted transition-colors">
                  Profile
                </Link>
                <Link
                  to="/dummy"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-text-muted hover:text-primary hover:bg-bg-muted transition-colors">
                  Dummy
                </Link>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    logoutHandler();
                  }}
                  className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-error hover:bg-error/10 transition-colors">
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center bg-bg-surface text-primary border border-primary/30 px-4 py-2 rounded-full font-semibold hover:bg-primary/10 transition-colors mt-2">
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;