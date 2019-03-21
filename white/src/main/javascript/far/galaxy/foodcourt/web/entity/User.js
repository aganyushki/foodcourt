
export default class User {

    constructor(value) {
        this.value = value;
    }

    getId() {
        return this.value.id;
    }

    getName() {
        return this.value.name;
    }

    getAuthToken() {
        return this.value.authToken;
    }

    getRolesAsString() {
        return this.value.roles.map(role => role.name).join(",");
    }
}
