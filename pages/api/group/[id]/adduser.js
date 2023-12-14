import { getResponse } from "@/util"
import cors from "cors"

import { db } from "@/firebase"
import { auth } from "firebase-admin"
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore"
import nc from "next-connect"
import { corsMiddleware } from "pages/api/validate"

const handler = nc({ attachParams: true })
handler.use(corsMiddleware)

handler.post(async (req, res) => {
  console.log(req.params, req.query)
  const groupId = req.query.id
  const userId = req.query.userId

  try {
    await addUserToGroupApi({ groupId, userId })
    return getResponse(
      "User " + userId + "added successfully to Group " + groupId
    ).SUCCESS
  } catch (error) {
    return res.status(500).send(error.message)
  }
})

export default handler

const addUserToGroupApi = async ({ groupId, userId }) => {
  const groupRef = doc(db, "groups", groupId) // Replace 'groups' with your actual collection name
  const docSnap = await getDoc(groupRef)

  if (!docSnap.exists()) {
    return getResponse("Group " + groupId + " does not exist").NOT_FOUND
  }

  const group = docSnap.data()

  if (group.admin_id !== userId) {
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
}
