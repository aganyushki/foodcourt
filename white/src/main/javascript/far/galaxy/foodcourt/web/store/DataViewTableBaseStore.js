import {observable, action, computed} from "mobx";

export default class DataViewTableBaseStore {
    @observable filter = '';
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

    constructor({getPageableFromServer, fieldsDescription, scope, rowTransformer, rowOnClick}) {
        this.rowTransformer = rowTransformer || (row => row);
        this.fields = fieldsDescription;
        this.getPageableFromServer = getPageableFromServer || (() => Promise.resolve());
        this.scope = scope;
        this.rowOnClick = rowOnClick || (() => {});
    }

    @action.bound
    setFilter(value) {
        this.filter = value;
    }

    @action.bound
    clearFilter() {
        this.filter = '';
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
        return this.getPageableFromServer(this.currentPage, this.pages.pageSize)
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
        return this.getPageableFromServer(nextPage, this.pages.pageSize)
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
