import {
  CheckIcon,
  ClockIcon,
  QuestionMarkCircleIcon,
 
} from "@heroicons/react/20/solid";
import { Link, ScrollRestoration } from "react-router-dom";
import Navbar from "./Navbar";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  IncreaseQuantity,
  DecreaseQuantity,
  removeItem,
} from "../redux/features/cartSlice";
import { toast } from "react-toastify";
import { TrashIcon } from "@heroicons/react/24/outline";

export default function Cart() {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.carts);

  const handleRemoveItem = (item: { _id: string; title: string }) => {
    dispatch(removeItem({ _id: item._id }));
    toast.success(`${item.title} removed from cart!`, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    });
  };

  const handleIncreaseQuantity = (item: { _id: string }) => {
    dispatch(IncreaseQuantity({ _id: item._id }));
  };

  const handleDecreaseQuantity = (item: { _id: string }) => {
    dispatch(DecreaseQuantity({ _id: item._id }));
  };

  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  );

  const discount = subtotal * 0.05; // Example discount calculation
  const tax = subtotal * 0.15; // 15% tax

  const orderTotal = subtotal + tax - discount;

  return (
    <>
      <ScrollRestoration />
      <Navbar />
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
          {cartItems.length === 0 ? (
            <div className="text-center flex flex-col items-center">
              <h3 className="text-3xl font-semibold text-gray-900">
                Your cart is empty.
              </h3>
              <p className="mt-4 text-sm text-gray-600">
                Looks like you haven't added anything to your cart yet.
              </p>
              <button className="mt-4 px-6 py-2 bg-green-300 text-black font-bold uppercase tracking-wide rounded">
                <Link to="/">Shop Now</Link>
              </button>
              <button className="mt-4 px-6 py-2 bg-gray-300 text-black font-bold uppercase tracking-wide rounded">
                <Link to="/Orders/TrackOrder">Track Your Order</Link>
              </button>
            </div>
          ) : (
            <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
              <section aria-labelledby="cart-heading" className="lg:col-span-7">
                <h2 id="cart-heading" className="sr-only">
                  Items in your shopping cart
                </h2>

                <ul
                  role="list"
                  className="divide-y divide-gray-200 border-b border-t border-gray-200">
                  {cartItems.map((item, itemIdx) => (
                    <li key={item._id} className="flex py-6 sm:py-10">
                      <div className="flex-shrink-0">
                        <img
                          src={item.imageLink}
                          alt={item.title}
                          className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                          <div>
                            <div className="flex justify-between">
                              <h3 className="text-sm">
                                <Link
                                  to={`/ProductView/${item._id}`}
                                  className="font-bold text-xl text-gray-700 hover:text-gray-800">
                                  {item.title}
                                </Link>
                              </h3>
                            </div>
                            <div className="mt-1 flex text-sm">
                              <p className="text-gray-500">{item.category}</p>
                              {item.brand ? (
                                <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">
                                  {item.brand}
                                </p>
                              ) : null}
                            </div>
                            <p className="mt-5 text-xl font-medium text-gray-900">
                              ${item.price}
                            </p>
                          </div>

                          <div className="mt-4 sm:mt-0 sm:pr-9">
                            <div className="flex items-center">
                              <button
                                onClick={() => handleDecreaseQuantity(item)}
                                className="mr-3 text-xl font-bold text-gray-700"
                                type="button">
                                -
                              </button>
                              <input
                                type="text"
                                id={`quantity-${itemIdx}`}
                                name={`quantity-${itemIdx}`}
                                min="1"
                                max={item.stock} // Max quantity based on stock
                                value={item.quantity || 1} // Default to 1 if quantity is not set
                                readOnly // Make the input field read-only
                                className="w-12 text-center rounded-md border border-gray-300 py-1.5 text-base font-medium leading-5 text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                              />
                              <button
                                onClick={() => handleIncreaseQuantity(item)}
                                className="ml-3 text-xl font-bold text-gray-700"
                                type="button">
                                +
                              </button>
                            </div>
                            <div className="absolute right-0 top-0">
                              <button
                                type="button"
                                onClick={() => handleRemoveItem(item)}
                                className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500">
                                <span className="sr-only">Remove</span>
                                <TrashIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </button>
                            </div>
                          </div>
                        </div>

                        <p className="mt-4 flex space-x-2 text-sm text-gray-700">
                          {item.stock > 0 ? (
                            <CheckIcon
                              className="h-5 w-5 flex-shrink-0 text-green-500"
                              aria-hidden="true"
                            />
                          ) : (
                            <ClockIcon
                              className="h-5 w-5 flex-shrink-0 text-gray-300"
                              aria-hidden="true"
                            />
                          )}

                          <span>
                            {item.stock > 0
                              ? `${item.stock} Products In stock`
                              : `Ships in 3–4 weeks`}
                          </span>
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Order summary */}
              <section
                aria-labelledby="summary-heading"
                className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
                <h2
                  id="summary-heading"
                  className="text-lg font-medium text-gray-900">
                  Order summary
                </h2>

                <dl className="mt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <dt className="text-sm text-gray-600">Subtotal</dt>
                    <dd className="text-sm font-medium text-gray-900">
                      ${subtotal.toFixed(2)}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <dt className="flex items-center text-sm text-gray-600">
                      <span>Discount</span>
                      <a
                        href="#"
                        className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                        <span className="sr-only">
                          Learn more about how discount is calculated
                        </span>
                        <QuestionMarkCircleIcon
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                      </a>
                    </dt>
                    <dd className="text-sm font-medium text-red-600">
                      - ${discount.toFixed(2)}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <dt className="flex text-sm text-gray-600">
                      <span>Tax and 15% GST estimate</span>
                      <a
                        href="#"
                        className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                        <span className="sr-only">
                          Learn more about how tax is calculated
                        </span>
                        <QuestionMarkCircleIcon
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                      </a>
                    </dt>
                    <dd className="text-sm font-medium text-gray-900">
                      ${tax.toFixed(2)}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <dt className="flex text-sm text-gray-600">
                      <span>Shipping Charge</span>
                      <a className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                        <span className="sr-only">
                          Learn more about how tax is calculated
                        </span>
                        <QuestionMarkCircleIcon
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                      </a>
                    </dt>
                    <dd className="text-sm font-semibold text-gray-900">
                      Added in next step
                    </dd>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <dt className="text-base font-medium text-gray-900">
                      Order total
                    </dt>
                    <dd className="text-base font-medium text-gray-900">
                      ${orderTotal.toFixed(2)}
                    </dd>
                  </div>
                  <dd className="text-base font-semibold text-green-600">
                    Total You Save {discount.toFixed(2)} $
                  </dd>
                </dl>

                <div className="mt-6">
                  <Link
                    to={`/CheckOut`}
                    className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50">
                    Checkout
                  </Link>
                </div>
              </section>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
