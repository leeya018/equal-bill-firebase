import {
  addExpenseToGroupApi,
  addGroupApi,
  addUserToGroupApi,
  deleteGroupApi,
  findGroupByIdApi,
  getAllUsers,
  getUserByIdApi,
  loginApi,
  createGroupApi,
  signupApi,
  updateGroupNameApi,
} from "api";
import React, { useEffect } from "react";

export default function index() {
  const signUp = () => {
    signupApi({
      name: "adi",
      email: "adi12@gmail.com",
      password: "password2121",
      phone: "0542223113",
    });
  };

  const login = () => {
    loginApi({
      email: "adi12@gmail.com",
      password: "password2121",
    });
  };
  const getUserById = () => {
    getUserByIdApi("b0jXe1B40EXCtRBUV0dVUakkDdB2");
  };

  const createGroup = () => {
    createGroupApi("nwe one 7 ");
  };
  const deleteGroup = () => {
    deleteGroupApi("s9orxr9KzKDCMXZYzl3z");
  };
  const addUserToGroup = () => {
    addUserToGroupApi({
      userId: "EFTQ9RcLOceRHHuoVVcy7gywKTn1",
      groupId: "s9orxr9KzKDCMXZYzl3z",
    });
  };
  const addExpenseToGroup = () => {
    addExpenseToGroupApi({
      groupId: "s9orxr9KzKDCMXZYzl3z",
      expenseName: "Arnona",
      expenseAmount: 220,
    });
  };
  const findGroupById = () => {
    findGroupByIdApi("9fo2IXkfiyOzhr7QyOPU48nYjfJ2_best group");
  };
  const updateGroupName = () => {
    updateGroupNameApi({
      groupId: "s9orxr9KzKDCMXZYzl3z",
      groupName: "new sex",
    });
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
          className=" border-2 border-black rounded-md bg-blue text=white px-6 py-4"
        >
          signup
        </button>
        <button
          onClick={login}
          className=" border-2 border-black rounded-md bg-blue text=white px-6 py-4"
        >
          login
        </button>
        <button
          onClick={getUserById}
          className=" border-2 border-black rounded-md bg-blue text=white px-6 py-4"
        >
          getUserById
        </button>
        <button
          onClick={createGroup}
          className=" border-2 border-black rounded-md bg-blue text=white px-6 py-4"
        >
          createGroup
        </button>
        <button
          onClick={deleteGroup}
          className=" border-2 border-black rounded-md bg-blue text=white px-6 py-4"
        >
          deleteGroup
        </button>
        <button
          onClick={addUserToGroup}
          className=" border-2 border-black rounded-md bg-blue text=white px-6 py-4"
        >
          addUserToGroup
        </button>
        <button
          onClick={addExpenseToGroup}
          className=" border-2 border-black rounded-md bg-blue text=white px-6 py-4"
        >
          addExpenseToGroup
        </button>
        <button
          onClick={findGroupById}
          className=" border-2 border-black rounded-md bg-blue text=white px-6 py-4"
        >
          findGroupById
        </button>
        <button
          onClick={updateGroupName}
          className=" border-2 border-black rounded-md bg-blue text=white px-6 py-4"
        >
          updateGroupNameApi
        </button>
      </div>
    </div>
  );
}
