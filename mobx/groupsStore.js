import { getMyGroupsApi } from "api";
import { makeAutoObservable, observable } from "mobx";

class Groups {
  myGroups = [];
  chosenGroup = null;

  constructor() {
    makeAutoObservable(this);
    this.getMyGroups = this.getMyGroups.bind(this);
    this.setChosenGroup = this.setChosenGroup.bind(this);
  }

  setChosenGroup = (group) => {
    this.chosenGroup = group;
  };

  getMyGroups = async () => {
    const data = await getMyGroupsApi();
    // this.myGroups = [...data];
  };
}

export const GroupsStore = new Groups();
