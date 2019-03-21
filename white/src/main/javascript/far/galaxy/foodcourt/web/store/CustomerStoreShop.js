import {action, computed, observable} from "mobx";
import {
    getGroups,
} from "../api/CustomerAPI";
import React from "react";

export default class CustomerStoreShop {
    @observable groups = null;

    scope = null;

    constructor(scope) {
        this.scope = scope;
    }

    @action.bound
    pullGroups() {
        getGroups()
            .then(this.setGroups)
            .catch(this.pullGroupsFails)
    }

    @action.bound
    setGroups(groups) {
        this.groups = groups;
    }

    @action.bound
    pullGroupsFails(error) {
        this.scope.systemStore.setGlobalErrorNotification(error.message);
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
