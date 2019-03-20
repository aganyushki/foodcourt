import {observable, action, computed} from "mobx";

export default class DataViewTableBaseStore {
    @observable search = '';
    @observable pageableData = null;
    @observable fields = [];
    @observable pages = {
        pageSize: 10,
        availablePageSizes: [5, 10, 15, 20, 100]
    };
    @observable pullingPageableData = true;

    getPageableFromServer = null;
    scope = null;
    rowOnClick = null;
    showSearch = false;

    constructor({getPageableFromServer, fieldsDescription, scope, rowTransformer, rowOnClick, search}) {
        this.rowTransformer = rowTransformer || (row => row);
        this.fields = fieldsDescription;
        this.getPageableFromServer = getPageableFromServer || (() => Promise.resolve());
        this.scope = scope;
        this.rowOnClick = rowOnClick || (() => {});
        this.showSearch = search || false;
    }

    @action.bound
    setSearch(value) {
        this.search = value;
        this.pullData(); // todo, debounce?
    }

    @action.bound
    clearSearch() {
        this.search = '';
        this.pullData();
    }

    @action.bound
    reload() {
        this.pullData();
    }

    @action.bound
    setPullingPageableDataStatus(status) {
        if (this.pageableData !== null) {
            this.pullingPageableData = status;
            this.scope.systemStore.setGlobalProcessingStatus(status);
        }
    }

    @action.bound
    pullData() {
        this.setPullingPageableDataStatus(true);
        return this.getPageableFromServer(this.currentPage, this.pages.pageSize, this.search)
            .then(data => {
                this.setPageableData(data);
                this.setPullingPageableDataStatus(false);
                return data;
            });
    }

    @computed
    get currentPage() {
        return (this.pageableData && this.pageableData.pageable.pageNumber) || 0;
    }

    @action.bound
    setPageSize(pageSize) {
        this.pages = {
            ...this.pages,
            pageSize
        };
        this.pullData();
    }

    @action.bound
    setNextPage(nextPage) {
        this.setPullingPageableDataStatus(true);
        return this.getPageableFromServer(nextPage, this.pages.pageSize, this.search)
            .then(data => {
                this.setPageableData(data);
                this.setPullingPageableDataStatus(false);
                return data;
            });
    }

    @action.bound
    setPageableData(pageableData) {
        this.pageableData = pageableData;
        this.pageableData.content = this.pageableData.content.map(this.rowTransformer);
    }
}
