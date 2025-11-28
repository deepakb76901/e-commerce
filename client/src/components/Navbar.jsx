import React, { Children, useState } from "react";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  ShoppingCartIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { selectItems } from "../Redux/slices/CartSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser } from "../Redux/slices/authSlice";
import { TextInput } from "flowbite-react";
import { Search } from "lucide-react";

const navigation = [
  { name: "Products", link: "/", isAdmin: false },
  { name: "Admin's List", link: "/admin", isAdmin: true },
  { name: "Orders", link: "/admin/orders", isAdmin: true },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Navbar({ children }) {
  const items = useSelector(selectItems);
  const user = useSelector(selectLoggedInUser);
  const { theme } = useSelector((state) => state.theme);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();

  return (
    <Disclosure as="nav" className="bg-gray-200 sticky top-0 z-30">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-14 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 ml-6 items-center  sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Link to="/">
                    <img
                      className="h-8 ml-2 w-auto sm:h-10 rounded-full"
                      src="https://logos-world.net/wp-content/uploads/2020/11/Flipkart-Emblem.png"
                      alt="Your Company"
                    />
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-2">
                    {navigation.map(
                      (item) =>
                        item.isAdmin === user.isAdmin && (
                          <Link
                            key={item.name}
                            to={item.link}
                            className={classNames(
                              item.current
                                ? "bg-gray-900 text-white"
                                : "text-gray-700  hover:text-gray-900",
                              "rounded-md px-2 py-2 text-base font-semibold"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            {item.name}
                          </Link>
                        )
                    )}
                  </div>
                </div>

                <input
                  type="text"
                  id="search"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                  }}
                  className="ml-5 pl-2 w-96 h-8 my-auto rounded-md text-sm hidden md:block"
                  placeholder="Search for Products,Brands and More"
                  color="blue"
                />
                {showSearch && (
                  <input
                    type="text"
                    id="search"
                    className="w-28 mt-1 text-sm h-8 rounded-md"
                    placeholder="Search here"
                    color="blue"
                  />
                )}
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* <button className="mx-2" onClick={() => {dispatch(toggleTheme())}}>
                    {theme === "light" ? (
                      <IoMoonOutline className="text-gray-400 h-6 w-auto cursor-pointer hover:text-white" />
                    ) : (
                      <IoSunnyOutline className="text-gray-200 h-6 w-auto cursor-pointer" />
                    )}
                  </button> */}

                {/* <button
                  onClick={() =>
                    setShowSearch((prev) => (prev === true ? false : true))
                    }
                    >
                    {showSearch === true ? (
                    <XMarkIcon className="text-xl md:hidden h-7 w-7 text-gray-600" />
                  ) : (
                    <Search className="md:hidden text-xl text-center h-5 w-5 text-gray-600 font-medium mx-1" />
                    )}
                    </button> */}

                <Link
                  to="/about"
                  className="pr-3 font-medium text-gray-700 hover:text-gray-900 "
                >
                  About Us
                </Link>

                {/* Shopping Cart Icon */}
                <Link to="/cart">
                  <button
                    type="button"
                    className="relative rounded-full  p-1 text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span className="sr-only">View notifications</span>
                    <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </Link>
                {items.length > 0 && (
                  <span className="inline-flex items-center rounded-md  mb-5   bg-gray-50 px-2 py-1 text-xs font-medium text-gray-700 ring-1 ring-inset ring-gray-500">
                    {items.length}
                  </span>
                )}

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full object-cover"
                        src={user.profilePicture}
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
                            to="/profile"
                            className={classNames(
                              active ? "bg-gray-200" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            My Profile
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/orders"
                            className={classNames(
                              active ? "bg-gray-200" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            My Orders
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/logout"
                            className={classNames(
                              active ? "bg-gray-200" : "",
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
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map(
                (item) =>
                  item.isAdmin === user.isAdmin && (
                    <Link
                      key={item.name}
                      to={item.link}
                      className={classNames(
                        item.current
                          ? "bg-gray-900 text-white"
                          : "text-gray-700 hover:bg-white hover:text-gray-900",
                        "block rounded-md px-3 py-2 text-base font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </Link>
                  )
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

export default Navbar;
