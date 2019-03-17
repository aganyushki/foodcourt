import green from '@material-ui/core/colors/green';

export const LoginRootLayoutStyles = theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
    },
    toolbar: theme.mixins.toolbar,
});

export const LoginFormStyles = theme => ({
    actionButton: {
        margin: theme.spacing.unit,
        position: 'relative',
    },
    actionCtrlWrapper: {
        textAlign: 'right',
    },
    paper: {
        padding: theme.spacing.unit * 6,
        paddingBottom: theme.spacing.unit * 3,
        textAlign: 'center',
        color: theme.palette.text.secondary,
        width: 300,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    ctrlWrapper: {
        paddingTop: 10,
        paddingBottom: 40,
    },
    buttonProgress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
});
