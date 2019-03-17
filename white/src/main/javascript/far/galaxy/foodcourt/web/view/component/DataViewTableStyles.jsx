import {fade} from "@material-ui/core/styles/colorManipulator";

export const DataViewTableStyles = theme => ({
    tableTopToolbar: {
        display: 'flex',
    },
    grow: {
        flexGrow: 1,
    },
    tableTopToolbarSearchCtrl: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    tableTopToolbarCtrl: {
        margin: theme.spacing.unit,
    },
    paperRelativeStyle: {
        position: 'relative',
    },
});
