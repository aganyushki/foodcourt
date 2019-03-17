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
                        header.map(hItem => {
                            const value = row[hItem.id];
                            return <TableCell key={value} component="th" scope="row">{
                                hItem.transform ? hItem.transform(value, row) : value
                            }</TableCell>
                        })
                    }</TableRow>
                ))
            }
        </TableBody>
    };
    doRefresh = () => {
        this.props.model.reload();
    };
    buildEmptyMessage = (classes) => {
        return (
            <div className={classes.emptyTableNotificationWrapper}>
                <Typography align="center" color="default" variant="h6" paragraph={true}>
                    Seems like there is no data to show
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
                        'aria-label': 'Previous Page',
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'Next Page',
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
                        <div className={classes.grow} />
                        {/*<TextField*/}
                        {/*id="standard-name"*/}
                        {/*className={classes.tableTopToolbarSearchCtrl}*/}
                        {/*margin="normal"*/}
                        {/*/>*/}
                        {/*<IconButton aria-label="Clear Search" className={classes.tableTopToolbarCtrl}>*/}
                        {/*<ClearIcon fontSize="small" />*/}
                        {/*</IconButton>*/}
                        <IconButton aria-label="Refresh" className={classes.tableTopToolbarCtrl} onClick={this.doRefresh}>
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
