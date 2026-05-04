import { useState, useEffect, useRef, useMemo } from "react";
import { Link, NavLink } from "react-router";
import { FiMenu, FiX, FiSun, FiMoon } from "react-icons/fi";
import { SiOpslevel } from "react-icons/si";
import { useTheme } from "../../features/Theme/hooks/useTheme";
import { useSelector } from "react-redux";
import { useAuth } from "../../features/Authentication/hook/useAuth";
import {
  defaultWorkspaceHome,
  canManageWorkspace,
} from "../../lib/workspacePaths";

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

  const incidentsPath = useMemo(() => {
    if (!user) return "/login";
    return canManageWorkspace(user.role) ? "/admin/incidents" : "/incidents";
  }, [user]);

  const navLinks = useMemo(
    () => [
      { name: "Home", path: "/" },
      { name: "Incidents", path: incidentsPath },
      { name: "Docs", path: "/docs" },
      { name: "About Us", path: "/about" },
      { name: "Contact Us", path: "/contact" },
    ],
    [incidentsPath],
  );

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
                    isActive
                      ? "text-primary -translate-y-0.5"
                      : "text-text-muted"
                  }>
                  {link.name}
                </NavLink>
              ))}
            </div>

            {user && (
              <Link
                to={defaultWorkspaceHome(user.role)}
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
          </div>

          {/* Mobile menu button & Theme Toggler */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-text-muted hover:text-text hover:bg-bg-surface transition-all focus:outline-none border border-border flex items-center justify-center bg-bg"
              aria-label="Toggle Theme">
              {theme === "dark" ? (
                <FiSun size={20} className="text-ring" />
              ) : (
                <FiMoon size={20} className="text-text" />
              )}
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
          isOpen
            ? "max-h-[80vh] opacity-100 overflow-y-auto"
            : "max-h-0 opacity-0 overflow-hidden"
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
          {user && (
            <div className="pt-2 pb-2">
              <Link
                to={defaultWorkspaceHome(user.role)}
                onClick={() => setIsOpen(false)}
                className="block w-full text-center bg-primary text-primary-foreground px-4 py-2 rounded-full font-semibold hover:bg-primary/90 transition-colors">
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
                className="block px-3 py-2 rounded-md text-base font-medium text-text-muted hover:text-primary hover:bg-bg-muted transition-colors">
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
