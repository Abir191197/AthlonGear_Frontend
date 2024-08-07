import { Link, ScrollRestoration } from "react-router-dom";
import Navbar from "./Navbar";
import { useGetProductsQuery, useSendProductDetailsMutation } from "../redux/api/baseApi";
import { PencilSquareIcon } from "@heroicons/react/20/solid";
import { TrashIcon } from "@heroicons/react/24/outline";
import { SyncLoader } from "react-spinners";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

 interface Product {
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




export default function ManageProduct() {


 const { register, handleSubmit, reset } = useForm<Product>();
  const { data, isLoading: isFetchingProducts } =
    useGetProductsQuery(undefined);
  const [sendProductData, { isLoading: isSendingProduct }] =
    useSendProductDetailsMutation();

if (isFetchingProducts || isSendingProduct) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}>
      <SyncLoader size={20} aria-label="Loading Spinner" data-testid="loader" />
    </div>
  );
}
  

 
  
  const onSubmit: SubmitHandler<Product> = async (productForm) => {


    const updatedProductForm = {
      ...productForm,
      price: Number(productForm.price),
      stock: Number(productForm.stock),
    };





   console.log(updatedProductForm);
   try {
     await sendProductData(updatedProductForm).unwrap(); // Pass productForm directly
     toast.success("Product Created successfully!", {
       position: "top-center",
       autoClose: 3000,
       hideProgressBar: false,
       closeOnClick: true,
       pauseOnHover: true,
       draggable: true,
       theme: "light",
     });
   } catch (error) {
     console.error(error); // For better debugging
     toast.error(`Failed to create Product: ${error}`, {
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
    
 };
 






 return (
   <>
     <Navbar />
     <ScrollRestoration />

     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
       <div className="w-full bg-white shadow-sm rounded-sm m-2 p-4">
         <form className="p-2" onSubmit={handleSubmit(onSubmit)}>
           <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
             <div className="col-span-1 sm:col-span-3 lg:col-span-3">
               <label
                 htmlFor="title"
                 className="block text-sm font-medium text-gray-900">
                 Title
               </label>
               <input
                 type="text"
                 id="title"
                 {...register("title", { required: true })}
                 placeholder="Enter product title"
                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
               />
             </div>

             <div className="col-span-3 sm:col-span-3 lg:col-span-4">
               <label
                 htmlFor="description"
                 className="block text-sm font-medium text-gray-900">
                 Description
               </label>
               <textarea
                 id="description"
                 {...register("description", { required: true })}
                 placeholder="Enter product description"
                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"></textarea>
             </div>

             <div className="sm:col-span-3 lg:col-span-1">
               <label
                 htmlFor="category"
                 className="block text-sm font-medium text-gray-900">
                 Category
               </label>
               <select
                 id="category"
                 {...register("category", { required: true })}
                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                 <option value="">Select a Category</option>
                 <option value="Fitness Equipment">Fitness Equipment</option>
                 <option value="Sports Apparel">Sports Apparel</option>
                 <option value="Footwear">Footwear</option>
                 <option value="Outdoor Gear">Outdoor Gear</option>
                 <option value="Cycling">Cycling</option>
                 <option value="Running">Running</option>
                 <option value="Swimming">Swimming</option>
                 <option value="Team Sports">Team Sports</option>
                 <option value="Racket Sports">Racket Sports</option>
                 <option value="Combat Sports">Combat Sports</option>
                 <option value="Yoga & Pilates">Yoga & Pilates</option>
                 <option value="Winter Sports">Winter Sports</option>
                 <option value="Golf">Golf</option>
                 <option value="Tennis">Tennis</option>
                 <option value="Basketball">Basketball</option>
                 <option value="Football">Football</option>
                 <option value="Baseball">Baseball</option>
                 <option value="Hockey">Hockey</option>
                 <option value="Skateboarding">Skateboarding</option>
                 <option value="Surfing">Surfing</option>
                 <option value="Climbing">Climbing</option>
                 <option value="Water Sports">Water Sports</option>
                 <option value="Track & Field">Track & Field</option>
               </select>
             </div>

             <div className="sm:col-span-3 lg:col-span-1">
               <label
                 htmlFor="brand"
                 className="block text-sm font-medium text-gray-900">
                 Brand
               </label>
               <input
                 type="text"
                 id="brand"
                 {...register("brand", { required: true })}
                 placeholder="Enter brand name"
                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
               />
             </div>

             <div className="sm:col-span-3 lg:col-span-1">
               <label
                 htmlFor="price"
                 className="block text-sm font-medium text-gray-900">
                 Price
               </label>
               <input
                 type="number"
                 id="price"
                 {...register("price", { required: true })}
                 placeholder="Enter price"
                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
               />
             </div>

             <div className="sm:col-span-3 lg:col-span-2">
               <label
                 htmlFor="image"
                 className="block text-sm font-medium text-gray-900">
                 Image Link
               </label>
               <input
                 type="text"
                 id="imageLink"
                 {...register("imageLink", { required: true })}
                 placeholder="Enter image URL"
                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
               />
             </div>

             <div className="sm:col-span-3 lg:col-span-1">
               <label
                 htmlFor="stock"
                 className="block text-sm font-medium text-gray-900">
                 Stock
               </label>
               <input
                 type="number"
                 id="stock"
                 {...register("stock", { required: true })}
                 placeholder="Enter stock quantity"
                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
               />
             </div>
           </div>

           <div className="flex justify-end gap-2 mt-4">
             <button
               type="button"
               className="text-sm font-semibold text-gray-900 hover:text-gray-700">
               Cancel
             </button>
             <button
               type="submit"
               className="bg-indigo-600 px-3 py-2 text-sm font-semibold text-white rounded-md shadow-sm hover:bg-indigo-500 focus:ring-2 focus:ring-indigo-600">
               Upload
             </button>
           </div>
         </form>
       </div>

       <div className="w-full bg-white shadow-md rounded-xl m-2 p-4">
         <div className="flex flex-col items-center">
           <div className="text-center">
             <h1 className="text-2xl font-semibold leading-6 text-gray-900">
               All Products
             </h1>
             <p className="mt-2 text-sm text-gray-700">
               A list of all the products in image, title, brand, category
             </p>
           </div>
         </div>

         <div className="mt-8 flow-root">
           <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-3 lg:-mx-3">
             <div className="inline-block min-w-full align-middle sm:px-6 lg:px-8">
               <table className="min-w-full divide-y divide-gray-300">
                 <thead>
                   <tr>
                     <th
                       scope="col"
                       className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                       Sl
                     </th>
                     <th
                       scope="col"
                       className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                       Image
                     </th>
                     <th
                       scope="col"
                       className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                       Title
                     </th>

                     <th
                       scope="col"
                       className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                       Category
                     </th>
                     <th
                       scope="col"
                       className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                       Brand
                     </th>
                     <th
                       scope="col"
                       className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                       Price
                     </th>
                     <th
                       scope="col"
                       className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                       Stock
                     </th>
                     <th
                       scope="col"
                       className=" py-3.5 text-right text-sm font-semibold text-gray-900">
                       Action
                     </th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-200 bg-white">
                   {data?.data?.map((item: Product, index: number) => (
                     <tr key={item._id}>
                       <td className="whitespace-nowrap  text-sm text-gray-500">
                         {index + 1}
                       </td>
                       <td className="whitespace-nowrap py-2   text-sm sm:pl-0">
                         <div className="flex items-center">
                           <div className="h-20 w-20 flex-shrink-0">
                             <img
                               className="h-20 w-20 rounded-full"
                               src={item.imageLink}
                               alt=""
                             />
                           </div>
                         </div>
                       </td>
                       <td className="whitespace-nowrap  text-sm text-gray-500">
                         <div className="text-gray-900">{item.title}</div>
                       </td>
                       <td className="whitespace-nowrap  text-sm text-gray-500">
                         <div className="text-gray-900">{item.category}</div>
                       </td>

                       <td className="whitespace-nowrap  text-sm text-gray-500">
                         <div className="text-gray-900">{item.brand}</div>
                       </td>
                       <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                         <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                           {item.price}$
                         </span>
                       </td>
                       <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                         {item.stock}
                       </td>
                       <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                         <Link to={"/"}>
                           <span>
                             <TrashIcon
                               className="h-5 w-5"
                               aria-hidden="true"
                             />
                           </span>
                         </Link>
                       </td>
                       <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                         <Link to="/">
                           <span className="">
                             <PencilSquareIcon
                               className="h-5 w-5"
                               aria-hidden="true"
                             />
                           </span>
                         </Link>
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
           </div>
         </div>
       </div>
     </div>
   </>
 );

}
