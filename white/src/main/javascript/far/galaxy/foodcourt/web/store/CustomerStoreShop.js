import {action, computed, observable} from "mobx";
import {
    getGroups,
} from "../api/CustomerAPI";
import React from "react";

export default class CustomerStoreShop {
    @observable groups = null;

    @action.bound
    pullGroups() {
        if (this.groups === null) {
            getGroups().then(this.setGroups);
        }
    }

    @action.bound
    setGroups(groups) {
        this.groups = groups;
    }

    customersByGroup(selectedGroup) {
        return computed(() => {
            if (this.groups && this.groups.length && selectedGroup && selectedGroup.getId) {
                const groups = this.groups.filter(group => group.getId() === selectedGroup.getId());
                if (groups && groups.length) {
                    return groups[0].getCustomers();
                }
            }
            return [];
        }).get()
    }
}
