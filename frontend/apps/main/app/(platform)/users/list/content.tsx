"use client";

import { Breadcrumb, Button, Checkbox, Label, Modal, Table, TextInput } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";
import { useState } from "react";
import {
  HiChevronLeft,
  HiChevronRight,
  HiCog,
  HiDocumentDownload,
  HiDotsVertical,
  HiExclamationCircle,
  HiHome,
  HiOutlineExclamationCircle,
  HiPencilAlt,
  HiPlus,
  HiTrash,
} from "react-icons/hi";
import { twMerge } from "tailwind-merge";
import type { UsersListPageData } from "./page";

const UsersListPageContent: FC<UsersListPageData> = ({ usersList }) => (
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
            <Breadcrumb.Item href="/users/list">Users</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
          </Breadcrumb>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">All users</h1>
        </div>
        <div className="sm:flex">
          <div className="mb-3 hidden items-center dark:divide-gray-700 sm:mb-0 sm:flex sm:divide-x sm:divide-gray-100">
            <form className="lg:pr-3">
              <Label htmlFor="users-search" className="sr-only">
                Search
              </Label>
              <div className="relative mt-1 lg:w-64 xl:w-96">
                <TextInput id="users-search" name="users-search" placeholder="Search for users" />
              </div>
            </form>
            <div className="mt-3 flex space-x-1 pl-0 sm:mt-0 sm:pl-2">
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
          </div>
          <div className="ml-auto flex items-center space-x-2 sm:space-x-3">
            <AddUserModal />
            <Button className="p-0" color="gray">
              <div className="flex items-center gap-x-3">
                <HiDocumentDownload className="text-xl" />
                <span>Export</span>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
    <div className="flex flex-col">
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden shadow">
            <AllUsersTable usersList={usersList} />
          </div>
        </div>
      </div>
    </div>
    <Pagination usersList={usersList} />
  </>
);

