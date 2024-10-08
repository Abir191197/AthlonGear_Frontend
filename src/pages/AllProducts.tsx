import React, {  useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { ChevronDownIcon, EyeIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useGetAllProductsWithSearchQuery } from "../redux/api/baseApi";
import "./Products.css";
import { Link, ScrollRestoration, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { addItem, CartItem } from "../redux/features/cartSlice";
import { toast } from "react-toastify";
import { SyncLoader } from "react-spinners";
import Navbar from "./Navbar";
import { Menu, Transition } from "@headlessui/react";


  const sortOptions = [
    { name: "Price: Low to High", value: "price" },
    { name: "Price: High to Low", value: "-price" },
    { name: "Newest First", value: "-createdAt" },
    { name: "Oldest First", value: "createdAt" },
  ];

export interface Product {
  _id: string;
  title: string;
  description: string;
  imageLink: string;
  category: string;
  brand: string;
  stock: number;
  rating: number;
  price: number;
  quantity: number;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function AllProducts() {
  const [searchQuery, setSearchQuery] = useState(""); //search
  const [sortOption, setSortOption] = useState(""); //sort
  // Handle sort option selection
  const handleSortSelection = (value: React.SetStateAction<string>) => {
    setSortOption(value); // Update the state with the selected sort option
  };

  // Fetch data using the hook
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const category = queryParams.get("category") || "";

  const { data, isLoading } = useGetAllProductsWithSearchQuery({
    searchTerm: searchQuery,
    category: category,
    sort: sortOption, // Pass the selected sort option here
  });
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.carts);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          height: "100vh",
        }}>
        <SyncLoader
          size={15}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }

  const handleAddItem = (item: CartItem) => {
    const existingItem = cartItems.find(
      (cartItem: { _id: string }) => cartItem._id === item._id
    );

    if (existingItem && existingItem.quantity >= existingItem.stock) {
      toast.error(`Cannot add more of ${item.title}. Stock limit reached.`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    } else {
      dispatch(addItem(item));
      toast.success(`${item.title} added to cart!`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    }
  };

  // Pagination logic
  const totalItems = data?.data?.length || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const currentItems = data?.data?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Navbar />
      <ScrollRestoration />
      <div className="flex justify-center mx-[600px] px-12 text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-black to-red-500 mb-4 mt-24">
        <h2 className="font-semibold text-4xl">Features</h2>
        <h2 className="font-semibold text-4xl ml-2">Items</h2>
      </div>

      <div className="bg-white">
        <div className="mx-auto overflow-hidden sm:px-6 lg:px-8">
          <h2 className="sr-only">Products</h2>
          <div className="mt-4 sm:mt-2 mb-7 flex justify-between items-center">
            {/* Search Field */}
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="p-2 border border-gray-300 rounded-md"
            />

           
            {/* Sort Dropdown */}
            <div>
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-xl font-semibold text-gray-900 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={React.Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95">
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.value}>
                          {({ active }) => (
                            <a
                              href="#"
                              onClick={() => handleSortSelection(option.value)}
                              className={classNames(
                                option.value === sortOption
                                  ? "font-medium text-gray-900"
                                  : "text-gray-500",
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm"
                              )}>
                              {option.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>

          <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 bg-white">
            {currentItems?.map((product: Product) => (
              <div
                key={product._id}
                className="relative border-gray-400 border rounded-lg bg-zinc-200 shadow-xl mb-3 flex flex-col h-[600px] overflow-hidden">
                <div className="relative flex-shrink-0">
                  <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-t-lg bg-black relative">
                    <img
                      src={product.imageLink}
                      alt={product.title}
                      className="h-[300px] w-full object-cover object-center"
                    />
                    <div className="absolute top-2 left-2 bg-gray-800 text-white px-2 py-1 rounded-md text-sm font-medium">
                      {product.category}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col flex-grow p-4 sm:p-6">
                  <h3 className="text-xl font-extrabold text-black mb-2 truncate">
                    {product.title}
                  </h3>
                  <p className="text-sm font-medium text-gray-500 text-limited mb-3">
                    {product.description}
                  </p>

                  <div className="flex justify-between items-center mb-3">
                    <p>
                      <span className="text-lg">Brand:</span> {product.brand}
                    </p>
                    <p>{product.stock} in stock</p>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <p className="sr-only">{product.rating} out of 5 stars</p>
                    <div className="flex items-center space-x-1">
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <StarIcon
                          key={rating}
                          className={classNames(
                            product.rating > rating
                              ? "text-yellow-400"
                              : "text-gray-500",
                            "h-5 w-5"
                          )}
                          aria-hidden="true"
                        />
                      ))}
                      <p className="ps-4">in review</p>
                    </div>
                  </div>
                  <p className="text-xl font-extrabold text-gray-900 mb-4">
                    ${product.price}
                  </p>
                  <div className="h-10 flex justify-center space-x-28">
                    <button
                      onClick={() => handleAddItem(product)}
                      type="button"
                      className="inline-flex items-center gap-x-1.5 rounded-md px-4 py-2 text-sm font-semibold text-black shadow-sm bg-lime-600 hover:bg-lime-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600">
                      Cart
                      <ShoppingCartIcon
                        className="-mr-0.5 h-5 w-5"
                        aria-hidden="true"
                      />
                    </button>
                    <Link
                      to={`/ProductView/${product._id}`}
                      type="button"
                      className="inline-flex items-center gap-x-1.5 rounded-md bg-orange-200 px-4 py-2 text-sm font-semibold text-black shadow-sm hover:bg-orange-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-200">
                      View
                      <EyeIcon className="-mr-0.5 h-5 w-5" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-8 mb-8">
            <nav className="inline-flex rounded-md shadow">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-2 text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 disabled:opacity-50">
                Previous
              </button>
              {[...Array(totalPages).keys()].map((pageNumber) => (
                <button
                  key={pageNumber + 1}
                  onClick={() => handlePageChange(pageNumber + 1)}
                  className={`px-3 py-2 ${
                    pageNumber + 1 === currentPage
                      ? "bg-green-300 text-black"
                      : "bg-white text-gray-500"
                  } border border-gray-300 hover:bg-gray-50`}>
                  {pageNumber + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-2 text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50 disabled:opacity-50">
                Next
              </button>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
