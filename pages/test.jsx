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
} from "api"
import React, { useEffect, useState } from "react"

export default function index() {
  const signUp = async () => {
    const data = await signupApi({
      name: "adi31",
      email: "ida31@gmail.com",
      password: "password2121",
      phone: "0542223413",
    })
    console.log(data)
  }
  //   {
  //     "status": 200,
  //     "message": "signup success",
  //     "isSuccess": true,
  //     "data": ""
  // }

  const login = async () => {
    const data = await signinApi({
      email: "ida31@gmail.com",
      password: "password2121",
    })
    console.log(data)
  }
  //   {
  //     "status": 200,
  //     "message": "user logged in successfully",
  //     "isSuccess": true,
  //     "data": ""
  // }
  const getUserById = async () => {
    const data = await getUserByIdApi("108pUlpr2SPl7KqiCizMsJoW30A2")
    console.log(data)
  }
  //   {
  //     "phone": "0542223413",
  //     "name": "adi30",
  //     "email": "ida30@gmail.com",
  //     "groups_ids": []
  // }
  const createGroup = async (file) => {
    const data = await createGroupApi("group bset 199", file)
    console.log(data)
  }
  //   {
  //     "status": 200,
  //     "message": "group created",
  //     "isSuccess": true,
  //     "data": {
  //         "admin_id": "wepe3hcnrSZN96tN02BQOvSRmIz1",
  //         "expenses": [],
  //         "users_ids": [
  //             "wepe3hcnrSZN96tN02BQOvSRmIz1"
  //         ],
  //         "name": "group bset 122s",
  //         "imageUrl": "users/wepe3hcnrSZN96tN02BQOvSRmIz1/group/uEa9sWVIhHEvk4BIQMGH/me.png",
  //         "id": "uEa9sWVIhHEvk4BIQMGH"
  //     }
  // }
  const deleteGroup = async () => {
    const data = await deleteGroupApi("ztFnif1hkUSUcISQIKuX")
    console.log(data)
  }
  //   {
  //     "status": 200,
  //     "message": "Document with ID ${groupId} successfully deleted!",
  //     "isSuccess": true,
  //     "data": ""
  // }
  const addUserToGroup = async () => {
    const data = await addUserToGroupApi({
      userId: "32AX9v4gJLNSeLGd6nGdTrvMaEe2",
      groupId: "6SZL8Q0l4DzkOOtRbn3R",
    })
    console.log(data)
  }
  //   {
  //     "status": 200,
  //     "message": "User 32AX9v4gJLNSeLGd6nGdTrvMaEe2added successfully to Group 6SZL8Q0l4DzkOOtRbn3R",
  //     "isSuccess": true,
  //     "data": ""
  // }
  const addExpenseToGroup = async () => {
    const data = await addExpenseToGroupApi({
      groupId: "4sTlawgdH3f73blVR4bp",
      expenseName: "Arnona6",
      expenseAmount: 21,
    })
    console.log(data)
  }
  //   {
  //     "status": 200,
  //     "message": "Expense added successfully to Group 6SZL8Q0l4DzkOOtRbn3R",
  //     "isSuccess": true,
  //     "data": ""
  // }
  const findGroupById = async () => {
    const data = await findGroupByIdApi("6SZL8Q0l4DzkOOtRbn3R")
    console.log(data)
  }
  //   {
  //     "admin_id": "108pUlpr2SPl7KqiCizMsJoW30A2",
  //     "users_ids": [
  //         "108pUlpr2SPl7KqiCizMsJoW30A2",
  //         "32AX9v4gJLNSeLGd6nGdTrvMaEe2"
  //     ],
  //     "name": "group bset 122s",
  //     "expenses": [
  //         {
  //             "user_id": "108pUlpr2SPl7KqiCizMsJoW30A2",
  //             "name": "Arnona3",
  //             "amount": 22
  //         }
  //     ]
  // }
  const updateGroupName = async () => {
    const data = await updateGroupNameApi({
      groupId: "4sTlawgdH3f73blVR4bp",
      groupName: " group111",
    })
    console.log(data)
  }
  //   {
  //     "status": 200,
  //     "message": "group name has been updated",
  //     "isSuccess": true,
  //     "data": ""
  // }
  const getUsersOfGroup = async () => {
    const data = await getUsersOfGroupApi("6SZL8Q0l4DzkOOtRbn3R")
    console.log(data)
  }
  //   {
  //     "status": 200,
  //     "message": "groups fetch successfully ",
  //     "isSuccess": true,
  //     "data": [
  //         {
  //             "groups_ids": [
  //                 "6SZL8Q0l4DzkOOtRbn3R"
  //             ],
  //             "email": "ida30@gmail.com",
  //             "phone": "0542223413",
  //             "name": "adi30",
  //             "id": "108pUlpr2SPl7KqiCizMsJoW30A2"
  //         },
  //         {
  //             "phone": "0542223413",
  //             "email": "ida13@gmail.com",
  //             "groups_ids": [
  //                 "5Jf5gsVQCdneOHA1hmGG",
  //                 "eoJwqLC0zYvunLJF11zF",
  //                 "6SZL8Q0l4DzkOOtRbn3R"
  //             ],
  //             "name": "adi3",
  //             "id": "32AX9v4gJLNSeLGd6nGdTrvMaEe2"
  //         }
  //     ]
  // }
  return (
    <div
      className="w-full  h-[100vh] flex flex-col  justify-center items-center gap-10
    "
    >
      input
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
        <div>
          <div>create group</div>
          <AddFileInput createGroup={createGroup} />
        </div>
        {/* <button
          onClick={createGroup}
          className=" border-2 border-black rounded-xl bg-blue text=white px-6 py-4"
        >
          createGroup
        </button> */}
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
  )
}

const AddFileInput = ({ createGroup }) => {
  const [selectedFile, setSelectedFile] = useState(null)

  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0])
  }

  return (
    <div>
      <div>
        <input type="file" onChange={onFileChange} />
        <button
          className={`${
            selectedFile ? "bg-blue" : "bg-gray_dark"
          } border-2 border-black rounded-xl  text=white px-6 py-4`}
          onClick={() => createGroup(selectedFile)}
          disabled={!selectedFile}
        >
          create Group:
        </button>
      </div>
      <p>{selectedFile?.name}</p>
    </div>
  )
}
