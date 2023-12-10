import axios from "axios"
import {
  doc,
  getDoc,
  getDocs,
  setDoc,
  collection,
  updateDoc,
  arrayUnion,
  query,
  where,
  deleteDoc,
  addDoc,
  documentId,
  arrayRemove,
} from "firebase/firestore"
import { auth, db } from "./firebase"
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth"
import { getResponse } from "./util"

const addUser = async (user, id) => {
  const userRef = doc(db, "users", id)
  if (!userRef) return
  await setDoc(
    userRef,
    {
      ...user,
    },
    { merge: true }
  )
}

export const signupApi = async (user) => {
  const { email, password, name, phone } = user
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
      phone
    )

    const uid = userCredential.user.uid

    const newUser = { email, name, phone, groups_ids: [] }

    await addUser(newUser, uid)

    return getResponse("signup success").SUCCESS
  } catch (error) {
    return getResponse(error.message).GENERAL_ERROR
  }
}
export const signinApi = async ({ email, password }) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    )
    const user = userCredential.user

    return getResponse("user logged in successfully").SUCCESS
  } catch (error) {
    return getResponse(error.message).GENERAL_ERROR
  }
}

export const getUserByIdApi = async (userId) => {
  try {
    const docRef = doc(db, "users", userId)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return docSnap.data()
    } else {
      return getResponse("user is not found").NOT_FOUND
    }
  } catch (error) {
    return getResponse(error.message).GENERAL_ERROR
  }
}

export const findGroupByIdApi = async (groupId) => {
  const groupRef = doc(db, "groups", groupId) // Replace 'groups' with your actual collection name

  try {
    const docSnap = await getDoc(groupRef)

    if (!docSnap.exists()) {
      return getResponse("Group " + groupId + " does not exist").NOT_FOUND
    }

    return docSnap.data()
  } catch (error) {
    return getResponse(error.message).GENERAL_ERROR
  }
}
export const createGroupApi = async (groupName) => {
  try {
    const uid = auth.currentUser.uid
    const groupRef = collection(db, "groups") // Replace 'groups' with your actual collection name
    const q = query(
      groupRef,
      where("name", "==", groupName),
      where("admin_id", "==", uid)
    )

    const docSnap = await getDocs(q)
    if (!docSnap.empty) {
      return getResponse("Group " + groupName + " does not exist").NOT_FOUND
    }

    const groupDocRef = await addDoc(groupRef, {
      admin_id: uid,
      name: groupName,
      expenses: [],
      users_ids: [uid],
    })
    const addedGroup = await getDoc(groupDocRef)
    const userRef = doc(db, "users", uid) // Replace 'groups' with your actual collection name

    await updateDoc(userRef, {
      groups_ids: arrayUnion(groupDocRef.id),
    })
    return getResponse("group created", {
      ...addedGroup.data(),
      id: groupDocRef.id,
    }).SUCCESS
  } catch (error) {
    return getResponse(error.message).GENERAL_ERROR
  }
}

const deleteGroupIdFromUsers = async ({ userId, groupId }) => {
  const userDocRef = doc(db, "users", userId) // Replace 'groups' with your actual collection name

  await updateDoc(userDocRef, {
    groups_ids: arrayRemove(groupId),
  })
}

export const deleteGroupApi = async (groupId) => {
  const uid = auth.currentUser.uid

  try {
    const groupRef = doc(db, "groups", groupId) // Replace 'groups' with your actual collection name
    const docSnap = await getDoc(groupRef)

    if (!docSnap.exists()) {
      return getResponse("Group " + groupId + " does not exist").NOT_FOUND
    }
    const foundGroup = docSnap.data()
    if (foundGroup.admin_id !== uid) {
      return getResponse("You don't have permission to delete this group")
        .PERMISSION
    }
    const usersIds = foundGroup.users_ids
    // delete groupId from all users
    const promises = usersIds.map((userId) =>
      deleteGroupIdFromUsers({ groupId, userId })
    )
    await Promise.all(promises)
    // delete group

    await deleteDoc(groupRef)

    return getResponse("Document with ID ${groupId} successfully deleted!")
      .SUCCESS
  } catch (error) {
    return getResponse(error.message).GENERAL_ERROR
  }
}

