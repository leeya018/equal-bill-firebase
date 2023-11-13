import {
  addExpenseToGroupApi,
  addGroupApi,
  addUserToGroupApi,
  deleteGroupApi,
  findGroupByIdApi,
  getAllUsers,
  getUserByIdApi,
  createGroupApi,
  signupApi,
  updateGroupNameApi,
  signinApi,
  getUsersOfGroupApi,
} from "api";
import React, { useEffect } from "react";

export default function index() {
  const signUp = async () => {
    const data = await signupApi({
      name: "adi3",
      email: "ida13@gmail.com",
      password: "password2121",
      phone: "0542223413",
    });
    console.log(data);
  };

  const login = async () => {
    const data = await signinApi({
      email: "ida13@gmail.com",
      password: "password2121",
    });
    console.log(data);
  };
  const getUserById = async () => {
    const data = await getUserByIdApi("JFFdzbd6F7UDa0L57eMxHETZBW82");
    console.log(data);
  };

  const createGroup = async () => {
    const data = await createGroupApi("group bset 122s");
    console.log(data);
  };
  const deleteGroup = async () => {
    const data = await deleteGroupApi("njn6PZEE1BOpK66qUgaJ");
    console.log(data);
  };
  const addUserToGroup = async () => {
    const data = await addUserToGroupApi({
      userId: "32AX9v4gJLNSeLGd6nGdTrvMaEe2",
      groupId: "5Jf5gsVQCdneOHA1hmGG",
    });
    console.log(data);
  };
  const addExpenseToGroup = async () => {
    const data = await addExpenseToGroupApi({
      groupId: "njn6PZEE1BOpK66qUgaJ",
      expenseName: "Arnona3",
      expenseAmount: 21,
    });
    console.log(data);
  };
  const findGroupById = async () => {
    const data = await findGroupByIdApi("njn6PZEE1BOpK66qUgaJ");
    console.log(data);
  };
  const updateGroupName = async () => {
    const data = await updateGroupNameApi({
      groupId: "njn6PZEE1BOpK66qUgaJ",
      groupName: "sex group",
    });
    console.log(data);
  };
  const getUsersOfGroup = async () => {
    const data = await getUsersOfGroupApi("5Jf5gsVQCdneOHA1hmGG");
    console.log(data);
  };
  return (
    <div
      className="w-full  h-[100vh] flex flex-col  justify-center items-center gap-10
    "
    >
      <div className="font-bold text-xl">equal-bill-firebase</div>
      <div>
        <button
          onClick={signUp}
          className=" border-2 border-black rounded-xl bg-blue text=white px-6 py-4"
        >
          signup
        </button>
        <button
          onClick={login}
          className=" border-2 border-black rounded-xl bg-blue text=white px-6 py-4"
        >
          login
        </button>
        <button
          onClick={getUserById}
          className=" border-2 border-black rounded-xl bg-blue text=white px-6 py-4"
        >
          getUserById
        </button>
        <button
          onClick={createGroup}
          className=" border-2 border-black rounded-xl bg-blue text=white px-6 py-4"
        >
          createGroup
        </button>
        <button
          onClick={deleteGroup}
          className=" border-2 border-black rounded-xl bg-blue text=white px-6 py-4"
        >
          deleteGroup
        </button>
        <button
          onClick={addUserToGroup}
          className=" border-2 border-black rounded-xl bg-blue text=white px-6 py-4"
        >
          addUserToGroup
        </button>
        <button
          onClick={addExpenseToGroup}
          className=" border-2 border-black rounded-xl bg-blue text=white px-6 py-4"
        >
          addExpenseToGroup
        </button>
        <button
          onClick={findGroupById}
          className=" border-2 border-black rounded-xl bg-blue text=white px-6 py-4"
        >
          findGroupById
        </button>
        <button
          onClick={updateGroupName}
          className=" border-2 border-black rounded-xl bg-blue text=white px-6 py-4"
        >
          updateGroupNameApi
        </button>
        <button
          onClick={getUsersOfGroup}
          className=" border-2 border-black rounded-xl bg-blue text=white px-6 py-4"
        >
          getUsersOfGroupApi
        </button>
      </div>
    </div>
  );
}
