import { Link } from "react-router-dom";


const categories = [
  {
    name: "Fitness Equipment",

    imageSrc:
      "https://images.unsplash.com/photo-1595909315417-2edd382a56dc?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Sports Apparel",

    imageSrc:
      "https://img.freepik.com/free-photo/football-composition-with-jersey_23-2147827778.jpg?t=st=1723090940~exp=1723094540~hmac=09b91706bdf48b9c444760e216067aa1dbc5df3d31e7f624f50af16fcb4455a8&w=996",
  },
  {
    name: "Footwear",

    imageSrc:
      "https://img.freepik.com/free-photo/football-background-grass-with-shoes_23-2147832118.jpg?t=st=1723091047~exp=1723094647~hmac=963b46df6f1a72706ebc984c39f3cd3e169c60665602fbeaddbd56ce583e1469&w=996",
  },
  {
    name: "Outdoor Gear",

    imageSrc:
      "https://img.freepik.com/premium-photo/adventure-gear-travel-preparedness-camping-essentials_1123896-45018.jpg?w=1060",
  },
  {
    name: "Winter Sports",

    imageSrc:
      "https://img.freepik.com/free-photo/winter-scene-with-people-snowboarding_23-2151472549.jpg?t=st=1723091336~exp=1723094936~hmac=5f074b9d00896378e688a79ebe493440a38831027085f80a906d00a196085673&w=1060",
  },
];


export default function Category() {
    

  return (
    <>
      <div className="bg-white">
        <div className="py-16 sm:py-24 xl:mx-auto xl:max-w-full xl:px-8">
          <div className="px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 xl:px-0">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              Shop by Category
            </h2>
            <Link
              to="/categories"
              className="hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:block">
              Browse all categories
              <span aria-hidden="true"> &rarr;</span>
            </Link>
          </div>

          <div className="mt-4 flow-root">
            <div className="-my-2">
              <div className="relative box-content h-80 overflow-x-auto py-2 xl:overflow-visible">
                <div className="min-w-screen-xl absolute flex space-x-8 px-4 sm:px-6 lg:px-8 xl:relative xl:grid xl:grid-cols-5 xl:gap-x-8 xl:space-x-0 xl:px-0">
                  {categories.slice(0, 5).map((category) => (
                    <Link
                      key={category.name}
                      to={`/Products/AllProducts?category=${category.name}`}
                      className="relative flex h-80 w-56 flex-col overflow-hidden rounded-lg p-6 hover:opacity-75 xl:w-auto">
                      <span aria-hidden="true" className="absolute inset-0">
                        <img
                          src={category.imageSrc}
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </span>
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-gray-800 opacity-50"
                      />
                      <span className="relative mt-auto text-center text-xl font-bold text-white">
                        {category.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 px-4 sm:hidden">
            <Link
              to="categories"
              className="block text-sm font-semibold text-indigo-600 hover:text-indigo-500">
              Browse all categories
              <span aria-hidden="true"> &rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
