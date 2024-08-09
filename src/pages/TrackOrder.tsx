import { useState } from "react";
import { useTrackOneOrderQuery } from "../redux/api/baseApi";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
// Define the type for status keys
type StatusKey = 'Order placed' | 'processing' | 'shipped' | 'delivered';

// Ensure statusStages is correctly typed
const statusStages: Record<StatusKey, number> = {
  "Order placed": 8,
  processing: 40,
  shipped: 55,
  delivered: 100,
};

export default function TrackOrder() {
  const [OrderIdSearchQuery, setOrderIdSearchQuery] = useState("");
  const [orderId, setOrderId] = useState("");

  const { data, isLoading, error } = useTrackOneOrderQuery(orderId, {
    skip: !orderId, // Skip fetching if no order ID is provided
  });

  const handleSearchClick = () => {
    setOrderId(OrderIdSearchQuery); // Trigger the query with the entered order ID
  };

  // Calculate the progress width based on order status
const status = data?.data?.status as StatusKey;

// Calculate progressWidth safely
const progressWidth = status ? statusStages[status] || 0 : 0;

  return (
    <>
      <Navbar></Navbar>

      <div className="bg-gray-50">
        <div className="mx-auto max-w-2xl pt-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <p className="text-orange-500 font-semibold text-xl mb-6">
            Check your email to find the order number.
          </p>

          <div className="space-y-2 px-4 sm:flex sm:items-baseline sm:justify-between sm:space-y-0 sm:px-0">
            <div className="flex space-x-2 mb-5">
              <input
                type="text"
                value={OrderIdSearchQuery}
                onChange={(e) => setOrderIdSearchQuery(e.target.value)}
                placeholder="Enter Order ID..."
                className="p-2 border border-gray-300 rounded-md"
              />
              <button
                onClick={handleSearchClick}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                Search
              </button>
            </div>
            <div className="flex sm:items-baseline sm:space-x-4">
              {data && (
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                  Order Number # {data.data.orderId}
                </h1>
              )}
            </div>
            {data && (
              <p className="text-sm text-gray-600">
                Order placed{" "}
                <time
                  dateTime={data.data.createdAt}
                  className="font-medium text-gray-900">
                  {new Date(data.data.createdAt).toLocaleDateString()}
                </time>
              </p>
            )}
          </div>

          {/* Status and Progress Bar */}
          {isLoading && <p>Loading...</p>}
          {error && <p>Error fetching order details.</p>}
          {data && (
            <div className="border-t border-gray-200 px-4 py-6 sm:px-6 lg:p-8">
              <h4 className="sr-only">Status</h4>
              <p className="text-sm font-medium text-gray-900">
                {data.data.status} on{" "}
                <time dateTime={data.data.updatedAt}>
                  {new Date(data.data.updatedAt).toLocaleDateString()}
                </time>
              </p>
              <div className="mt-6" aria-hidden="true">
                <div className="overflow-hidden rounded-full bg-gray-200">
                  <div
                    className="h-2 rounded-full bg-indigo-600"
                    style={{ width: `${progressWidth}%` }}
                  />
                </div>
                <div className="mt-6 hidden grid-cols-4 text-sm font-medium text-gray-600 sm:grid">
                  <div
                    className={classNames(
                      data.data.status === "Order placed"
                        ? "text-indigo-600"
                        : ""
                    )}>
                    Order placed
                  </div>
                  <div
                    className={classNames(
                      data.data.status === "processing"
                        ? "text-indigo-600"
                        : "",
                      "text-center"
                    )}>
                    Processing
                  </div>
                  <div
                    className={classNames(
                      data.data.status === "shipped" ? "text-indigo-600" : ""
                    )}>
                    Shipped
                  </div>
                  <div
                    className={classNames(
                      data.data.status === "delivered" ? "text-indigo-600" : ""
                    )}>
                    Delivered
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Products */}
          {data && (
            <div className="mt-6">
              <h2 className="sr-only">Products purchased</h2>
              <div className="space-y-8">
                {data.data.cartItems.map((item:any) => (
                  <div
                    key={item._id}
                    className="border-b border-t border-gray-200 bg-white shadow-sm sm:rounded-lg sm:border">
                    <div className="px-4 py-6 sm:px-6  lg:grid lg:grid-cols-12 lg:gap-x-8 lg:p-8">
                      <div className="sm:flex lg:col-span-12">
                        <div className="aspect-h-1 aspect-w-1 w-full flex-shrink-0 overflow-hidden rounded-lg sm:aspect-none sm:h-40 sm:w-40 mr-36">
                          <img
                            src={item.imageLink}
                            alt={item.title}
                            className="h-full w-full object-cover object-center sm:h-full sm:w-full"
                          />
                        </div>

                        <div className="mt-6 sm:ml-6 sm:mt-0 ">
                          <h3 className="text-lg font-bold text-gray-900">
                            {item.title}
                          </h3>
                          <p className="mt-2 text-sm font-medium text-gray-900">
                            Quantity: {item.quantity}
                          </p>
                          <p className="mt-2 text-sm font-medium text-gray-900">
                            Price: {item.price} $
                          </p>
                        </div>
                        <div className="">
                          <Link
                            to={`/ProductView/${item.productId}`}
                            type="button"
                            className="ms-[500px] mt-12 flex h-12 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                            Buy again
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Billing Summary */}
          {data && (
            <div className="mt-16">
              <h2 className="sr-only">Billing Summary</h2>

              <div className="bg-gray-100 px-4 py-6 sm:rounded-lg sm:px-6 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8 lg:py-8">
                <dl className="grid grid-cols-2 gap-6 text-sm sm:grid-cols-2 md:gap-x-8 lg:col-span-7">
                  <div>
                    <dt className="font-medium text-gray-900">
                      Billing address and Shipping Address
                    </dt>
                    <dd className="mt-3 text-gray-500">
                      <span className="block">
                        {data.data.contactForm.firstName}{" "}
                        {data.data.contactForm.lastName}
                      </span>
                      <span className="block">
                        {data.data.contactForm.Address},{" "}
                        {data.data.contactForm.Apartment}
                      </span>
                      <span className="block">
                        {data.data.contactForm.City},{" "}
                        {data.data.contactForm.State}{" "}
                        {data.data.contactForm.Postal}
                      </span>
                      <span className="block">
                        {data.data.contactForm.Country}
                      </span>
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-900">
                      Payment information
                    </dt>
                    <dd className="-ml-4 -mt-1 flex flex-wrap">
                      <div className="ml-4 mt-4 flex-shrink-0">
                        <svg
                          aria-hidden="true"
                          width={36}
                          height={24}
                          viewBox="0 0 36 24"
                          className="h-6 w-auto">
                          <rect width={36} height={24} rx={4} fill="#224DBA" />
                          <path
                            d="M10.925 15.673H8.874l-1.538-6c-.073-.276-.228-.52-.456-.635A6.575 6.575 0 005 8.403v-.231h3.304c.456 0 .798.347.855.75l.798 4.328 2.05-5.078h1.994l-3.076 7.5zm4.216 0h-1.937L14.8 8.172h1.937l-1.595 7.5zm4.101-5.422c.057-.404.399-.635.798-.635a3.54 3.54 0 011.88.346l.342-1.615A4.808 4.808 0 0020.496 8c-1.88 0-3.248 1.039-3.248 2.481 0 1.097.969 1.673 1.653 2.02.74.346 1.025.577.968.923 0 .519-.57.75-1.139.75a4.795 4.795 0 01-1.994-.462l-.342 1.616a5.48 5.48 0 002.108.404c2.108.057 3.418-.981 3.418-2.539 0-1.962-2.678-2.077-2.678-2.942zm9.457 5.422L27.16 8.172h-1.652a.858.858 0 00-.798.577l-2.848 6.924h1.994l.398-1.096h2.45l.228 1.096h1.766zm-2.905-5.482l.57 2.827h-1.596l1.026-2.827z"
                            fill="#fff"
                          />
                        </svg>
                        <p className="sr-only">Visa</p>
                      </div>
                      <div className="ml-4 mt-4">
                        <p className="text-gray-900">
                          {data.data.paymentMethods.title}
                        </p>
                        <p className="text-gray-600"></p>
                      </div>
                    </dd>
                  </div>
                </dl>

                <dl className="mt-8 divide-y divide-gray-200 text-sm lg:col-span-5 lg:mt-0">
                  <div className="flex items-center justify-between py-4">
                    <dt className="text-gray-600">Shipping Method</dt>
                    <dd className="font-medium text-gray-900">
                      {data.data.deliveryMethod.title}
                      {"  "}
                      {data.data.deliveryMethod.turnaround}
                    </dd>
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <dt className="font-bold text-gray-900">Total Amount</dt>
                    <dd className="font-bold text-2xl text-indigo-600">
                      {data.data.orderTotal.toFixed(2)} $
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
