import {  Link, ScrollRestoration } from "react-router-dom";

import Navbar from "./Navbar";

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
    name: "Hockey",

    imageSrc:
      "https://img.freepik.com/premium-photo/elevating-performance-with-stick-repair-kits-white-background_960080-45377.jpg?w=1060",
  },
 
  {
    name: "Golf",

    imageSrc:
      "https://img.freepik.com/premium-vector/collection-golf-balls-including-one-that-has-red-bag_873925-1430779.jpg?w=740",
  },
  {
    name: "Baseball",

    imageSrc:
      "https://img.freepik.com/premium-photo/baseball-starter-kit-cartoon-vector-icon-illustration-sport-object-icon-concept-isolated-premium-vector_839035-1771813.jpg?w=740",
  },
  {
    name: "Basketball",

    imageSrc:
      "https://img.freepik.com/free-photo/full-length-portrait-basketball-player-with-ball_155003-12957.jpg?t=st=1723090769~exp=1723094369~hmac=ea77ce32d9845a77df128c8640de4a9079cf9e767231b8e75a327638eaf1ee72&w=740",
  },
  {
    name: "Football",

    imageSrc:
      "https://img.freepik.com/free-photo/soccer-player-with-ball-grass-field_23-2150821562.jpg?t=st=1723091498~exp=1723095098~hmac=518cb5e8ccf4f718640b108ef02bce3aa54b37df67f20855881f51f0bd74ba99&w=740",
  },
  {
    name: "Tennis",

    imageSrc:
      "https://img.freepik.com/free-photo/sideways-tennis-racket-ball_23-2148218672.jpg?t=st=1723091113~exp=1723094713~hmac=36f741284ab2b5c65f329ef0b6615d0204c6acb2c58ec42c36d5dbbabcc55281&w=1060",
  },

  {
    name: "Yoga & Pilates",

    imageSrc:
      "https://img.freepik.com/free-photo/portrait-person-practicing-yoga-beach-sunset_23-2151046782.jpg?t=st=1723091561~exp=1723095161~hmac=5743e5e5c0238824e5c19ad05e1f08e561808338ce7b3dfd6ce43acd78863e55&w=1060",
  },
  {
    name: "Combat Sports",

    imageSrc:
      "https://img.freepik.com/free-photo/mma-fighters-professional-ring-fighting-championship_654080-1852.jpg?t=st=1723091577~exp=1723095177~hmac=e8ea09be124c9d34f91c57cf57cb17ae46f712a0dac1b449d8d70fdebeb11ecc&w=1380",
  },
  {
    name: " Racket Sports",

    imageSrc:
      "https://img.freepik.com/free-photo/modern-badminton-equipment-composition_23-2148000525.jpg?t=st=1723091602~exp=1723095202~hmac=5f5e4a7d447f82d76090005f14535bb812f589bc8aa8195fac6e3f07a4843aaf&w=740",
  },

  {
    name: "Swimming",

    imageSrc:
      "https://img.freepik.com/free-photo/male-swimmer-holding-edge-swimming-pool_171337-7764.jpg?t=st=1723091689~exp=1723095289~hmac=306ad64a78a3a8ff46aa292dc317b3726e42b83bceca676e2f7896860f0e7620&w=1060",
  },
  {
    name: "Running",

    imageSrc:
      "https://img.freepik.com/free-photo/man-woman-running-track-side-view_23-2149731293.jpg?t=st=1723091725~exp=1723095325~hmac=951025ee28b223e6bdef2af7eae131ec2713c063a8e409c15da565107f121de0&w=1060",
  },
  {
    name: "Cycling",

    imageSrc:
      "https://img.freepik.com/free-photo/pensive-man-riding-down-hill_329181-8688.jpg?t=st=1723091758~exp=1723095358~hmac=369837ee23e4ae77052347eb0bc05d70ba042e93264078b5f77b30fca06c2ef0&w=1060",
  },
];

export default function AllCategory() {
 

  return (
    <>
      <Navbar></Navbar>
      <ScrollRestoration></ScrollRestoration>
      <div className="bg-white">
        <div className="py-16 sm:py-24 xl:mx-auto xl:max-w-full xl:px-8">
          <div className="px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 xl:px-0">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              All Category
            </h2>
          </div>

          <div className="mt-4 flow-root">
            <div className="-my-2">
              <div className="relative box-content h-80 overflow-x-auto py-2 xl:overflow-visible">
                <div className="min-w-screen-xl absolute flex space-x-8 px-4 sm:px-6 lg:px-8 xl:relative xl:grid xl:grid-cols-5 xl:gap-x-8 xl:space-x-0 xl:px-0">
                  {categories.map((category) => (
                    <Link
                      key={category.name}
                      to={`/Products/AllProducts?category=${( category.name
                      )}`}
                      className="relative flex h-80 w-56 flex-col overflow-hidden rounded-lg p-6 hover:opacity-75 xl:w-auto mb-10">
                      <span aria-hidden="true" className="absolute inset-0">
                        <img
                          src={category.imageSrc}
                          alt={category.name}
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
        </div>
      </div>
    </>
  );
}