const AddUserModal: FC = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <Button color="blue" className="p-0" onClick={() => setOpen(true)}>
        <div className="flex items-center gap-x-3">
          <HiPlus className="text-xl" />
          Add user
        </div>
      </Button>
      <Modal onClose={() => setOpen(false)} show={isOpen}>
        <Modal.Header>Add new user</Modal.Header>
        <Modal.Body>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="firstName">First Name</Label>
              <div>
                <TextInput id="firstName" name="firstName" placeholder="Bonnie" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="lastName">Last Name</Label>
              <div>
                <TextInput id="lastName" name="lastName" placeholder="Green" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <div>
                <TextInput id="email" name="email" placeholder="example@company.com" type="email" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div>
                <TextInput id="phone" name="phone" placeholder="e.g. +(12)3456 789" type="tel" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="department">Department</Label>
              <div>
                <TextInput id="department" name="department" placeholder="Development" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="company">Company</Label>
              <div>
                <TextInput id="company" name="company" placeholder="Somewhere" />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="blue" onClick={() => setOpen(false)}>
            Add user
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const AllUsersTable: FC<UsersListPageData> = ({ usersList }) => (
  <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
    <Table.Head
      className="bg-gray-100 dark:bg-gray-700"
      theme={{
        cell: {
          base: "p-4 text-left text-xs font-medium uppercase text-gray-500 dark:text-gray-400",
        },
      }}
    >
      <Table.HeadCell className="p-4">
        <Label htmlFor="select-all" className="sr-only">
          Select all
        </Label>
        <Checkbox id="select-all" name="select-all" />
      </Table.HeadCell>
      <Table.HeadCell>Name</Table.HeadCell>
      <Table.HeadCell>Position</Table.HeadCell>
      <Table.HeadCell>Country</Table.HeadCell>
      <Table.HeadCell>Status</Table.HeadCell>
      <Table.HeadCell />
    </Table.Head>
    <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
      {usersList.map((user) => (
        <Table.Row key={user.email} className="hover:bg-gray-100 dark:hover:bg-gray-700">
          <Table.Cell className="w-4 p-4">
            <Checkbox aria-describedby="checkbox-1" id="checkbox-1" />
          </Table.Cell>
          <Table.Cell className="mr-12 flex items-center space-x-6 whitespace-nowrap p-4 lg:mr-0">
            <Image alt="" height={40} src={user.avatar} width={40} className="rounded-full" />
            <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
              <div className="text-base font-semibold text-gray-900 dark:text-white">{user.name}</div>
              <div className="text-sm font-normal text-gray-500 dark:text-gray-400">{user.email}</div>
            </div>
          </Table.Cell>
          <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">{user.position}</Table.Cell>
          <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">{user.country}</Table.Cell>
          <Table.Cell className="whitespace-nowrap p-4 text-base font-normal text-gray-900 dark:text-white">
            <div className="flex items-center">
              <div className={twMerge("mr-2 h-2.5 w-2.5 rounded-full", user.status === "Active" ? "bg-green-400" : "bg-red-500")} />
              {user.status}
            </div>
          </Table.Cell>
          <Table.Cell>
            <div className="flex items-center gap-x-3 whitespace-nowrap">
              <EditUserModal />
              <DeleteUserModal />
            </div>
          </Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
);

const EditUserModal: FC = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <Button size="sm" color="blue" className="p-0" onClick={() => setOpen(true)}>
        <div className="flex items-center gap-x-2">
          <HiPencilAlt className="h-5 w-5" />
          Edit user
        </div>
      </Button>
      <Modal onClose={() => setOpen(false)} show={isOpen}>
        <Modal.Header>Edit user</Modal.Header>
        <Modal.Body>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="firstName">First Name</Label>
              <div>
                <TextInput id="firstName" name="firstName" placeholder="Bonnie" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="lastName">Last Name</Label>
              <div>
                <TextInput id="lastName" name="lastName" placeholder="Green" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <div>
                <TextInput id="email" name="email" placeholder="example@company.com" type="email" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div>
                <TextInput id="phone" name="phone" placeholder="e.g. +(12)3456 789" type="tel" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="department">Department</Label>
              <div>
                <TextInput id="department" name="department" placeholder="Development" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="company">Company</Label>
              <div>
                <TextInput id="company" name="company" placeholder="Somewhere" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="passwordCurrent">Current Password</Label>
              <div>
                <TextInput id="passwordCurrent" name="passwordCurrent" placeholder="••••••••" type="password" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="passwordNew">New Password</Label>
              <div>
                <TextInput id="passwordNew" name="passwordNew" placeholder="••••••••" type="password" />
              </div>
            </div>
          </div>
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

const DeleteUserModal: FC = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <Button size="sm" color="failure" className="p-0" onClick={() => setOpen(true)}>
        <div className="flex items-center gap-x-2">
          <HiTrash className="h-5 w-5" />
          Delete user
        </div>
      </Button>
      <Modal onClose={() => setOpen(false)} show={isOpen} size="md">
        <Modal.Header className="border-none p-2">
          <span className="sr-only">Delete user</span>
        </Modal.Header>
        <Modal.Body className="px-6 pb-6 pt-0">
          <div className="flex flex-col items-center gap-y-6 text-center">
            <HiOutlineExclamationCircle className="mx-auto h-20 w-20 text-red-600" />
            <p className="text-xl font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this user?</p>
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

const Pagination: FC<UsersListPageData> = ({ usersList }) => {
  const [page, setPage] = useState(0);
  const numEntriesPerPage = Math.min(20, usersList.length);
  const numPages = Math.floor(usersList.length / numEntriesPerPage);

  const previousPage = () => {
    setPage(page > 0 ? page - 1 : page);
  };

  const nextPage = () => {
    setPage(page < numPages - 1 ? page + 1 : page);
  };

  return (
    <div className="sticky bottom-0 right-0 w-full items-center border-t border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex sm:justify-between">
      <div className="mb-4 flex items-center sm:mb-0">
        {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
        <button
          onClick={previousPage}
          className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <span className="sr-only">Previous page</span>
          <HiChevronLeft className="h-7 w-7" />
        </button>
        {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
        <button
          onClick={nextPage}
          className="mr-2 inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <span className="sr-only">Next page</span>
          <HiChevronRight className="h-7 w-7" />
        </button>
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
          Showing&nbsp;
          <span className="font-semibold text-gray-900 dark:text-white">
            {page * usersList.length + 1}-{numEntriesPerPage * page + numEntriesPerPage}
          </span>
          &nbsp;of&nbsp;
          <span className="font-semibold text-gray-900 dark:text-white">{usersList.length}</span>
        </span>
      </div>
      <div className="flex items-center space-x-3">
        <Link
          href="#"
          className="inline-flex flex-1 items-center justify-center rounded-lg bg-primary-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          <HiChevronLeft className="-ml-1 mr-1 h-5 w-5" />
          Previous
        </Link>
        <Link
          href="#"
          className="inline-flex flex-1 items-center justify-center rounded-lg bg-primary-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          Next
          <HiChevronRight className="-mr-1 ml-1 h-5 w-5" />
        </Link>
      </div>
    </div>
  );
};

export default UsersListPageContent;
