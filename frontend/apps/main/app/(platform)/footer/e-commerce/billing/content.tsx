"use client";

import { formatToUSD } from "../../../../../helpers/format-number";
import { Badge, Breadcrumb, Button, Card, Label, Table, Textarea, TextInput } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";
import { HiDocumentText, HiHome } from "react-icons/hi";
import type { ECommerceBillingPageData } from "./page";

const ECommerceBillingPageContent: FC<ECommerceBillingPageData> = ({ nextPayment, orderHistory }) => (
  <>
    <div className="mb-4 grid grid-cols-1 gap-y-6 px-4 pt-6 dark:border-gray-700 dark:bg-gray-900 xl:grid-cols-2 xl:gap-4">
      <div className="col-span-full xl:mb-2">
        <Breadcrumb className="mb-5">
          <Breadcrumb.Item href="#">
            <div className="flex items-center gap-x-3">
              <HiHome className="text-xl" />
              <span className="dark:text-white">Home</span>
            </div>
          </Breadcrumb.Item>
          <Breadcrumb.Item href="/e-commerce/products">E-commerce</Breadcrumb.Item>
          <Breadcrumb.Item>Billing</Breadcrumb.Item>
        </Breadcrumb>
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Billing</h1>
      </div>
      <IntroCard nextPayment={nextPayment} />
      <OrderHistoryCard orderHistory={orderHistory} />
    </div>
    <div className="grid grid-cols-1 gap-y-4 px-4">
      <GeneralInfoCard />
      <CardDetailsCard />
    </div>
  </>
);

const IntroCard: FC<Pick<ECommerceBillingPageData, "nextPayment">> = ({ nextPayment }) => (
  <Card>
    <Link href="#" className="mb-6 inline-flex items-center text-2xl font-bold dark:text-white">
      <Image alt="" width={43} height={44} src={nextPayment.logo} className="mr-4 h-11" />
      <span>{nextPayment.service}</span>
    </Link>
    <p className="mb-2 text-base font-normal text-gray-500 dark:text-gray-400">{nextPayment.serviceDescription}</p>
    <p className="text-sm font-semibold text-gray-900 dark:text-white">
      Next payment of ${nextPayment.amount} ({nextPayment.interval}) occurs on&nbsp;
      {nextPayment.date}.
    </p>
    <div className="mt-6 space-y-4 sm:flex sm:space-x-3 sm:space-y-0">
      <div>
        <Link
          href="#"
          className="inline-flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 sm:w-auto"
        >
          <HiDocumentText className="-ml-1 mr-2 h-5 w-5" />
          Change Plan
        </Link>
      </div>
      <div>
        <Link
          href="#"
          className="inline-flex w-full items-center justify-center rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:ring-4 focus:ring-primary-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 sm:w-auto"
        >
          Cancel Subscription
        </Link>
      </div>
    </div>
  </Card>
);

