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
  addDoc,
  arrayRemove,
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
      ...user,
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
      const newUser = { email, name, phone, groups_ids: [] };
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
export const createGroupApi = async (groupName) => {
  try {
    console.log("uid", auth.currentUser.uid);
    const uid = auth.currentUser.uid;
    const groupRef = collection(db, "groups"); // Replace 'groups' with your actual collection name
    const q = query(
      groupRef,
      where("name", "==", groupName),
      where("admin_id", "==", uid)
    );

    const docSnap = await getDocs(q);
    if (!docSnap.empty) {
      throw new Error("Group " + groupName + " already not exist");
    }
    if (!groupRef) return;
    const groupDocRef = await addDoc(groupRef, {
      admin_id: uid,
      name: groupName,
      expenses: [],
      users_ids: [uid],
    });
    const userRef = doc(db, "users", uid); // Replace 'groups' with your actual collection name
    const docUserSnap = await getDoc(userRef);
    if (!docUserSnap.exists()) {
      throw new Error("User " + uid + " does not exist");
    }
    const user = await docUserSnap.data();
    console.log("user", user);

    await updateDoc(userRef, {
      groups_ids: arrayUnion(groupDocRef.id),
    });
    console.log("group created: " + groupName);
  } catch (error) {
    throw error.message;
  }
};

const deleteGroupIdFromUsers = async ({ userId, groupId }) => {
  // const user = await getUserByIdApi(userId);
  console.log("userId", userId);
  const userDocRef = doc(db, "users", userId); // Replace 'groups' with your actual collection name

  await updateDoc(userDocRef, {
    groups_ids: arrayRemove(groupId),
  });
};

export const deleteGroupApi = async (groupId) => {
  const uid = auth.currentUser.uid;

  try {
    const groupRef = doc(db, "groups", groupId); // Replace 'groups' with your actual collection name
    const docSnap = await getDoc(groupRef);

    if (!docSnap.exists()) {
      throw new Error("Group " + groupId + " does not exist");
    }
    const foundGroup = await docSnap.data();
    if (foundGroup.admin_id !== uid) {
      throw new Error("You don't have permission to delete this group");
    }
    const usersIds = foundGroup.users_ids;
    // delete groupId from all users
    const promises = usersIds.map((userId) =>
      deleteGroupIdFromUsers({ groupId, userId })
    );
    await Promise.all(promises);
    // delete group

    await deleteDoc(groupRef);

    console.log(`Document with ID ${groupId} successfully deleted!`);
  } catch (error) {
    console.error("Error removing document: ", error);
  }
};

export const addUserToGroupApi = async ({ groupId, userId }) => {
  const uid = auth.currentUser.uid;

  try {
    const groupRef = doc(db, "groups", groupId); // Replace 'groups' with your actual collection name
    const docSnap = await getDoc(groupRef);

    if (!docSnap.exists()) {
      throw new Error("Group " + groupId + " does not exist");
    }

    const group = await docSnap.data();
    console.log("group", group);
    console.log("uid", uid);
    console.log("admin_id", group.admin_id);
    if (group.admin_id !== uid) {
      throw new Error("You don't have permission to add to this group");
    }
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

    await updateDoc(userRef, {
      groups_ids: arrayUnion(groupId),
    });
    console.log("User " + userId + "added successfully to Group " + groupId);
  } catch (error) {
    throw error.message;
  }
};
export const addExpenseToGroupApi = async ({
  groupId,
  expenseName,
  expenseAmount,
}) => {
  try {
    const uid = auth.currentUser.uid;

    const groupRef = doc(db, "groups", groupId); // Replace 'groups' with your actual collection name
    const docSnap = await getDoc(groupRef);

    if (!docSnap.exists()) {
      throw new Error("Group " + groupId + " does not exist");
    }

    const group = await docSnap.data();
    console.log("docSnap", group);
    const newExpense = {
      user_id: uid,
      amount: expenseAmount,
      name: expenseName,
    };
    await setDoc(
      groupRef,
      {
        ...group,
        expenses: [...group.expenses, newExpense],
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

export const updateGroupNameApi = async ({ groupId, groupName }) => {
  try {
    const uid = auth.currentUser.uid;

    const groupRef = doc(db, "groups", groupId); // Replace 'groups' with your actual collection name
    const docSnap = await getDoc(groupRef);

    if (!docSnap.exists()) {
      throw new Error("Group " + groupId + " does not exist");
    }

    const group = await docSnap.data();
    console.log("docSnap", group);

    await updateDoc(groupRef, {
      ...group,
      name: groupName,
    });
    console.log("group name has been updated");
  } catch (error) {
    throw error.message;
  }
};
const getString = (dataArr) => {
  return dataArr.join(",");
};
