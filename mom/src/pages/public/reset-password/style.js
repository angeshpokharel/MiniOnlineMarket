import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles(theme => ({
  btnContainer: {
    marginTop: theme.spacing(2),
    paddingTop: theme.spacing(2),
    borderTop: "1px solid rgba(0,0,0,0.2)"
  },
  resetBtn: {
    marginRight: theme.spacing(1)
  }
}));
export default styles;