const OrderHistoryCard: FC<Pick<ECommerceBillingPageData, "orderHistory">> = ({ orderHistory }) => (
  <Card>
    <div className="mb-4 flex items-center justify-between">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white">Order History</h3>
      <div className="shrink-0">
        <Link
          href="#"
          className="rounded-lg p-2 text-sm font-medium text-primary-700 hover:bg-gray-100 dark:text-primary-500 dark:hover:bg-gray-700"
        >
          View all
        </Link>
      </div>
    </div>
    <div className="flex flex-col">
      <div className="overflow-x-auto rounded-lg">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden shadow sm:rounded-lg">
            <Table striped>
              <Table.Head
                className="bg-gray-50 dark:bg-gray-700"
                theme={{
                  cell: {
                    base: "p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400",
                  },
                }}
              >
                <Table.HeadCell>Transaction</Table.HeadCell>
                <Table.HeadCell>Date &amp; Time</Table.HeadCell>
                <Table.HeadCell>Amount</Table.HeadCell>
                <Table.HeadCell>Status</Table.HeadCell>
              </Table.Head>
              <Table.Body>
                {orderHistory.map(({ transaction, time, amount, status }) => (
                  <Table.Row key={`${transaction}-${time}`}>
                    <Table.Cell className="whitespace-nowrap p-4 text-sm font-normal text-gray-900 dark:text-white">
                      {transaction}
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap p-4 text-sm font-normal text-gray-500 dark:text-gray-400">{time}</Table.Cell>
                    <Table.Cell className="whitespace-nowrap p-4 text-sm font-semibold text-gray-900 dark:text-white">
                      {formatToUSD(amount)}
                    </Table.Cell>
                    <Table.Cell className="flex whitespace-nowrap p-4">
                      <Badge className="rounded-md font-medium" color={status === "Completed" ? "success" : "failure"}>
                        {status}
                      </Badge>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        </div>
      </div>
    </div>
  </Card>
);

const GeneralInfoCard: FC = () => (
  <Card>
    <h3 className="mb-4 text-xl font-bold dark:text-white">General Information</h3>
    <form>
      <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="col-span-1 grid grid-cols-1 gap-y-4">
          <div className="grid grid-cols-1 gap-y-2">
            <Label htmlFor="first-name">First Name</Label>
            <TextInput id="first-name" name="first-name" placeholder="Bonnie" required />
          </div>
          <div className="grid grid-cols-1 gap-y-2">
            <Label htmlFor="organization">Organization</Label>
            <TextInput id="organization" name="organization" placeholder="Company Name" required />
          </div>
          <div className="grid grid-cols-1 gap-y-2">
            <Label htmlFor="department">Department</Label>
            <TextInput id="department" name="department" placeholder="Development" required />
          </div>
          <div className="grid grid-cols-1 gap-y-2">
            <Label htmlFor="city">City</Label>
            <TextInput id="city" name="city" placeholder="e.g. San Francisco" required />
          </div>
        </div>
        <div className="col-span-1 grid grid-cols-1 gap-y-4">
          <div className="grid grid-cols-1 gap-y-2">
            <Label htmlFor="last-name">Last Name</Label>
            <TextInput id="last-name" name="last-name" placeholder="Green" required />
          </div>
          <div className="grid grid-cols-1 gap-y-2">
            <Label htmlFor="role">Role</Label>
            <TextInput id="role" name="role" placeholder="React Developer" required />
          </div>
          <div className="grid grid-cols-1 gap-y-2">
            <Label htmlFor="country">Country</Label>
            <TextInput id="country" name="country" placeholder="United States" required />
          </div>
          <div className="grid grid-cols-1 gap-y-2">
            <Label htmlFor="email">Email</Label>
            <TextInput id="email" name="email" placeholder="example@company.com" required />
          </div>
        </div>
        <div className="col-span-1 flex flex-col gap-y-2">
          <Label htmlFor="info">Info</Label>
          <Textarea id="info" name="info" placeholder="Receipt Info (optional)" rows={12} className="h-full" />
        </div>
      </div>
      <Button color="blue" type="submit">
        Update
      </Button>
    </form>
  </Card>
);

const CardDetailsCard: FC = () => (
  <Card>
    <h3 className="mb-4 text-xl font-bold dark:text-white">Card Details</h3>
    <form>
      <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="grid grid-cols-1 gap-y-2">
          <Label htmlFor="full-name">(Full name as displayed on card)*</Label>
          <TextInput id="full-name" name="full-name" placeholder="Enter your name" required />
        </div>
        <div className="grid grid-cols-1 gap-y-2">
          <Label htmlFor="card-number">Card Number *</Label>
          <TextInput id="card-number" name="card-number" placeholder="xxxx-xxxx-xxxx-xxxx" required />
        </div>
        <div className="grid grid-cols-1 gap-y-2">
          <Label htmlFor="cvc">CVC *</Label>
          <TextInput id="cvc" name="cvc" placeholder="•••" required />
        </div>
        <div className="grid grid-cols-1 gap-y-2">
          <Label htmlFor="zip">Postal / ZIP code (optional)</Label>
          <TextInput id="zip" name="zip" placeholder="e.g. 12345" required />
        </div>
      </div>
      <Button color="blue">Update</Button>
    </form>
  </Card>
);

export default ECommerceBillingPageContent;
