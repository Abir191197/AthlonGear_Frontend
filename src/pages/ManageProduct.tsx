import { ScrollRestoration } from "react-router-dom";
import Navbar from "./Navbar";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
  useSendProductDetailsMutation,
  useUpdateProductMutation,
} from "../redux/api/baseApi";
import { PencilSquareIcon } from "@heroicons/react/20/solid";
import { TrashIcon } from "@heroicons/react/24/outline";
import { SyncLoader } from "react-spinners";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import ConfirmationModal from "../components/ConfirmationModal";

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

// Define the categories
const categories = [
  "Fitness Equipment",
  "Sports Apparel",
  "Footwear",
  "Outdoor Gear",
  "Cycling",
  "Running",
  "Swimming",
  "Team Sports",
  "Racket Sports",
  "Combat Sports",
  "Yoga & Pilates",
  "Winter Sports",
  "Golf",
  "Tennis",
  "Basketball",
  "Football",
  "Baseball",
  "Hockey",
  "Skateboarding",
  "Surfing",
  "Climbing",
  "Water Sports",
  "Track & Field",
];

export default function ManageProduct() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState<string | null>(
    null
  );
  const [editProduct, setEditProduct] = useState<Product | null>(null);

  const { register, handleSubmit, reset, setValue } = useForm<Product>();
  const { data, isLoading: isFetchingProducts } =
    useGetProductsQuery(undefined);
  const [sendProductData, { isLoading: isSendingProduct }] =
    useSendProductDetailsMutation();
  const [deleteProduct, { isLoading: DeleteLoading }] =
    useDeleteProductMutation();
  const [updateProduct, { isLoading: isUpdatingProduct }] =
    useUpdateProductMutation();
  
useEffect(() => {
  window.scrollTo({ top: 0, behavior: "smooth" });
}, []);
  useEffect(() => {
    if (editProduct) {
      setValue("title", editProduct.title);
      setValue("description", editProduct.description);
      setValue("category", editProduct.category);
      setValue("brand", editProduct.brand);
      setValue("price", editProduct.price);
      setValue("imageLink", editProduct.imageLink);
      setValue("stock", editProduct.stock);
    } else {
      reset();
    }
  }, [editProduct, setValue, reset]);

  const handleUpdate = async (
    productId: string,
    updatedFields: Partial<Product>
  ) => {
    try {
     

      await updateProduct({ id: productId, updates: updatedFields }).unwrap();
      toast.success("Product updated successfully!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    });
      setEditProduct(null);
      reset();
    } catch (error) {
      toast.error(`Failed to update product: ${error}`);
    }
  };

  const handleDelete = async () => {
    if (productIdToDelete) {
      try {
        await deleteProduct(productIdToDelete).unwrap();
         toast.success("Product deleted successfully!", {
           position: "top-center",
           autoClose: 3000,
           hideProgressBar: false,
           closeOnClick: true,
           pauseOnHover: true,
           draggable: true,
           theme: "light",
         });
        closeModal();
      } catch (error) {
        toast.error("Failed to delete product");
      }
    }
  };

  const onSubmit: SubmitHandler<Product> = async (productForm) => {
    const updatedProductForm = {
      ...productForm,
      price: Number(productForm.price),
      stock: Number(productForm.stock),
    };

    try {
      if (editProduct) {
        await handleUpdate(editProduct._id, updatedProductForm);
      } else {
        await sendProductData(updatedProductForm).unwrap();
         toast.success("Product created successfully!", {
           position: "top-center",
           autoClose: 3000,
           hideProgressBar: false,
           closeOnClick: true,
           pauseOnHover: true,
           draggable: true,
           theme: "light",
         });
      }
    } catch (error) {
      toast.error(
        `Failed to ${editProduct ? "update" : "create"} product: ${error}`
      );
    }
    reset();
    setEditProduct(null); // Reset edit mode to ensure "Add Product" is shown after form submission
  };

  const openModal = (id: string) => {
    setProductIdToDelete(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setProductIdToDelete(null);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setEditProduct(null); // Reset edit mode when cancel is clicked
    reset(); // Reset the form fields
  };

  if (
    isFetchingProducts ||
    isSendingProduct ||
    DeleteLoading ||
    isUpdatingProduct
  ) {
    return (
      <div className="flex justify-center items-center h-screen">
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
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
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
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
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
                  htmlFor="imageLink"
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

            <div className="mt-4 flex space-x-4">
              <button
                type="submit"
                className="bg-indigo-600 px-3 py-1.5 text-white text-sm font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                disabled={isSendingProduct || isUpdatingProduct}>
                {editProduct ? "Update Product" : "Add Product"}
              </button>

              {editProduct && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-gray-300 px-3 py-1.5 text-black text-sm font-semibold rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500">
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="w-full bg-white shadow-sm rounded-xl m-2 p-4">
          <div className="text-center">
            <h1 className="text-2xl font-semibold leading-6 text-gray-900">
              All Products
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all the products including image, title, brand,
              category, and more.
            </p>
          </div>

          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-3 lg:-mx-3">
              <div className="inline-block min-w-full align-middle sm:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="py-3 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-4">
                        Sl
                      </th>
                      <th
                        scope="col"
                        className="py-3 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-4">
                        Image
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3 text-center text-sm font-semibold text-gray-900">
                        Title
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3 text-left text-sm font-semibold text-gray-900">
                        Brand
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3 text-left text-sm font-semibold text-gray-900">
                        Category
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3 text-left text-sm font-semibold text-gray-900">
                        Price
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3 text-left text-sm font-semibold text-gray-900">
                        Stock
                      </th>
                      <th
                        scope="col"
                        className="relative py-3 pl-3 pr-4 sm:pr-4">
                        <span className="sr-only">Edit</span>
                      </th>
                      <th
                        scope="col"
                        className="relative py-3 pl-3 pr-4 sm:pr-4">
                        <span className="sr-only">Delete</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {data?.data?.map((item: Product, index: number) => (
                      <tr key={item._id}>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                          {index + 1}
                        </td>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-4">
                          <img
                            src={item.imageLink}
                            alt={item.title}
                            className="h-16 w-16 object-cover rounded-full"
                          />
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900 text-center">
                          {item.title}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                          {item.brand}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                          {item.category}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                          ${item.price.toFixed(2)}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                          {item.stock}
                        </td>
                        <td className="relative whitespace-nowrap text-right text-sm font-medium sm:pl-4">
                          <button
                            onClick={() => {
                              window.scrollTo({ top: 0, behavior: "smooth" });
                              setEditProduct(item);
                            }}
                            className="text-blue-600 hover:text-blue-800">
                            <PencilSquareIcon
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          </button>
                        </td>
                        <td className="relative whitespace-nowrap text-right text-sm font-medium sm:pl-4">
                          <button
                            onClick={() => openModal(item._id)}
                            className="text-red-600 hover:text-red-800">
                            <TrashIcon className="h-5 w-5" aria-hidden="true" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <ConfirmationModal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          onConfirm={handleDelete}
        />
      </div>
    </>
  );
}
