import { IconButton, Typography, Link } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { CheckCircleOutline, Delete as DeleteIcon } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { NO_RECORDS_FOUND, AFTER_DELETE_YOU_CAN_NOT_UNDONE_MSG } from "../../../utils/constants";
import CustomModal from "../../../components/modal/CustomModal";

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function UserList(props) {
  const classes = useStyles();
  const [userListData, setUserListData] = useState();
  const [selectedUserRowId, setSelectedUserRowId] = useState();
  const [showUserDeleteConfirmationModal, setShowUserDeleteConfirmationModal] = useState(false);
  const [showUserApprovalConfirmationModal, setShowUserApprovalConfirmationModal] = useState(false);

  const handleUserDelete = (rowId) => {
    setShowUserDeleteConfirmationModal(true);
    setSelectedUserRowId(rowId);
  }

  const handleUserApprove = (rowId) => {
      setShowUserApprovalConfirmationModal(true);
      setSelectedUserRowId(rowId);
  }

  useEffect(() => {
    if (props.tableData !== null) {
      setUserListData(props.tableData);
    }
  }, [props.tableData]);

  function deleteRow(row) {
    setShowUserDeleteConfirmationModal(false);
    props.deleteRow(row);
  }

  function approveUser(row) {
      setShowUserApprovalConfirmationModal(false);
      props.approveUser(row);
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Serial No.</StyledTableCell>
              <StyledTableCell align="center">Full Name</StyledTableCell>
              <StyledTableCell align="center">Email</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              !userListData || userListData.length === 0 ? (
                <StyledTableRow>
                  <TableCell colSpan={props.showActionColumn ? 4 : 3} align="center" size="medium">{NO_RECORDS_FOUND}</TableCell>
                </StyledTableRow>
              ) : (
                  userListData.map((row, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell component="th" scope="row">
                        {index + 1}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Link href={"event?organizerId=" + row.id} variant="body2">
                          {row.name ? row.name : "-"}
                        </Link>
                      </StyledTableCell>
                      <StyledTableCell align="center">{row.email}</StyledTableCell>
                      {
                        props.showActionColumn &&
                        <StyledTableCell align="center">
                          <IconButton
                            onClick={() => { handleUserDelete(row.id) }}
                            aria-label="delete"
                            color="secondary"
                            title='Delete User'>
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            onClick={() => { handleUserApprove(row.id) }}
                            aria-label="approve"
                            color="green"
                            title='Approve user'>
                            <CheckCircleOutline fontSize="small" />
                          </IconButton>
                        </StyledTableCell>
                      }
                    </StyledTableRow>
                  )
                  )
                )
            }
          </TableBody>
        </Table>
      </TableContainer >
      <CustomModal
        title="Are you sure you want to delete?"
        onModalSubmit={() => { deleteRow(selectedUserRowId) }}
        showModal={showUserDeleteConfirmationModal}
        onModalClose={() => setShowUserDeleteConfirmationModal(false)}
        submitButtonText="delete"
      >
        <Typography color="error" component="em">* {AFTER_DELETE_YOU_CAN_NOT_UNDONE_MSG}</Typography>
      </CustomModal>
      <CustomModal
        title="Are you sure you want to Approve?"
        onModalSubmit={() => { approveUser(selectedUserRowId) }}
        showModal={showUserApprovalConfirmationModal}
        onModalClose={() => setShowUserApprovalConfirmationModal(false)}
        submitButtonText="Approve"
      >
        <Typography color="primary" component="em">* Approve Seller</Typography>
      </CustomModal>
    </>
  );
}