"use client";

import { Breadcrumb, Button, Checkbox, Label, Modal, Table, Textarea, TextInput } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import {
  HiChevronLeft,
  HiChevronRight,
  HiCog,
  HiDotsVertical,
  HiExclamationCircle,
  HiHome,
  HiOutlineExclamationCircle,
  HiOutlineUpload,
  HiPencilAlt,
  HiTrash,
} from "react-icons/hi";
import type { ECommerceProductsPageData } from "./page";

const ECommerceProductsPageContent: FC<ECommerceProductsPageData> = ({ products }) => (
  <>
    <div className="block items-center justify-between border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex">
      <div className="mb-1 w-full">
        <div className="mb-4">
          <Breadcrumb className="mb-5">
            <Breadcrumb.Item href="#">
              <div className="flex items-center gap-x-3">
                <HiHome className="text-xl" />
                <span className="dark:text-white">Home</span>
              </div>
            </Breadcrumb.Item>
            <Breadcrumb.Item href="/e-commerce/products">E-commerce</Breadcrumb.Item>
            <Breadcrumb.Item>Products</Breadcrumb.Item>
          </Breadcrumb>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">All products</h1>
        </div>
        <div className="block items-center sm:flex">
          <SearchForProducts />
          <div className="hidden space-x-1 border-l border-gray-100 pl-2 dark:border-gray-700 md:flex">
            <Link
              href="#"
              className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span className="sr-only">Configure</span>
              <HiCog className="text-2xl" />
            </Link>
            <Link
              href="#"
              className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span className="sr-only">Delete</span>
              <HiTrash className="text-2xl" />
            </Link>
            <Link
              href="#"
              className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span className="sr-only">Purge</span>
              <HiExclamationCircle className="text-2xl" />
            </Link>
            <Link
              href="#"
              className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span className="sr-only">Settings</span>
              <HiDotsVertical className="text-2xl" />
            </Link>
          </div>
          <div className="flex w-full items-center sm:justify-end">
            <AddProductModal />
          </div>
        </div>
      </div>
    </div>
    <div className="flex flex-col">
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden shadow">
            <ProductsTable products={products} />
          </div>
        </div>
      </div>
    </div>
    <TableNavigation />
  </>
);

const SearchForProducts: FC = () => (
  <form className="mb-4 sm:mb-0 sm:pr-3" action="#" method="GET">
    <Label htmlFor="products-search" className="sr-only">
      Search
    </Label>
    <div className="relative mt-1 lg:w-64 xl:w-96">
      <TextInput id="products-search" name="products-search" placeholder="Search for products" />
    </div>
  </form>
);

const AddProductModal: FC = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <Button color="blue" onClick={() => setOpen(!isOpen)}>
        <FaPlus className="mr-3 text-sm" />
        Add product
      </Button>
      <Modal onClose={() => setOpen(false)} show={isOpen}>
        <Modal.Header className="border-b border-gray-200 dark:border-gray-700">Add product</Modal.Header>
        <Modal.Body>
          <form>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="productName">Product Name</Label>
                <TextInput id="productName" name="productName" placeholder='Apple iMac 27"' />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="category">Category</Label>
                <TextInput id="category" name="category" placeholder="Electronics" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="brand">Brand</Label>
                <TextInput id="brand" name="brand" placeholder="Apple" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="price">Price</Label>
                <TextInput id="price" name="price" type="number" placeholder="$2300" />
              </div>
              <div className="flex flex-col gap-2 sm:col-span-2">
                <Label htmlFor="producTable.Celletails">Product Details</Label>
                <Textarea
                  id="producTable.Celletails"
                  name="producTable.Celletails"
                  placeholder="e.g. 3.8GHz 8-core 10th-generation Intel Core i7 processor, Turbo Boost up to 5.0GHz, Ram 16 GB DDR4 2300Mhz"
                  rows={6}
                />
              </div>
            </div>
            <div className="mt-4 flex w-full items-center justify-center">
              <label className="flex h-32 w-full cursor-pointer flex-col rounded border-2 border-dashed border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-700">
                <div className="flex flex-col items-center justify-center pb-6 pt-5">
                  <HiOutlineUpload className="h-10 w-10 text-gray-400" />
                  <p className="py-1 text-sm text-gray-600 dark:text-gray-500">Upload a file or drag and drop</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, GIF up to 10MB</p>
                </div>
                <input type="file" className="hidden" />
              </label>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button color="blue" onClick={() => setOpen(false)}>
            Add product
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const EditProductModal: FC = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <Button size="sm" color="blue" onClick={() => setOpen(!isOpen)}>
        <HiPencilAlt className="mr-2 h-5 w-5" />
        Edit item
      </Button>
      <Modal onClose={() => setOpen(false)} show={isOpen}>
        <Modal.Header>Edit product</Modal.Header>
        <Modal.Body>
          <form>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="productName">Product Name</Label>
                <TextInput id="productName" name="productName" placeholder='Apple iMac 27"' />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="category">Category</Label>
                <TextInput id="category" name="category" placeholder="Electronics" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="brand">Brand</Label>
                <TextInput id="brand" name="brand" placeholder="Apple" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="price">Price</Label>
                <TextInput id="price" name="price" type="number" placeholder="$2300" />
              </div>
              <div className="flex flex-col gap-2 sm:col-span-2">
                <Label htmlFor="productDetails">Product Details</Label>
                <Textarea
                  id="productDetails"
                  name="productDetails"
                  placeholder="e.g. 3.8GHz 8-core 10th-generation Intel Core i7 processor, Turbo Boost up to 5.0GHz, Ram 16 GB DDR4 2300Mhz"
                  rows={6}
                />
              </div>
            </div>
            <div className="my-4 flex space-x-5">
              <div>
                <Image className="min-w-24 h-24 w-24" alt="Apple iMac 1" height={96} src="/images/products/apple-imac-1.png" width={96} />
                <Link href="#" className="cursor-pointer">
                  <span className="sr-only">Delete</span>
                  <HiTrash className="-mt-5 text-2xl text-red-600" />
                </Link>
              </div>
              <div>
                <Image className="min-w-24 h-24 w-24" alt="Apple iMac 2" height={96} src="/images/products/apple-imac-2.png" width={96} />
                <Link href="#" className="cursor-pointer">
                  <span className="sr-only">Delete</span>
                  <HiTrash className="-mt-5 text-2xl text-red-600" />
                </Link>
              </div>
              <div>
                <Image className="min-w-24 h-24 w-24" alt="Apple iMac 3" height={96} src="/images/products/apple-imac-3.png" width={96} />
                <Link href="#" className="cursor-pointer">
                  <span className="sr-only">Delete</span>
                  <HiTrash className="-mt-5 text-2xl text-red-600" />
                </Link>
              </div>
            </div>
            <div className="flex w-full items-center justify-center">
              <label className="flex h-32 w-full cursor-pointer flex-col rounded border-2 border-dashed border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-700">
                <div className="flex flex-col items-center justify-center pb-6 pt-5">
                  <HiOutlineUpload className="h-10 w-10 text-gray-400" />
                  <p className="py-1 text-sm text-gray-600 dark:text-gray-500">Upload a file or drag and drop</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, GIF up to 10MB</p>
                </div>
                <input type="file" className="hidden" />
              </label>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button color="blue" onClick={() => setOpen(false)}>
            Save all
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const DeleteProductModal: FC = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <Button size="sm" color="failure" className="!bg-red-700" onClick={() => setOpen(!isOpen)}>
        <HiTrash className="mr-2 h-5 w-5" />
        Delete item
      </Button>
      <Modal onClose={() => setOpen(false)} show={isOpen} size="md">
        <Modal.Header className="border-none p-2">
          <span className="sr-only">Delete product</span>
        </Modal.Header>
        <Modal.Body className="px-6 pb-6 pt-0">
          <div className="flex flex-col items-center gap-y-6 text-center">
            <HiOutlineExclamationCircle className="mx-auto h-20 w-20 text-red-600" />
            <p className="text-xl font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this product?</p>
            <div className="flex items-center gap-x-3">
              <Button color="failure" theme={{ base: "px-0" }} onClick={() => setOpen(false)}>
                <span className="text-base font-medium">Yes, I'm sure</span>
              </Button>
              <Button color="gray" theme={{ base: "px-0" }} onClick={() => setOpen(false)}>
                <span className="text-base font-medium">No, cancel</span>
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

