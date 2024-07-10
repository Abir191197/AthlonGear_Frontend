import { StarIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "Organize Basic Set (Walnut)",
    category: "Office Accessories",
    stock: 15,
    brand: "Organize",
    rating: 5,
    reviewCount: 38,
    price: "$149",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-05-image-card-01.jpg",
    imageAlt: "Organize Basic Set (Walnut)",
    href: "#",
  },
  {
    id: 2,
    name: "Organize Pen Holder",
    category: "Office Accessories",
    stock: 25,
    brand: "Organize",
    rating: 5,
    reviewCount: 18,
    price: "$15",
    imageSrc:
      "https://res.cloudinary.com/dymnilfcs/image/upload/v1720630253/usuee5i4jmc7rkubzqov.jpg",
    imageAlt: "Organize Pen Holder",
    href: "#",
  },
  {
    id: 3,
    name: "Organize Sticky Note Holder",
    category: "Office Accessories",
    stock: 10,
    brand: "Organize",
    rating: 5,
    reviewCount: 14,
    price: "$15",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-05-image-card-03.jpg",
    imageAlt: "Organize Sticky Note Holder",
    href: "#",
  },
  {
    id: 4,
    name: "Organize Phone Holder",
    category: "Office Accessories",
    stock: 5,
    brand: "Organize",
    rating: 4,
    reviewCount: 21,
    price: "$15",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-05-image-card-04.jpg",
    imageAlt: "Organize Phone Holder",
    href: "#",
  },
  {
    id: 5,
    name: "Outdoor Basketball",
    category: "Basketball",
    stock: 20,
    brand: "SportPro",
    rating: 4.8,
    reviewCount: 25,
    price: "$29",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-05-image-card-09.jpg",
    imageAlt: "Outdoor Basketball",
    href: "#",
  },
  {
    id: 6,
    name: "Running Shoes",
    category: "Running",
    stock: 15,
    brand: "SportPro",
    rating: 4.5,
    reviewCount: 18,
    price: "$89",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-05-image-card-10.jpg",
    imageAlt: "Running Shoes",
    href: "#",
  },
  {
    id: 7,
    name: "Tennis Racket",
    category: "Tennis",
    stock: 12,
    brand: "SportPro",
    rating: 4.7,
    reviewCount: 30,
    price: "$99",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-05-image-card-11.jpg",
    imageAlt: "Tennis Racket",
    href: "#",
  },
  {
    id: 8,
    name: "Yoga Mat",
    category: "Yoga",
    stock: 18,
    brand: "SportPro",
    rating: 4.6,
    reviewCount: 22,
    price: "$49",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-05-image-card-12.jpg",
    imageAlt: "Yoga Mat",
    href: "#",
  },
  // Add more sports goods products as needed
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Featured() {
  return (
    <div className="bg-white">
      <div className="flex justify-center mx-[600px] px-12 text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-yellow-500 to-red-500">
        <h2 className="font-semibold text-4xl">Newest</h2>
        <h2 className="font-semibold text-4xl ml-2">Treasures</h2>
      </div>
      <div className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <Link
              to="\to"
              key={product.id}
              className="bg-lime-50 border border-gray-200 rounded-lg overflow-hidden shadow-lg hover:shadow-xl">
              <img
                src={product.imageSrc}
                alt={product.imageAlt}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  Category: {product.category}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  Stock: {product.stock}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  Brand: {product.brand}
                </p>
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, index) => (
                    <StarIcon
                      key={index}
                      className={classNames(
                        index < product.rating
                          ? "text-yellow-400"
                          : "text-gray-300",
                        "h-5 w-5 flex-shrink-0"
                      )}
                      aria-hidden="true"
                    />
                  ))}
                  <span className="ml-1 text-sm text-gray-500">
                    ({product.reviewCount} reviews)
                  </span>
                </div>
                <p className="text-lg font-semibold text-gray-900">
                  {product.price}
                </p>
                <button
                  type="button"
                  className="mt-4 rounded-md bg-green-300 px-3 py-2 text-sm font-semibold text-black- shadow-sm hover:bg-green-500">
                  Add to Bag
                </button>
                <button
                  type="button"
                  className="inline-block ml-28  rounded-md bg-indigo-50 px-3 py-2 text-sm font-semibold text-red-100-600 shadow-sm hover:bg-indigo-100">
                  Preview
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}