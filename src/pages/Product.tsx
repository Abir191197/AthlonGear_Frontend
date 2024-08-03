import {
  CheckIcon,
  QuestionMarkCircleIcon,
  StarIcon,
} from "@heroicons/react/20/solid";
import { ShieldCheckIcon } from "@heroicons/react/24/outline";

import Navbar from "./Navbar";
import { ScrollRestoration, useParams } from "react-router-dom";
import { useGetOneProductQuery } from "../redux/api/baseApi";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { addItem, CartItem } from "../redux/features/cartSlice";
import { toast } from "react-toastify";
import { SyncLoader } from "react-spinners";


function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Product() {
  const { id } = useParams();
  const { data,isLoading } = useGetOneProductQuery(id);
  
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.carts);

  const handleAddItem = (item: CartItem) => {
    const existingItem = cartItems.find((cartItem) => cartItem._id === id);

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
  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}>
        <SyncLoader
          
          size={20}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }

  return (
    <>
      <ScrollRestoration />
      <Navbar></Navbar>
      <div className="bg-teal-50">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          {/* Product details */}
          <div className="lg:max-w-lg lg:self-end">
            <div className="mt-4">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {data?.data?.title}
              </h1>
            </div>

            <section aria-labelledby="information-heading" className="mt-4">
              <h2 id="information-heading" className="sr-only">
                Product information
              </h2>

              <div className="flex items-center">
                <p className="text-xl font-semibold text-green-900 sm:text-3xl">
                  {data?.data?.price}$
                </p>

                <div className="ml-4 border-l border-gray-300 pl-4">
                  <h2 className="sr-only">Reviews</h2>
                  <div className="flex items-center">
                    <div>
                      <div className="flex items-center">
                        {[0, 1, 2, 3, 4].map((rating) => (
                          <StarIcon
                            key={rating}
                            className={classNames(
                              data?.data?.rating > rating
                                ? "text-yellow-400"
                                : "text-gray-300",
                              "h-5 w-5 flex-shrink-0"
                            )}
                            aria-hidden="true"
                          />
                        ))}
                      </div>
                      <p className="sr-only">
                        {data?.data?.rating} out of 5 stars
                      </p>
                    </div>
                    {/* <p className="ml-2 text-sm text-gray-500">
                      {data?.data?.totalCount} reviews
                    </p> */}
                  </div>
                </div>
              </div>

              <div className="mt-4  flex">
                <img
                  className="h-8 w-8 me-5"
                  aria-hidden="true"
                  src="../../public/tag.svg"
                />

                <p className="text-base text-stone-950">
                  {data?.data?.description}
                </p>
              </div>
              <div className="mt-4  flex  between">
                <img
                  className=" h-5 w-5 me-5"
                  aria-hidden="true"
                  src="../../public/cat.png"
                  alt=""
                />
                <p className="text-base text-gray-500">
                  Category: {data?.data?.category}
                </p>
                <p className="text-base text-gray-500 ms-32">
                  Brand: {data?.data?.brand}
                </p>
              </div>

              <div className="mt-6 flex items-center">
                <CheckIcon
                  className="h-5 w-5 flex-shrink-0 text-green-500"
                  aria-hidden="true"
                />
                <p className="ml-2 text-sm text-gray-500">
                  {data?.data?.stock} Product In stock and ready to ship
                </p>
              </div>
            </section>
          </div>

          {/* Product image */}
          <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
            <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg">
              <img
                src={data?.data?.imageLink}
                alt={data?.data?.imageLink}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>

          {/* Product form */}
          <div className="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
            <section aria-labelledby="options-heading">
              <h2 id="options-heading" className="sr-only">
                Product options
              </h2>

              <form>
                <div className="sm:flex sm:justify-between"></div>
                <div className="mt-4">
                  <a
                    href="#"
                    className="group inline-flex text-sm text-gray-500 hover:text-gray-700">
                    <span>What size should I buy?</span>
                    <QuestionMarkCircleIcon
                      className="ml-2 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </a>
                </div>
                <div className="mt-10">
                  <button
                    type="button"
                    onClick={() => handleAddItem(data?.data)}
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50">
                    Add to bag
                  </button>
                </div>
                <div className="mt-6 text-center">
                  <a
                    href="#"
                    className="group inline-flex text-base font-medium">
                    <ShieldCheckIcon
                      className="mr-2 h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                    <span className="text-gray-500 hover:text-gray-700">
                      Lifetime Guarantee
                    </span>
                  </a>
                </div>
              </form>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
