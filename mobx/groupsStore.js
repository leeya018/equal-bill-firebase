import {
  createGroupApi,
  deleteGroupApi,
  getMyGroupsApi,
  updateGroupNameApi,
} from "api";
import { auth } from "../firebase";
import { makeAutoObservable, observable, toJS } from "mobx";

class Groups {
  myGroups = [];
  chosenGroup = null;

  constructor() {
    makeAutoObservable(this);
  }

  setChosenGroup = (group) => {
    this.chosenGroup = group;
  };

  getMyGroups = async () => {
    const res = await getMyGroupsApi();
    console.log(res.data);
    this.myGroups = res.data;
  };
  updateGroupName = async ({ groupId, groupName }) => {
    const data = await updateGroupNameApi({ groupId, groupName });
    if (data.isSuccess) {
      const newGroups = this.myGroups.map((g) => {
        if (groupId === g.id) {
          return { ...g, name: groupName };
        }
        return g;
      });
      this.myGroups = [...newGroups];
      this.chosenGroup = null;
    }
    return data;
  };
  removeGroup = async (groupId) => {
    const data = await deleteGroupApi(groupId);
    if (data.isSuccess) {
      const newGroups = this.myGroups.filter((g) => {
        if (groupId !== g.id) {
          return g;
        }
      });
      this.myGroups = [...newGroups];
      this.chosenGroup = null;
      return data;
    }
  };
  createGroup = async (groupName) => {
    const data = await createGroupApi(groupName);
    if (data.isSuccess) {
      const uid = auth.currentUser.uid;

      const newGroup = {
        admin_id: uid,
        name: groupName,
        expenses: [],
        users_ids: [uid],
      };
      this.myGroups = [...this.myGroups, newGroup];
    }
    return data;
  };
}

export const GroupsStore = new Groups();
