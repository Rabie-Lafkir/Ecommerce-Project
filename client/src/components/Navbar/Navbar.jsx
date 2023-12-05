import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { CiSearch, CiShoppingCart } from "react-icons/ci";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { LiaUser } from "react-icons/lia";
import { useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../Searchbar/Searchbar";
import Cart from "../Cart/Cart";
import logo from "../../assets/Logo.png";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useLogOut } from "../../hooks/useLogOut";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  
  const { customer } = useContext(AuthContext);
  const isLoggedIn = !!customer;
  const logout = useLogOut()
  //const [isLoggedIn, setLoggedIn] = useState(true);
  const [isClicked, setIsClicked] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [navigation, setNavigation] = useState([
    { name: "HOME", href: "/", current: false },
    { name: "SHOP", href: "/shop", current: false },
    { name: "CONTACT", href: "/contact", current: false },
  ]);

  // Function to handle navigation item click and toggle its current state
  const toggleCurrent = (href) => {
    const updatedNavigation = navigation.map((item) => ({
      ...item,
      current: item.href === href,
    }));
    setNavigation(updatedNavigation);
    setIsClicked(false); // Reset isClicked on navigation click
  };

  // Function to handle login link click and toggle isClicked state
  const toggleLogin = () => {
    setIsClicked(!isClicked);
    if (!isClicked) {
      setNavigation(
        navigation.map((item) => ({ ...item, current: false }))
      );
    }
  };
  const toggleCart = () => {
    setIsCartOpen(true);
    console.log("Cart");
  };

  const toggleSearch = () => {
    setSearchOpen(true);
    console.log("Search");
  };

const handleLogOut =async()=>{
  await logout()
}

  return (
    <Disclosure as="nav" className="bg-white shadow-sm w-full">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 lg:py-3 my-0 w-full ">
            <div className="relative flex h-16 items-center sm:flex-column">
              <div className="absolute inset-y-0 left-0 flex items-center lg:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button
                  style={{ width: "94%" }}
                  className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                >
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="blok h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex justify-center gap-10 ">
                  <div className="flex items-center mr-10">
                    <img
                      className="h-2 pl-10 sm:h-4 w-auto self-center "
                      src={logo}
                      alt="Intellihome"
                    />
                  </div>
                  <div className="hidden lg:flex justify-between item-center gap-10 ">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => toggleCurrent(item.href)}
                        className={classNames(
                          item.current
                            ? "text-secondary"
                            : "text-primary hover:underline hover:text-secondary",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="icons flex items-center justify-center absolute right-0 space-x-1 ">
                  <div className="search">
                    <button
                      type="button"
                      className="flex items-center justify-center gap-1 rounded-full p-1 text-primary hover:text-secondary text-sm md:text-lg"
                      onClick={toggleSearch} // Call the toggle function on click
                    >
                      <CiSearch />
                      <span className="hidden sm:block text-sm font-thin">
                        SEARCH
                      </span>
                    </button>
                  </div>
                  {!isLoggedIn ? (
            <Link
              type="button"
              to="/login"
              onClick={toggleLogin} 
              className={classNames(
                "text-primary hover:text-secondary",
                "rounded-full p-1 flex items-center justify-center gap-1 text-sm md:text-lg",
                {
                  "text-secondary": !isClicked && navigation.every(
                    (item) => !item.current
                  ),
                }
              )}
            >
              <LiaUser />
              <span className="hidden sm:block text-sm font-thin">SIGN IN</span>
            </Link>
          ) : (
            <></>
          )}
                  <div className="">
                    <div className="lg:flex gap-1 justify-between">
                      <button
                        type="button"
                        onClick={toggleCart}
                        className="flex items-center justify-center relative rounded-full p-1 text-primary hover:text-secondary flex text-md md:text-2xl"
                      >
                        <LiaShoppingBagSolid />
                        <span className="text-sm">(0)</span>
                      </button>
                    </div>
                  </div>
                  {isLoggedIn === true ? (
                    <Menu as="div" className="lg:relative ml-3">
                      <div>
                        <Menu.Button className="relative flex rounded-full bg-secondary text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-secondary">
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="h-8 w-8 rounded-full"
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt=""
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="#"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Your Profile
                              </Link>
                            )}
                          </Menu.Item>

                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to='/'
                                onClick={handleLogOut}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Sign out
                              </Link>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
          <Disclosure.Panel className="lg:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2 flex flex-col items-center">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  as="a"
                  to={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-primary hover:bg-gray-700 hover:text-secondary",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </Disclosure.Panel>
          {isSearchOpen && (
            <SearchBar isOpen={isSearchOpen} setIsOpen={setSearchOpen} />
          )}
          {isCartOpen && <Cart isOpen={isCartOpen} setIsOpen={setIsCartOpen} />}
        </>
      )}
    </Disclosure>
  );
}