const ProductsTable: FC<ECommerceProductsPageData> = ({ products }) => (
  <Table
    className="min-w-full divide-y divide-gray-200 dark:divide-gray-600"
    theme={{
      head: {
        base: "bg-gray-100 dark:bg-gray-700",
        cell: {
          base: "p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400",
        },
      },
      body: {
        cell: {
          base: "rounded-none",
        },
      },
    }}
  >
    <Table.Head className="bg-gray-100 dark:bg-gray-700">
      <Table.HeadCell>
        <span className="sr-only">Toggle selected</span>
        <Checkbox />
      </Table.HeadCell>
      <Table.HeadCell>Product Name</Table.HeadCell>
      <Table.HeadCell>Technology</Table.HeadCell>
      <Table.HeadCell>ID</Table.HeadCell>
      <Table.HeadCell>Price</Table.HeadCell>
      <Table.HeadCell>Actions</Table.HeadCell>
    </Table.Head>
    <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
      {products.map(({ id, name, category, technology, price }) => (
        <Table.Row key={id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
          <Table.Cell className="w-4 p-4">
            <Checkbox />
          </Table.Cell>
          <Table.Cell className="whitespace-nowrap p-4 text-sm font-normal text-gray-500 dark:text-gray-400">
            <div className="text-base font-semibold text-gray-900 dark:text-white">{name}</div>
            <div className="text-sm font-normal text-gray-500 dark:text-gray-400">{category}</div>
          </Table.Cell>
          <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">{technology}</Table.Cell>
          <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">#{id}</Table.Cell>
          <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">${price}</Table.Cell>
          <Table.Cell className="space-x-2 whitespace-nowrap p-4">
            <div className="flex items-center gap-x-3">
              <EditProductModal />
              <DeleteProductModal />
            </div>
          </Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
);

function TableNavigation() {
  return (
    <div className="sticky bottom-0 right-0 w-full items-center border-t border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex sm:justify-between">
      <div className="mb-4 flex items-center sm:mb-0">
        <a
          href="/"
          className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <HiChevronLeft className="h-7 w-7" />
        </a>
        <a
          href="/"
          className="mr-2 inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <HiChevronRight className="h-7 w-7" />
        </a>
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
          Showing <span className="font-semibold text-gray-900 dark:text-white">1-20</span> of{" "}
          <span className="font-semibold text-gray-900 dark:text-white">2290</span>
        </span>
      </div>
      <div className="flex items-center space-x-3">
        <Button color="blue" size="sm" href="#">
          <HiChevronLeft className="-ml-1 mr-1 h-5 w-5" />
          Previous
        </Button>
        <Button color="blue" size="sm" href="#">
          Next
          <HiChevronRight className="-mr-1 ml-1 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}

export default ECommerceProductsPageContent;
