import {
  createGroupApi,
  deleteGroupApi,
  getMyGroupsApi,
  updateGroupNameApi,
} from "api";
import { auth } from "../firebase";
import { makeAutoObservable, observable, toJS } from "mobx";
import { MessageStore } from "./messageStore";
import { ModalStore } from "./modalStore";
import { modals } from "@/util";
import { AsyncStore } from "./asyncStore";

class Groups {
  myGroups = [];
  chosenGroup = null;
  messageStore = null;
  modalStore = null;
  asyncStore = null;

  constructor() {
    makeAutoObservable(this);
    this.messageStore = MessageStore;
    this.modalStore = ModalStore;
    this.asyncStore = AsyncStore;
  }

  setChosenGroup = (group) => {
    this.chosenGroup = group;
  };

  getMyGroups = async () => {
    this.asyncStore.setIsLoading(true);

    const res = await getMyGroupsApi();
    console.log(res.data);
    this.myGroups = res.data;

    this.asyncStore.setIsLoading(false);
  };

  updateGroupName = async ({ groupId, groupName }) => {
    this.asyncStore.setIsLoading(true);
    console.log("updateGroupName");
    console.log(groupId, groupName);
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
      this.messageStore.setSuccess(data.message);
      this.modalStore.openModal(modals.success_message);
    } else {
      this.messageStore.setError(data.message);
    }
    this.asyncStore.setIsLoading(false);
  };

  removeGroup = async (groupId) => {
    console.log("removeGroup");
    this.asyncStore.setIsLoading(true);
    const data = await deleteGroupApi(groupId);
    console.log("remove", data);
    if (data.isSuccess) {
      const newGroups = this.myGroups.filter((g) => {
        if (groupId !== g.id) {
          return g;
        }
      });
      console.log("removeGroup", newGroups);
      this.myGroups = [...newGroups];
      this.chosenGroup = null;
      this.messageStore.setSuccess(data.message);
      this.modalStore.openModal(modals.success_message);
    } else {
      this.messageStore.setError(data.message);
    }
    this.asyncStore.setIsLoading(false);
  };

  createGroup = async (groupName) => {
    this.asyncStore.setIsLoading(true);
    const data = await createGroupApi(groupName);
    if (data.isSuccess) {
      console.log("new group created", data.data);
      this.messageStore.setSuccess(data.message);
      this.modalStore.openModal(modals.success_message);
      this.myGroups.push(data.data);
    } else {
      this.messageStore.setError(data.message);
    }
    this.asyncStore.setIsLoading(false);
  };
}

export const GroupsStore = new Groups();
