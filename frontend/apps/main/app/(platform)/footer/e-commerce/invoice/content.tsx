"use client";

import { Breadcrumb, Label, Table, TextInput } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";
import { HiCog, HiDotsVertical, HiDownload, HiHome, HiPrinter } from "react-icons/hi";
import type { ECommerceInvoicePageData } from "./page";

const ECommerceInvoicePageContent: FC<ECommerceInvoicePageData> = ({ invoice }) => (
  <>
    <Menu />
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-full m-4 md:mx-6 md:mt-6 xl:mb-2">
        <Breadcrumb className="mb-5">
          <Breadcrumb.Item href="#">
            <div className="flex items-center gap-x-3">
              <HiHome className="text-xl" />
              <span className="dark:text-white">Home</span>
            </div>
          </Breadcrumb.Item>
          <Breadcrumb.Item href="/e-commerce/products">E-commerce</Breadcrumb.Item>
          <Breadcrumb.Item>Invoice</Breadcrumb.Item>
        </Breadcrumb>
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Invoice</h1>
      </div>
      <div className="col-span-12 mx-4 mb-4 rounded-lg bg-white p-4 shadow dark:bg-gray-800 sm:p-6 md:mx-6 lg:my-6 xl:col-span-10 xl:col-start-2 xl:p-8 2xl:col-span-8 2xl:col-start-3">
        <Invoice invoice={invoice} />
      </div>
    </div>
  </>
);

const Menu: FC = () => (
  <div className="block items-center justify-between border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex">
    <div className="mb-3 flex items-center dark:divide-gray-700 sm:mb-0 sm:divide-x sm:divide-gray-100">
      <form className="flex-auto lg:pr-3" action="#" method="GET">
        <Label htmlFor="invoice-search" className="sr-only">
          Search
        </Label>
        <div className="relative sm:w-64 md:w-96">
          <TextInput id="invoice-search" name="invoice-search" placeholder="Search for invoice number" type="search" />
        </div>
      </form>
      <div className="ml-auto flex space-x-1 pl-2">
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
          <span className="sr-only">Settings</span>
          <HiDotsVertical className="text-2xl" />
        </Link>
      </div>
    </div>
    <div className="items-center space-y-4 sm:inline-flex sm:space-x-4 sm:space-y-0">
      <div>
        <Link
          href="#"
          className="inline-flex w-full items-center justify-center gap-x-2 rounded-lg bg-primary-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 sm:w-auto"
        >
          <HiDownload className="text-2xl" />
          Download Invoice
        </Link>
      </div>
      <div>
        <Link
          href="#"
          className="inline-flex w-full items-center justify-center gap-x-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:ring-4 focus:ring-primary-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white sm:w-auto"
        >
          <HiPrinter className="text-2xl" />
          Print
        </Link>
      </div>
    </div>
  </div>
);

const Invoice: FC<ECommerceInvoicePageData> = ({ invoice }) => (
  <div className="space-y-6 overflow-hidden p-4 md:p-8">
    <div className="sm:flex">
      <div className="mb-5 text-2xl font-bold dark:text-white sm:mb-0 sm:text-3xl">Invoice #{invoice.id}</div>
      <div className="space-y-3 text-left sm:ml-auto sm:text-right">
        <Image alt="" height={40} src={invoice.issuer.logo} width={40} className="h-10 w-10 sm:ml-auto" />
        <div className="space-y-1">
          <div className="text-lg font-semibold text-gray-900 dark:text-white">{invoice.issuer.name}</div>
          <div className="text-sm font-normal text-gray-900 dark:text-white">{invoice.issuer.address}</div>
        </div>
        <div className="text-sm font-normal text-gray-500 dark:text-gray-400">{invoice.date}</div>
      </div>
    </div>
    <div className="sm:w-72">
      <div className="mb-4 text-base font-bold uppercase text-gray-900 dark:text-white">Bill to</div>
      <address className="text-base font-normal text-gray-500 dark:text-gray-400">
        {invoice.billTo.name}
        <br />
        {invoice.billTo.address}
        <br />
        {invoice.billTo.taxId}
      </address>
    </div>
    <div className="my-8 flex flex-col">
      <div className="overflow-x-auto border-b border-gray-200 dark:border-gray-600">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden shadow">
            <Table className="min-w-full text-gray-900">
              <Table.Head
                className="bg-gray-50 text-gray-900 dark:bg-gray-700 dark:text-white"
                theme={{
                  cell: {
                    base: "p-4 text-xs font-semibold tracking-wider text-left uppercase last-of-type:rounded-r-lg first-of-type:rounded-l-lg",
                  },
                }}
              >
                <Table.HeadCell>Item</Table.HeadCell>
                <Table.HeadCell>Price</Table.HeadCell>
                <Table.HeadCell>Qty</Table.HeadCell>
                <Table.HeadCell>Off</Table.HeadCell>
                <Table.HeadCell>Total</Table.HeadCell>
              </Table.Head>
              <Table.Body>
                {invoice.services.map((service) => (
                  <Table.Row key={service.item}>
                    <Table.Cell className="whitespace-nowrap p-4 text-sm font-normal">
                      <div className="text-base font-semibold text-gray-900 dark:text-white">{service.item}</div>
                      <div className="text-sm font-normal text-gray-500 dark:text-gray-400">{service.category}</div>
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap p-4 text-base font-normal text-gray-500 dark:text-gray-400">
                      ${service.price.toFixed(2)}
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap p-4 text-base font-semibold text-gray-900 dark:text-white">
                      {service.quantity}
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap p-4 text-base font-normal text-gray-900 dark:text-white">
                      {(1 - service.discount) * 100}%
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap p-4 text-base font-semibold text-gray-900 dark:text-white">
                      ${(service.price * service.discount).toFixed(2)}
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        </div>
      </div>
    </div>
    <div className="space-y-3 sm:ml-auto sm:w-72 sm:text-right">
      <div className="flex justify-between">
        <div className="text-sm font-medium uppercase text-gray-500 dark:text-gray-400">Subtotal</div>
        <div className="text-base font-medium text-gray-900 dark:text-white">${invoice.subtotal.toFixed(2)}</div>
      </div>
      <div className="flex justify-between">
        <div className="text-sm font-medium uppercase text-gray-500 dark:text-gray-400">Tax rate</div>
        <div className="text-base font-medium text-gray-900 dark:text-white">{invoice.taxRate * 100}%</div>
      </div>
      <div className="flex justify-between">
        <div className="text-sm font-medium uppercase text-gray-500 dark:text-gray-400">Discount</div>
        <div className="text-base font-medium text-gray-900 dark:text-white">${invoice.discount.toFixed(2)}</div>
      </div>
      <div className="flex justify-between">
        <div className="text-base font-semibold uppercase text-gray-900 dark:text-white">Total</div>
        <div className="text-base font-bold text-gray-900 dark:text-white">${invoice.total.toFixed(2)}</div>
      </div>
    </div>
  </div>
);

export default ECommerceInvoicePageContent;
