import { StarIcon } from "@heroicons/react/20/solid";
import { EyeIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useGetProductsQuery } from "../redux/api/baseApi";
import "./Products.css"; 

// types.ts or within Products.tsx
export interface product {
  _id: string;
  title: string;
  description: string;
  imageLink: string;
  category: string;
  brand: string;
  stock: number;
  rating: number;
  price: number;
}






function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Products() {

const { data } = useGetProductsQuery(undefined);
console.log(data);





return (
  <div className="bg-white">
    <div className="mx-auto overflow-hidden sm:px-6 lg:px-8">
      <h2 className="sr-only">Products</h2>

      <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 bg-white">
        {data?.data?.map((product: product) => (
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
              <div className="flex justify-center space-x-32 mb-2">
                <button
                  type="button"
                  className="inline-flex items-center gap-x-1.5 rounded-md bg-lime-600 px-4 py-2 text-sm font-semibold text-black shadow-sm hover:bg-lime-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600">
                  Cart
                  <ShoppingCartIcon
                    className="-mr-0.5 h-5 w-5"
                    aria-hidden="true"
                  />
                </button>
                <button
                  type="button"
                  className="inline-flex items-center gap-x-1.5 rounded-md bg-orange-200 px-4 py-2 text-sm font-semibold text-black shadow-sm hover:bg-orange-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-200">
                  View
                  <EyeIcon className="-mr-0.5 h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

}
