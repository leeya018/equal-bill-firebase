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
  signinPhoneApi,
  updateUserApi,
} from "api"
import Image from "next/image"
import React, { useEffect, useState } from "react"

export default function index() {
  const [imageFromReq, setimageFromReq] = useState("")
  const signinPhone = async () => {
    const data = await signinPhoneApi("0542226958")
    console.log(data)
  }
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
    const data = await getUserByIdApi("O6U2dzYMocXW47AYPHPNz5kRiVP2")
    console.log(data)
  }
  //   {
  //     "name": "adi31",
  //     "id": "O6U2dzYMocXW47AYPHPNz5kRiVP2",
  //     "phone": "0542223413",
  //     "email": "ida31@gmail.com",
  //     "groups_ids": []
  // }
  const updateUser = async (file) => {
    const data = await updateUserApi({ userName: "new 22 ", file })
    console.log(data)
    setimageFromReq(data.data.imageUrl)
  }
  const createGroup = async (file) => {
    const data = await createGroupApi({ groupName: "group 132 new ", file })
    console.log(data)
    setimageFromReq(data.data.imageUrl)
  }
  //   {
  //     "status": 200,
  //     "message": "group created",
  //     "isSuccess": true,
  //     "data": {
  //         "users_ids": [
  //             "O6U2dzYMocXW47AYPHPNz5kRiVP2"
  //         ],
  //         "imageUrl": "https://firebasestorage.googleapis.com/v0/b/equal-bill.appspot.com/o/users%2FO6U2dzYMocXW47AYPHPNz5kRiVP2%2Fgroups%2FpBTcuSjxTIu6kipuCMwv%2FgroupImage.png?alt=media&token=ef33599b-e80f-4f2d-a117-925f0280ae5c",
  //         "name": "group 132 new ",
  //         "expenses": [],
  //         "id": "pBTcuSjxTIu6kipuCMwv",
  //         "admin_id": "O6U2dzYMocXW47AYPHPNz5kRiVP2"
  //     }
  // }
  const updateGroupName = async (file) => {
    const data = await updateGroupNameApi({
      groupId: "9smmJFrNaRxu1Ec8iqPa",
      groupName: " group111",
      file,
    })
    console.log(data)
    setimageFromReq(data.data.imageUrl)
  }
  //   {
  //     "status": 200,
  //     "message": "group name has been updated",
  //     "isSuccess": true,
  //     "data": {
  //         "imageUrl": "https://firebasestorage.googleapis.com/v0/b/equal-bill.appspot.com/o/users%2FO6U2dzYMocXW47AYPHPNz5kRiVP2%2Fgroups%2F9smmJFrNaRxu1Ec8iqPa%2FgroupImage.png?alt=media&token=d3e493fe-2676-469d-b755-22fed12d39f1"
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
      <Image
        alt="image data form firebase"
        width={100}
        height={100}
        className=""
        src={imageFromReq}
      />
      <div>
        <button
          onClick={signinPhone}
          className=" border-2 border-black rounded-xl bg-blue text=white px-6 py-4"
        >
          phone signin
        </button>
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
          <div>updateGroupName</div>
          <AddFileInput txt={"updateGroupName"} callback={updateGroupName} />
        </div>
        <div>
          <div>create group</div>
          <AddFileInput txt={"create group"} callback={createGroup} />
        </div>
        <div>
          <div>update user</div>
          <AddFileInput txt={"update user"} callback={updateUser} />
        </div>
        {/* <button
          onClick={updateGroupName}
          className=" border-2 border-black rounded-xl bg-blue text=white px-6 py-4"
        >
          updateGroupNameApi
        </button> */}
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
          onClick={getUsersOfGroup}
          className=" border-2 border-black rounded-xl bg-blue text=white px-6 py-4"
        >
          getUsersOfGroupApi
        </button>
      </div>
    </div>
  )
}

const AddFileInput = ({ callback, txt }) => {
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
          onClick={() => callback(selectedFile)}
          disabled={!selectedFile}
        >
          {txt}:
        </button>
      </div>
      <p>{selectedFile?.name}</p>
    </div>
  )
}
