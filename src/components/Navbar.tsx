import { Menu, X } from "lucide-react";
import { useState } from "react";
import logo from "../assets/feather.svg";

interface NavItem {
  label: string;
  href: string;
}

const Navbar: React.FC = () => {
  const navItems: NavItem[] = [
    { label: "Features", href: "#" },
    { label: "Workflow", href: "#" },
    { label: "Pricing", href: "#" },
    { label: "About Us", href: "#" },
  ];

  const [mobileDrawerOpen, setMobileDrawerOpen] = useState<boolean>(false);

  const toggleNavbar = () => {
    setMobileDrawerOpen((prev) => !prev);
  };

  return (
    <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80">
      <div className="container px-4 mx-auto relative lg:text-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center flex-shrink-0">
            <img className="h-10 w-10 mr-2" src={logo} alt="logo" />
            <h3 className="font-bold text-xl tracking-wide text-gray-700">
              USERS DATA
            </h3>
          </div>
          <ul className="hidden lg:flex ml-14 space-x-12">
            {navItems.map((item, index) => (
              <li key={index}>
                <a href={item.href} className="hover:text-teal-400">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="hidden lg:flex justify-center gap-2 items-center">
            <a
              href="#"
              className="py-2 px-3 border shadow-md hover:shadow-lg rounded-md hover:text-teal-400"
            >
              Log In
            </a>
            <a
              href="#"
              className="py-2 px-3 border shadow-md hover:shadow-lg rounded-md hover:text-teal-400"
            >
              Sign In
            </a>
          </div>
          <div className="lg:hidden md:flex flex-col justify-end">
            <button onClick={toggleNavbar}>
              {mobileDrawerOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {mobileDrawerOpen && (
          <div className="fixed right-0 z-20 bg-neutral-50 w-full p-12 flex flex-col justify-center items-center lg:hidden">
            <ul>
              {navItems.map((item, index) => (
                <li key={index} className="py-4">
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
            <div className="flex space-x-6">
              <a href="#" className="py-2 px-3 border rounded-md">
                Log In
              </a>
              <a href="#" className="py-2 px-3 border rounded-md">
                Sign In
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
