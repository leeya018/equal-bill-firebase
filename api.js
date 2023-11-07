import axios from "axios";
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
} from "firebase/firestore";
import { auth, db } from "./firebase";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";

const addUser = async (user) => {
  const userRef = doc(db, "users", user.id);
  if (!userRef) return;
  await setDoc(
    userRef,
    {
      user,
    },
    { merge: true }
  );
};

export const signupApi = (user) => {
  const { email, password, name, phone } = user;
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      console.log("user", user);
      const uid = user.uid;
      console.log(uid);
      const newUser = { email, name, id: uid, phone, groups_ids: [] };
      console.log("newUser", newUser);
      addUser(newUser);
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      throw getString(["signupApi", "error", errorCode, errorMessage]);
    });
};

export const loginApi = async ({ email, password }) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log("logged in user", user);
      return user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      throw getString(["login", "error", errorCode, errorMessage]);
    });
};

export const getUserByIdApi = async (userId) => {
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    return docSnap.data();
  } else {
    console.log("No such document!");
    return null;
  }
};

export const findGroupByIdApi = async (groupId) => {
  const groupRef = doc(db, "groups", groupId); // Replace 'groups' with your actual collection name

  try {
    const docSnap = await getDoc(groupRef);

    if (!docSnap.exists()) {
      throw new Error("Group " + groupId + " does not exist");
    }
    console.log("group data: ", docSnap.data());
    return docSnap.data();
  } catch (err) {
    throw err.message;
  }
};
export const openGroupApi = async ({ userId, groupName }) => {
  try {
    const groupId = userId + "_" + groupName;
    const group = await findGroupByIdApi(groupId);
    if (group !== null) {
      throw new Error("group name: " + groupName + " is already exists");
    }
    const groupRef = doc(db, "groups", userId + "_" + groupName);
    if (!groupRef) return;
    await setDoc(
      groupRef,
      {
        id: userId + "_" + groupName,
        admin_id: userId,
        name: groupName,
        expenses: [],
        users_ids: [],
      },
      { merge: true }
    );
    const userRef = doc(db, "users", userId); // Replace 'groups' with your actual collection name
    const docUserSnap = await getDoc(userRef);

    if (!docUserSnap.exists()) {
      throw new Error("User " + userId + " does not exist");
    }
    const user = await docUserSnap.data();
    console.log("user", user);
    const newGroupsIds = Array.from(
      new Set([...user.user.groups_ids, groupId])
    );

    await setDoc(
      userRef,
      {
        ...user,
        groups_ids: newGroupsIds,
      },
      { merge: true }
    );
    console.log("group created: " + groupName);
  } catch (error) {
    throw error.message;
  }
};

export const closeGroupApi = async (groupId) => {
  const groupRef = doc(db, "groups", groupId); // Replace 'groups' with your actual collection name

  try {
    const docSnap = await getDoc(groupRef);

    if (!docSnap.exists()) {
      throw new Error("Group " + groupId + " does not exist");
    }
    await deleteDoc(groupRef);
    console.log(`Document with ID ${groupId} successfully deleted!`);
  } catch (error) {
    console.error("Error removing document: ", error);
  }
};

export const addUserToGroupApi = async ({ groupId, userId }) => {
  try {
    const groupRef = doc(db, "groups", groupId); // Replace 'groups' with your actual collection name
    const docSnap = await getDoc(groupRef);

    if (!docSnap.exists()) {
      throw new Error("Group " + groupId + " does not exist");
    }

    const group = await docSnap.data();
    console.log("docSnap", group);
    const newUserIds = Array.from(new Set([...group.users_ids, userId]));
    await setDoc(
      groupRef,
      {
        ...group,
        users_ids: newUserIds,
      },
      { merge: true }
    );
    const userRef = doc(db, "users", userId); // Replace 'groups' with your actual collection name
    const docUserSnap = await getDoc(userRef);

    if (!docUserSnap.exists()) {
      throw new Error("User " + userId + " does not exist");
    }
    const user = await docUserSnap.data();
    console.log("user", user);
    const newGroupsIds = Array.from(
      new Set([...user.user.groups_ids, groupId])
    );

    await setDoc(
      userRef,
      {
        ...user,
        groups_ids: newGroupsIds,
      },
      { merge: true }
    );
    console.log("User " + userId + "added successfully to Group " + groupId);
  } catch (error) {
    throw error.message;
  }
};
export const addExpenseToGroupApi = async ({
  groupId,
  userId,
  expenseName,
  expenseAmount,
}) => {
  try {
    const groupRef = doc(db, "groups", groupId); // Replace 'groups' with your actual collection name
    const docSnap = await getDoc(groupRef);

    if (!docSnap.exists()) {
      throw new Error("Group " + groupId + " does not exist");
    }

    const group = await docSnap.data();
    console.log("docSnap", group);
    const newExpenses = Array.from(
      new Set([
        ...group.expenses,
        {
          user_id: userId,
          amount: expenseAmount,
          name: expenseName,
        },
      ])
    );
    await setDoc(
      groupRef,
      {
        ...group,
        expenses: newExpenses,
      },
      { merge: true }
    );
    console.log(
      "Expense " + expenseName + "added successfully to Group " + groupId
    );
  } catch (error) {
    throw error.message;
  }
};

export const updateGroupNameApi = async ({ groupId, userId, groupName }) => {
  try {
    const groupRef = doc(db, "groups", groupId); // Replace 'groups' with your actual collection name
    const docSnap = await getDoc(groupRef);

    if (!docSnap.exists()) {
      throw new Error("Group " + groupId + " does not exist");
    }

    const group = await docSnap.data();
    console.log("docSnap", group);

    await setDoc(
      groupRef,
      {
        ...group,
        name: groupName,
        id: userId + "-" + groupName,
      },
      { merge: true }
    );
    console.log("group name has been updated");
  } catch (error) {
    throw error.message;
  }
};
const getString = (dataArr) => {
  return dataArr.join(",");
};
