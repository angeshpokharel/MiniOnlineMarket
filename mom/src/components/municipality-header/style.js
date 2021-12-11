import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: theme.spacing(2)
  },
  logo: {
    width: "132px"
  },
  secondaryLogoContainer: {
    minWidth: "132px"
  }
}));
export default styles;