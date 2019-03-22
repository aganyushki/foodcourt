import React, {Component} from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import {DataViewTableStyles} from "./DataViewTableStyles";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import TablePagination from "@material-ui/core/TablePagination";
import RefreshIcon from '@material-ui/icons/Refresh';
import ClearIcon from '@material-ui/icons/Clear';
import {observer} from "mobx-react";
import Paper from "@material-ui/core/Paper";
import ProcessingCover from "./ProcessingCover";
import Typography from "@material-ui/core/Typography";
import RootProcessingIndicator from "./RootProcessingIndicator";
import Text from "./Text";

@observer
class DataViewTable extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        model: PropTypes.object.isRequired,
    };

    componentDidMount() {
        this.props.model.pullData();
    }

    buildHeader = (header) => {
        return <TableHead>
            <TableRow>
                {
                    header.map(item => {
                        // align="right"
                        return <TableCell key={item.id}>{item.title || item.id}</TableCell>;
                    })
                }
            </TableRow>
        </TableHead>
    };
    buildBody = (header, rows, rowOnClick) => {
        return <TableBody>
            {
                rows.map(row => (
                    <TableRow key={row.id} onClick={() => rowOnClick(row)}>{
                        header.map((hItem, index) => {
                            const value = row[hItem.id];
                            // here, index - just cell position, have no other way to build uniq key for cell.
                            return <TableCell key={`${row.id}_${index}`} component="th" scope="row">{
                                hItem.transform ? hItem.transform(value, row) : value
                            }</TableCell>
                        })
                    }</TableRow>
                ))
            }
        </TableBody>
    };
    setSearch = () => {

    };
    buildEmptyMessage = (classes) => {
        return (
            <div className={classes.emptyTableNotificationWrapper}>
                <Typography align="center" color="default" variant="div" paragraph={true}>
                    <Text>TABLE_VIEW_MSG_EMPTY</Text>
                </Typography>
            </div>
        )
    };
    buildDataTable = (model, classes) => {
        const rows = (model.pageableData && model.pageableData.content) || [];
        const totalElements = (model.pageableData && model.pageableData.totalElements) || 0;
        return (
            <div>
                <Table className={classes.table}>
                    {this.buildHeader(model.fields)}
                    {this.buildBody(model.fields, rows, model.rowOnClick)}
                </Table>

                <TablePagination
                    rowsPerPageOptions={model.pages.availablePageSizes}
                    component="div"
                    count={totalElements}
                    rowsPerPage={model.pages.pageSize}
                    page={model.currentPage}
                    backIconButtonProps={{
                        'aria-label': <Text>TABLE_VIEW_PREV_PAGE</Text>,
                    }}
                    nextIconButtonProps={{
                        'aria-label': <Text>TABLE_VIEW_NEXT_PAGE</Text>,
                    }}
                    onChangePage={(event, newPage) => model.setNextPage(newPage)}
                    onChangeRowsPerPage={event => model.setPageSize(event.target.value)}
                />
            </div>
        )
    };

    render() {
        const {classes, model} = this.props;
        return (
            model.pageableData && model.pageableData.content
            ? (
                <Paper className={classes.paperRelativeStyle}>
                    {
                        model.pullingPageableData ? <ProcessingCover /> : null
                    }
                    <div className={classes.tableTopToolbar}>
                        {
                            model.showSearch ?
                                <TextField
                                    className={classes.tableTopToolbarSearchCtrl}
                                    margin="normal"
                                    value={model.search}
                                    onChange={event => model.setSearch(event.target.value)}
                                />
                            : null
                        }
                        {
                            model.showSearch && model.search.length ?
                                <IconButton aria-label={<Text>TABLE_VIEW_SEARCH_CLEAR</Text>}
                                            className={classes.tableTopToolbarCtrl}
                                            onClick={model.clearSearch}
                                >
                                    <ClearIcon fontSize="small" />
                                </IconButton>
                            : null
                        }
                        <div className={classes.grow} />
                        <IconButton aria-label={<Text>TABLE_VIEW_REFRESH</Text>}
                                    className={classes.tableTopToolbarCtrl}
                                    onClick={model.reload}
                        >
                            <RefreshIcon fontSize="small" />
                        </IconButton>
                    </div>
                    {
                        model.pageableData.empty
                            ? this.buildEmptyMessage(classes)
                            : this.buildDataTable(model, classes)
                    }
                </Paper>
            ) : <RootProcessingIndicator />
        )
    }
}

export default withStyles(DataViewTableStyles)(DataViewTable);
