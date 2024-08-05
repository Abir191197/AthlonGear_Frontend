import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { CheckCircleIcon, TrashIcon } from "@heroicons/react/20/solid";
import { Link, ScrollRestoration } from "react-router-dom";
import Navbar from "./Navbar";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  clearCart,
  DecreaseQuantity,
  IncreaseQuantity,
  removeItem,
} from "../redux/features/cartSlice";
import { toast } from "react-toastify";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSendOrderConfirmDataMutation } from "../redux/api/baseApi";

const deliveryMethods = [
  {
    id: 1,
    title: "Standard",
    turnaround: "4–10 business days",
    price: "$5.00",
  },
  { id: 2, title: "Express", turnaround: "2–5 business days", price: "$16.00" },
];

const paymentMethods = [
  { id: "cash-on", title: "Cash on Delivery" },
  { id: "credit-card", title: "Credit card (Unavailable Now)" },
  { id: "paypal", title: "PayPal (Unavailable Now)" },
  { id: "Bkash", title: "Bkash (Unavailable Now)" },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function OrderSummary() {
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(
    deliveryMethods[0]
  );

   const [sendOrderConfirmData] =
     useSendOrderConfirmDataMutation();
  const dispatch = useAppDispatch();

  const handleIncreaseQuantity = (item: { _id: string }) => {
    dispatch(IncreaseQuantity({ _id: item._id }));
  };

  const handleDecreaseQuantity = (item: { _id: string }) => {
    dispatch(DecreaseQuantity({ _id: item._id }));
  };

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

  // Get all cart items from cart slice in Redux
  const cartItems = useAppSelector((state) => state.cart.carts);


  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  );

  const discount = subtotal * 0.05; // Example discount calculation
  const tax = subtotal * 0.15; // 15% tax

  const orderTotal = subtotal + tax - discount;

  //form handle with react form handler
  interface IFormInput {
    email: string;
    firstName: string;
    lastName: string;
    Address: string;
    Apartment: string;
    City: string;
    Country: string;
    State: string;
    Postal: string;
    Phone: number;
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = async (contactForm) => {
    const cartItem = cartItems.map((item) => ({
      productId: item._id,
      title: item.title,
      quantity: item.quantity,
    }));

    const orderDetails = {
      orderTotal,
      deliveryMethod: selectedDeliveryMethod,
      contactForm,
      cartItems: cartItem,
    };

  try {
    await sendOrderConfirmData(orderDetails).unwrap();
    console.log(orderDetails);
    toast.success("Order placed successfully!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    });
  } catch (error) {
    toast.error(`Failed to confirm order: ${error}`, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    });
  }

    reset();
    dispatch(clearCart());
   
  };
    
   
    
  return (
    <>
      <ScrollRestoration />
      <Navbar />
      <div className="bg-gray-50">
        <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Checkout</h2>

          {cartItems.length === 0 ? (
            <div className="text-center flex flex-col items-center">
              <h3 className="text-lg font-medium text-gray-900">
                Your cart is empty.
              </h3>
              <p className="mt-4 text-sm text-gray-600">
                Looks like you haven't added anything to your cart yet.
              </p>
              <button className="mt-4 px-6 py-2 bg-green-300 text-black font-bold uppercase tracking-wide rounded">
                <Link to="/">Shop Now</Link>
              </button>
              <button className="mt-4 px-6 py-2 bg-gray-300 text-black font-bold uppercase tracking-wide rounded">
                <Link to="">Track Your Order</Link>
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
              <div>
                <div>
                  <h2 className="text-lg font-medium text-gray-900">
                    Contact information
                  </h2>
                  <div className="mt-4">
                    <label
                      htmlFor="email-address"
                      className="block text-sm font-medium text-gray-700">
                      Email address
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="email"
                        autoComplete="email"
                        className={`block w-full rounded-md shadow-sm sm:text-sm ${
                          errors.email
                            ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                            : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                        }`}
                        {...register("email", {
                          required: "Email is required",
                        })}
                      />
                      {errors.email && (
                        <p className="mt-2 text-sm text-red-600">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-10 border-t border-gray-200 pt-10">
                  <h2 className="text-lg font-medium text-gray-900">
                    Shipping information
                  </h2>
                  <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                    <div>
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium text-gray-700">
                        First name
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          id="firstName"
                          autoComplete="First Name"
                          className={`block w-full rounded-md shadow-sm sm:text-sm ${
                            errors.firstName
                              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                              : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                          }`}
                          {...register("firstName", {
                            required: "first Name is required",
                          })}
                        />
                        {errors.firstName && (
                          <p className="mt-2 text-sm text-red-600">
                            {errors.firstName.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="last-name"
                        className="block text-sm font-medium text-gray-700">
                        Last name
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          id="lastName"
                          autoComplete="Last Name"
                          className={`block w-full rounded-md shadow-sm sm:text-sm ${
                            errors.lastName
                              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                              : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                          }`}
                          {...register("lastName", {
                            required: "last Name is required",
                          })}
                        />
                        {errors.lastName && (
                          <p className="mt-2 text-sm text-red-600">
                            {errors.lastName.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* <div className="sm:col-span-2">
                      <label
                        htmlFor="company"
                        className="block text-sm font-medium text-gray-700">
                        Company
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="company"
                          id="company"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div> */}

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="address"
                        className="block text-sm font-medium text-gray-700">
                        Address
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          id="Address"
                          autoComplete="Address"
                          className={`block w-full rounded-md shadow-sm sm:text-sm ${
                            errors.Address
                              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                              : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                          }`}
                          {...register("Address", {
                            required: "Address is required",
                          })}
                        />
                        {errors.Address && (
                          <p className="mt-2 text-sm text-red-600">
                            {errors.Address.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="apartment"
                        className="block text-sm font-medium text-gray-700">
                        Apartment, suite, etc.
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          id="Apartment"
                          autoComplete="Apartment"
                          className={`block w-full rounded-md shadow-sm sm:text-sm ${
                            errors.Apartment
                              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                              : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                          }`}
                          {...register("Apartment", {
                            required: "Apartment is required",
                          })}
                        />
                        {errors.Apartment && (
                          <p className="mt-2 text-sm text-red-600">
                            {errors.Apartment.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium text-gray-700">
                        City
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          id="City"
                          autoComplete="City"
                          className={`block w-full rounded-md shadow-sm sm:text-sm ${
                            errors.City
                              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                              : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                          }`}
                          {...register("City", {
                            required: "City is required",
                          })}
                        />
                        {errors.City && (
                          <p className="mt-2 text-sm text-red-600">
                            {errors.City.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium text-gray-700">
                        Country
                      </label>
                      <div className="mt-1">
                        <select
                          {...register("Country", {
                            required: "Country is required",
                          })}
                          id="Country"
                          name="Country"
                          autoComplete="country-name"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                          <option value="Bangladesh">Bangladesh</option>
                          <option value="United States">United States</option>
                          <option value="Canada">Canada</option>
                          <option value="Mexico">Mexico</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="region"
                        className="block text-sm font-medium text-gray-700">
                        State / Province
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          id="State"
                          autoComplete="State"
                          className={`block w-full rounded-md shadow-sm sm:text-sm ${
                            errors.State
                              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                              : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                          }`}
                          {...register("State", {
                            required: "State is required",
                          })}
                        />
                        {errors.State && (
                          <p className="mt-2 text-sm text-red-600">
                            {errors.State.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="postal-code"
                        className="block text-sm font-medium text-gray-700">
                        Postal code
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          id="Postal"
                          autoComplete="Postal"
                          className={`block w-full rounded-md shadow-sm sm:text-sm ${
                            errors.Postal
                              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                              : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                          }`}
                          {...register("Postal", {
                            required: "Postal Code is required",
                          })}
                        />
                        {errors.Postal && (
                          <p className="mt-2 text-sm text-red-600">
                            {errors.Postal.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700">
                        Phone
                      </label>
                      <div className="mt-1">
                        <input
                          type="number"
                          id="Phone"
                          autoComplete="Phone"
                          className={`block w-full rounded-md shadow-sm sm:text-sm ${
                            errors.Phone
                              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                              : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                          }`}
                          {...register("Phone", {
                            required: "Phone is required",
                          })}
                        />
                        {errors.Phone && (
                          <p className="mt-2 text-sm text-red-600">
                            {errors.Phone.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-10 border-t border-gray-200 pt-10">
                  <RadioGroup
                    value={selectedDeliveryMethod}
                    onChange={setSelectedDeliveryMethod}>
                    <RadioGroup.Label className="text-lg font-medium text-gray-900">
                      Delivery method
                    </RadioGroup.Label>

                    <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                      {deliveryMethods.map((deliveryMethod) => (
                        <RadioGroup.Option
                          key={deliveryMethod.id}
                          value={deliveryMethod}
                          className={({ checked, active }) =>
                            classNames(
                              checked
                                ? "border-transparent"
                                : "border-gray-300",
                              active ? "ring-2 ring-indigo-500" : "",
                              "relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none"
                            )
                          }>
                          {({ checked, active }) => (
                            <>
                              <span className="flex flex-1">
                                <span className="flex flex-col">
                                  <RadioGroup.Label
                                    as="span"
                                    className="block text-sm font-medium text-gray-900">
                                    {deliveryMethod.title}
                                  </RadioGroup.Label>
                                  <RadioGroup.Description
                                    as="span"
                                    className="mt-1 flex items-center text-sm text-gray-500">
                                    {deliveryMethod.turnaround}
                                  </RadioGroup.Description>
                                  <RadioGroup.Description
                                    as="span"
                                    className="mt-6 text-sm font-medium text-gray-900">
                                    {deliveryMethod.price}
                                  </RadioGroup.Description>
                                </span>
                              </span>
                              {checked ? (
                                <CheckCircleIcon
                                  className="h-5 w-5 text-indigo-600"
                                  aria-hidden="true"
                                />
                              ) : null}
                              <span
                                className={classNames(
                                  active ? "border" : "border-2",
                                  checked
                                    ? "border-indigo-500"
                                    : "border-transparent",
                                  "pointer-events-none absolute -inset-px rounded-lg"
                                )}
                                aria-hidden="true"
                              />
                            </>
                          )}
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                <div className="mt-10 border-t border-gray-200 pt-10">
                  <fieldset>
                    <legend className="text-lg font-medium text-gray-900">
                      Payment method
                    </legend>
                    <div className="mt-4 space-y-4">
                      {paymentMethods.map((paymentMethod, paymentMethodIdx) => (
                        <div
                          key={paymentMethodIdx}
                          className="flex items-center">
                          <input
                            id={paymentMethod.id}
                            name="payment-method"
                            type="radio"
                            defaultChecked={paymentMethod.id === "cash-on"}
                            disabled={
                              paymentMethod.id === "Bkash" ||
                              paymentMethod.id === "paypal" ||
                              paymentMethod.id === "credit-card"
                            }
                            className={`h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500 ${
                              paymentMethod.id === "Bkash" ||
                              paymentMethod.id === "paypal" ||
                              paymentMethod.id === "credit-card"
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                            }`}
                          />

                          <label
                            htmlFor={paymentMethod.id}
                            className="ml-3 block text-sm font-medium text-gray-700">
                            {paymentMethod.title}
                          </label>
                        </div>
                      ))}
                    </div>
                  </fieldset>
                </div>
              </div>

              <div className="mt-10 lg:mt-0">
                <h2 className="text-lg font-medium text-gray-900">
                  Order summary
                </h2>

                <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
                  <h3 className="sr-only">Items in your cart</h3>
                  <ul role="list" className="divide-y divide-gray-200">
                    {cartItems.map((item, idx) => (
                      <li key={idx} className="flex py-6 px-4 sm:px-6">
                        <div className="flex-shrink-0">
                          <img
                            src={item.imageLink}
                            alt={item.imageLink}
                            className="w-20 rounded-md"
                          />
                        </div>

                        <div className="ml-6 flex flex-1 flex-col">
                          <div className="flex">
                            <div className="min-w-0 flex-1">
                              <h4 className="text-sm">
                                <Link
                                  to={`/ProductView/${item._id}`}
                                  className="font-medium text-gray-700 hover:text-gray-800">
                                  {item.title}
                                </Link>
                              </h4>
                              <p className="mt-1 text-sm text-gray-500">
                                {item.brand}
                              </p>
                              <p className="mt-1 text-sm text-gray-500">
                                {item.category}
                              </p>
                            </div>

                            <div className="ml-4 flow-root flex-shrink-0">
                              <button
                                type="button"
                                className="-m-2.5 flex items-center justify-center p-2.5 text-gray-400 hover:text-gray-500"
                                onClick={() => handleRemoveItem(item)}>
                                <TrashIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </button>
                            </div>
                          </div>

                          <div className="flex flex-1 items-end justify-between pt-2">
                            <p className="mt-1 text-sm font-medium text-gray-900">
                              {item.price}
                            </p>

                            <div className="ml-4">
                              <label
                                htmlFor={`quantity-${item._id}`}
                                className="sr-only">
                                Quantity, {item.title}
                              </label>
                              <div className="flex items-center border-gray-200 rounded">
                                <button
                                  type="button"
                                  className="inline-flex items-center justify-center h-8 w-8 rounded-l text-gray-600 bg-gray-200 hover:bg-gray-300"
                                  onClick={() => handleDecreaseQuantity(item)}>
                                  -
                                </button>
                                <input
                                  id={`quantity-${item._id}`}
                                  name={`quantity-${item._id}`}
                                  value={item.quantity}
                                  readOnly
                                  className="w-12 h-8 border-t border-b text-center"
                                />
                                <button
                                  type="button"
                                  className="inline-flex items-center justify-center h-8 w-8 rounded-r text-gray-600 bg-gray-200 hover:bg-gray-300"
                                  onClick={() => handleIncreaseQuantity(item)}>
                                  +
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                    <div className="flex justify-between text-sm font-medium text-gray-900">
                      <p>Subtotal</p>
                      <p>${subtotal.toFixed(2)}</p>
                    </div>
                    <div className="mt-4 flex justify-between text-sm font-semibold  text-red-500">
                      <p>Discount</p>
                      <p>- ${discount.toFixed(2)}</p>
                    </div>

                    <div className="mt-4 flex justify-between text-sm font-medium text-gray-900">
                      <p>Taxes and 15% GST </p>
                      <p>${tax.toFixed(2)}</p>
                    </div>
                    <div className="mt-4 flex justify-between text-sm font-medium text-gray-900">
                      <p>Shipping</p>
                      <p>{selectedDeliveryMethod.price}</p>
                    </div>
                    <div className="mt-6 flex justify-between text-sm font-medium text-gray-900">
                      <p>Total</p>
                      <p>${orderTotal.toFixed(2)}</p>
                    </div>
                    <dd className="text-base font-bold text-green-600 mt-3">
                      Total You Save {discount.toFixed(2)} $
                    </dd>
                    <div className="mt-6">
                      <button
                        type="submit"
                        className="w-full rounded-md border border-transparent bg-indigo-600 py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                        Confirm order
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
