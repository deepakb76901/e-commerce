import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  saveImageAsync,
  selectUserInfo,
  updateUserAsync,
} from "../Redux/slices/userSlice";
import { useForm } from "react-hook-form";
import { Button, FileInput } from "flowbite-react";

function Profile() {
  const dispatch = useDispatch();
  const user = useSelector(selectUserInfo);
  const [selectedEditIndex, setSelectedEditIndex] = useState(-1);
  const [showAddAddressForm, setShowAddAddressForm] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [imageUploadError, setImageUploadError] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(0);
  // const [imageUrl, setImageUrl] = useState("");
  // const [changeAvatar, setChangeAvatar] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const handleEdit = (addressUpdate, index) => {
    const newUser = { ...user, addresses: [...user.addresses] };
    newUser.addresses.splice(index, 1, addressUpdate);
    dispatch(updateUserAsync(newUser));
    setSelectedEditIndex(-1);
  };
  const handleRemove = (e, index) => {
    const newUser = { ...user, addresses: [...user.addresses] };
    newUser.addresses.splice(index, 1);
    dispatch(updateUserAsync(newUser));
  };
  const handleEditForm = (index) => {
    setSelectedEditIndex(index);
    const address = user.addresses[index];
    setValue("name", address.name);
    setValue("email", address.email);
    setValue("phone", address.phone);
    setValue("street", address.street);
    setValue("city", address.city);
    setValue("state", address.state);
    setValue("pincode", address.pincode);
  };
  const handleAdd = (address) => {
    const newUser = { ...user, addresses: [...user.addresses, address] };
    dispatch(updateUserAsync(newUser));
    setShowAddAddressForm(false);
  };

  const handleUploadImage = async () => {};

  return (
    <div className="flex justify-center min-h-screen">
      <div className="my-8 p-4 bg-gray-300 md:max-w-5xl w-full rounded-xl">
        <div className="flex flex-col sm:flex-row sm:justify-between">
          <div className="">
            <h2 className="text-3xl pt-3 pb-3 font-semibold bg-gray-300 pl-3">
              Name: {user.username ? user.username : "john doe"}
            </h2>
            <h3 className="text-red-900 pt-1 pb-1 font-semibold bg-gray-300 pl-3">
              Email Address: {user.email ? user.email : "johndoe@gmail.com"}
            </h3>
            {user.isAdmin && (
              <h3 className="text-red-900 pt-1 pb-3 font-semibold bg-gray-300 pl-3 text-xl">
                Admin
              </h3>
            )}
            {/* {changeAvatar && (
              <div className="flex flex-col sm:flex-row gap-3 my-3 ml-3">
                <FileInput
                  type="file"
                  accept="image/*"
                  id="avatar"
                  onChange={(e) => setAvatar(e.target.files[0])}
                  className="w-60"
                />
                <Button
                  color="blue"
                  size="sm"
                  className="w-40"
                  onClick={handleUploadImage}
                >
                  Upload Image
                </Button>
              </div>
            )} */}
          </div>
          {/* <div className="space-y-2 text-center ml-3">
            <img
              src={user.profilePicture}
              className="w-52 h-40 object-cover rounded-xl"
            />
            <Button
              color="success"
              className="w-40"
              size="sm"
              type="button"
              onClick={() => {
                changeAvatar ? setChangeAvatar(false) : setChangeAvatar(true);
              }}
            >
              {changeAvatar ? "Cancel" : "Change Avatar"}
            </Button>
          </div> */}
        </div>
        <div>
          {showAddAddressForm ? (
            <form
              className="bg-gray-300 p-5"
              noValidate
              onSubmit={handleSubmit((data) => {
                console.log(data);
                handleAdd(data);
                reset();
              })}
            >
              <div className="space-y-12">
                <div>
                  <div className="border-b border-gray-900/10 pb-12 lg:px-10">
                    <span className="text-xl underline font-semibold">
                      Enter Your Address Here
                    </span>
                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
                      <div className="sm:col-span-4">
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Name
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("name", {
                              required: "name is required",
                            })}
                            id="name"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-4">
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Email address
                        </label>
                        <div className="mt-2">
                          <input
                            id="email"
                            {...register("email", {
                              required: "email is required",
                            })}
                            type="email"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Phone Number
                        </label>
                        <div className="mt-2">
                          <input
                            id="phone"
                            type="number"
                            {...register("phone", {
                              required: "phone number is required",
                            })}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-600 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                          ></input>
                        </div>
                      </div>

                      <div className="col-span-full">
                        <label
                          htmlFor="street"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Street address
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("street", {
                              required: "street address is required",
                            })}
                            id="street"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2 sm:col-start-1">
                        <label
                          htmlFor="city"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          City
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("city", {
                              required: "city is required",
                            })}
                            id="city"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label
                          htmlFor="state"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          State
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("state", {
                              required: "state is required",
                            })}
                            id="state"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label
                          htmlFor="pincode"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Pincode
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("pincode", {
                              required: "pincode is required",
                            })}
                            id="pincode"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                        <div className="mt-6 pb-6 flex items-center justify-end gap-x-6">
                          <button
                            onClick={(e) => setShowAddAddressForm(false)}
                            type="button"
                            className="text-sm font-semibold leading-6  text-gray-900"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          >
                            Add Address
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          ) : (
            <Button
              onClick={(e) => {
                setShowAddAddressForm(true);
                setSelectedEditIndex(-1);
              }}
              type="submit"
              color="success"
              className="ml-3 mb-3"
              size={"sm"}
            >
              Add New Address
            </Button>
          )}
        </div>

        <div className="mt-8 p-4  border-t border-gray-700 px-4 py-6 sm:px-6">
          {user.addresses.map((address, index) => (
            <div key={index}>
              {selectedEditIndex === index ? (
                <form
                  className="bg-gray-300 p-5"
                  noValidate
                  onSubmit={handleSubmit((data, index) => {
                    console.log(data);
                    handleEdit(data, index);
                  })}
                >
                  <div className="space-y-12">
                    <div>
                      <div className="border-b border-gray-700 pb-12 lg:px-10">
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                          <div className="sm:col-span-4">
                            <label
                              htmlFor="name"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Name
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                {...register("name", {
                                  required: "name is required",
                                })}
                                id="name"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>

                          <div className="sm:col-span-4">
                            <label
                              htmlFor="email"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Email address
                            </label>
                            <div className="mt-2">
                              <input
                                id="email"
                                {...register("email", {
                                  required: "email is required",
                                })}
                                type="email"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>

                          <div className="sm:col-span-3">
                            <label
                              htmlFor="phone"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Phone Number
                            </label>
                            <div className="mt-2">
                              <input
                                id="phone"
                                type="number"
                                {...register("phone", {
                                  required: "phone number is required",
                                })}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-600 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                              ></input>
                            </div>
                          </div>

                          <div className="col-span-full">
                            <label
                              htmlFor="street"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Street address
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                {...register("street", {
                                  required: "street address is required",
                                })}
                                id="street"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>

                          <div className="sm:col-span-2 sm:col-start-1">
                            <label
                              htmlFor="city"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              City
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                {...register("city", {
                                  required: "city is required",
                                })}
                                id="city"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>

                          <div className="sm:col-span-2">
                            <label
                              htmlFor="state"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              State
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                {...register("state", {
                                  required: "state is required",
                                })}
                                id="state"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>

                          <div className="sm:col-span-2">
                            <label
                              htmlFor="pincode"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Pincode
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                {...register("pincode", {
                                  required: "pincode is required",
                                })}
                                id="pincode"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                            <div className="mt-6 pb-6 flex items-center justify-end gap-x-6">
                              <button
                                onClick={(e) => setSelectedEditIndex(-1)}
                                type="button"
                                className="text-sm font-semibold leading-6  text-gray-900"
                              >
                                Cancel
                              </button>
                              <button
                                type="submit"
                                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                              >
                                Edit Address
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              ) : null}
              <div className="flex justify-between gap-x-6 py-5 border-b  border-3 border-gray-900">
                <div className="flex min-w-0 gap-x-4  ">
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                      {address.name}
                    </p>
                    <p className="mt-1 truncate text-sm leading-5 text-gray-800">
                      {address.street}
                    </p>
                    <p className="text-sm leading-6  text-gray-900">
                      City: {address.city}
                    </p>
                    <p className="text-sm leading-6  text-gray-900">
                      phone: {address.phone}
                    </p>
                  </div>
                </div>
                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                  <button
                    onClick={(e) => handleEditForm(index)}
                    type="button"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => handleRemove(e, index)}
                    type="button"
                    className="font-medium text-red-600 hover:text-indigo-500"
                  >
                    Remove
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

export default Profile;
