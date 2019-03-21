export const ShopOrderStepperStyles = () => ({ // todo, normalize styles
    wrapper: {
        width: '50%'
    },
});

export const ShopRootLayoutStyles = theme => ({
    root: {
        flexGrow: 1,
    },
    content: {
        padding: 15,
        paddingTop: 75
    },
    button: {
        margin: theme.spacing.unit,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    grow: {
        flexGrow: 1,
    },
});