export const addUserToGroupApi = async ({ groupId, userId }) => {
  const uid = auth.currentUser.uid

  try {
    const groupRef = doc(db, "groups", groupId) // Replace 'groups' with your actual collection name
    const docSnap = await getDoc(groupRef)

    if (!docSnap.exists()) {
      return getResponse("Group " + groupId + " does not exist").NOT_FOUND
    }

    const group = docSnap.data()

    if (group.admin_id !== uid) {
      return getResponse("You don't have permission to add to this group")
        .PERMISSION
    }

    await setDoc(
      groupRef,
      {
        ...group,
        users_ids: arrayUnion(userId),
      },
      { merge: true }
    )
    const userRef = doc(db, "users", userId) // Replace 'groups' with your actual collection name
    const docUserSnap = await getDoc(userRef)

    if (!docUserSnap.exists()) {
      return getResponse("User " + userId + " does not exist").NOT_FOUND
    }
    const user = docUserSnap.data()

    await updateDoc(userRef, {
      groups_ids: arrayUnion(groupId),
    })

    return getResponse(
      "User " + userId + "added successfully to Group " + groupId
    ).SUCCESS
  } catch (error) {
    return getResponse(error.message).GENERAL_ERROR
  }
}
export const addExpenseToGroupApi = async ({
  groupId,
  expenseName,
  expenseAmount,
}) => {
  try {
    console.log(auth)
    const uid = auth.currentUser.uid

    const groupRef = doc(db, "groups", groupId) // Replace 'groups' with your actual collection name
    const docSnap = await getDoc(groupRef)

    if (!docSnap.exists()) {
      return getResponse("Group " + groupId + " does not exist").NOT_FOUND
    }

    const group = docSnap.data()

    const newExpense = {
      user_id: uid,
      amount: expenseAmount,
      name: expenseName,
    }
    await setDoc(
      groupRef,
      {
        ...group,
        expenses: [...group.expenses, newExpense],
      },
      { merge: true }
    )

    return getResponse(
      "Expense " + name + "added successfully to Group " + groupId
    ).SUCCESS
  } catch (error) {
    return getResponse(error.message).GENERAL_ERROR
  }
}

export const updateGroupNameApi = async ({ groupId, groupName }) => {
  console.log("updateGroupNameApi")
  try {
    const uid = auth.currentUser.uid

    const groupRef = doc(db, "groups", groupId) // Replace 'groups' with your actual collection name
    const docSnap = await getDoc(groupRef)

    if (!docSnap.exists()) {
      return getResponse("Group " + groupName + " does not exist").NOT_FOUND
    }
    const group = docSnap.data()

    if (group.admin_id !== uid) {
      return getResponse("You don't have permission to delete this group")
        .PERMISSION
    }

    await updateDoc(groupRef, {
      ...group,
      name: groupName,
    })

    return getResponse("group name has been updated").SUCCESS
  } catch (error) {
    return getResponse(error.message).GENERAL_ERROR
  }
}
export const getMyGroupsApi = async () => {
  console.log("getMyGroupsApi")
  try {
    const uid = auth.currentUser.uid

    const userRef = doc(db, "users", uid)
    const docSnap = await getDoc(userRef)
    const user = docSnap.data()
    console.log("user", user)
    console.log(user.groups_ids)

    const groups = await Promise.all(
      user.groups_ids.map(async (groupId) => {
        const groupRef = doc(db, "groups", groupId)
        const docSnap = await getDoc(groupRef)

        const group = docSnap.data()
        return { ...group, id: groupId }
      })
    )
    console.log(groups)

    return getResponse("groups fetch successfully ", groups).SUCCESS
  } catch (error) {
    console.log(error.message)
    return getResponse(error.message).GENERAL_ERROR
  }
}

export const getUsersOfGroupApi = async (groupId) => {
  try {
    console.log("getUsersOfGroupApi")
    const docRef = doc(db, "groups", groupId)
    const docSnap = await getDoc(docRef)
    const group = docSnap.data()

    const usersRef = collection(db, "users")

    const q = query(usersRef, where(documentId(), "in", group.users_ids))

    const querySnapshot = await getDocs(q)
    let users = []
    querySnapshot.forEach((doc) => {
      const user = {
        ...doc.data(),
        id: doc.id,
      }
      users.push(user)
    })
    console.log(users)
    return getResponse("groups fetch successfully ", users).SUCCESS
  } catch (error) {
    return getResponse(error.message).GENERAL_ERROR
  }
}

export const removeUserToGroupApi = async ({ groupId, userId }) => {
  const uid = auth.currentUser.uid

  try {
    const groupRef = doc(db, "groups", groupId) // Replace 'groups' with your actual collection name
    const docSnap = await getDoc(groupRef)

    if (!docSnap.exists()) {
      return getResponse("Group " + groupId + " does not exist").NOT_FOUND
    }

    const group = docSnap.data()

    if (group.admin_id !== uid) {
      return getResponse("You don't have permission to add to this group")
        .PERMISSION
    }

    await setDoc(
      groupRef,
      {
        ...group,
        users_ids: arrayRemove(userId),
      },
      { merge: true }
    )
    const userRef = doc(db, "users", userId) // Replace 'groups' with your actual collection name
    const docUserSnap = await getDoc(userRef)

    if (!docUserSnap.exists()) {
      return getResponse("User " + userId + " does not exist").NOT_FOUND
    }
    const user = docUserSnap.data()

    await updateDoc(userRef, {
      groups_ids: arrayRemove(groupId),
    })

    return getResponse(
      "User " + userId + "removed successfully from Group " + groupId
    ).SUCCESS
  } catch (error) {
    return getResponse(error.message).GENERAL_ERROR
  }
}
