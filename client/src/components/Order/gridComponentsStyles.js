import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  fildGroupTitle: {
    padding: '8px',
    margin: '4px -4px',
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.contrastText,
  },
  info: {
    fontSize: '14px',
    [theme.breakpoints.down('xs')]: {
      fontSize: '12px',
    },
  },
  infoLabel: {
    border: `1px solid ${theme.palette.primary.contrastText}`,
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
  },
  infoData: {
    border: `1px solid ${theme.palette.primary.light}`,
  },
  infoText: {
    fontSize: '14px',
    [theme.breakpoints.down('xs')]: {
      fontSize: '12px',
    },
  },
  orderProductWrapper: {
    width: '100%',
    border: `1px solid ${theme.palette.primary.dark}`,
    padding: theme.spacing(1),
  },
  orderProduct: {
    width: '100%',
    display: 'flex',
  },
  orderProductImage: {
    width: '100px',
    margin: theme.spacing(1, 2, 1, 1),
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    [theme.breakpoints.down('xs')]: {
      width: '50px',
    },
  },
  orderProductData: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    justifyContent: 'center',
    '& span': {
      padding: theme.spacing(0.5),
    },
  },
  orderProductRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-beetwen',
    [theme.breakpoints.down('xs')]: {
      fontSize: '12px',
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
  },
  orderProductDivider: {
    background:
      'linear-gradient(90deg, rgba(0,0,60,0) 0%, rgba(0,0,60,1) 50%, rgba(0,0,60,0) 100%)',
    height: '2px',
  },
  orderProductTotal: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: theme.spacing(1, 0.5),
    fontSize: '16px',
    fontWeight: 'bold',
  },
}))

export default useStyles
