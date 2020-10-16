import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';
import { IconButton, TextField, Tooltip } from '@material-ui/core';
import { changeUserStatus, getAllUsersWithInactives, User } from '../../services/userService';
import Spinner from '../common/Spinner';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { blue, green, red } from '@material-ui/core/colors';
import BlockIcon from '@material-ui/icons/Block';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { useDispatch } from 'react-redux';
import { openErrorDialogAction, openSuccessDialogAction, openYesNoDialogAction } from '../../store/infoDialog/infoDialogAction';
import { useHistory } from 'react-router-dom';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 18,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

export default function UserList() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [searchedText, setSearchText] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [userList, setUserList] = useState<User[]>([]);
    const [searchedList, setSearchedList] = useState<User[]>([]);
    const [statusChanged, setStatusChanged] = useState<boolean>(false);

    useEffect(() => {
        getAllUsersWithInactives().then((users: any) => {
            setUserList(users);
        }).finally(() => setIsLoading(false));
    }, [statusChanged]);

    const handleOnChange = (event: any) => setSearchText(event.target.value.toLowerCase());

    const onClickStatusChange = (email: string) => {
        dispatch(openYesNoDialogAction("Are you sure to Change Status?",
            "After changed status it may affect to the access of the user",
            () => {
                changeUserStatus(email).then((res) => {
                    if (res) {
                        dispatch({ type: 'CLOSE_DIALOG' })
                        setStatusChanged(!statusChanged);
                        dispatch(openSuccessDialogAction("Success!", "Status Changed!"));
                    }else{
                        dispatch({ type: 'CLOSE_DIALOG' });
                        dispatch(openErrorDialogAction("Failed!", "Status not Changed!"));
                    }
                }).finally(() => {
                    setIsLoading(false);
                })
            },
            () => dispatch({ type: 'CLOSE_DIALOG' })
        ))
    }

    useEffect(() => {
        if (searchedText === "") {
            setSearchedList(userList);
        } else {
            var searchedUsers: User[] = [];
            searchedUsers = userList.filter(user => (user.name.toLowerCase().includes(searchedText)
                || user.email.toLowerCase().includes(searchedText))
                || user.role.toLowerCase().includes(searchedText)
                || user.userType.toLowerCase().includes(searchedText)
                || (user.status ? "true" : "false").includes(searchedText));
            setSearchedList(searchedUsers);
        }
    }, [searchedText, userList])

    return (
        <div>
            {isLoading ? (<Spinner marginTop={100} />) : (
                <Grid container style={{ width: 'inherit', padding: 10 }}>

                    <Grid item xs={12}>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField id="outlined-basic" size="small" onChange={handleOnChange} fullWidth style={{ margin: 5 }} label="Search" variant="outlined" />
                        <TableContainer >
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>Name</StyledTableCell>
                                        <StyledTableCell>Email</StyledTableCell>
                                        <StyledTableCell >Role</StyledTableCell>
                                        <StyledTableCell >User Type</StyledTableCell>
                                        <StyledTableCell >Status</StyledTableCell>
                                        <StyledTableCell >Actions</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {searchedList.map((user: User) => (
                                        <StyledTableRow key={user.id}>
                                            <StyledTableCell component="th" scope="row">
                                                {user.name}
                                            </StyledTableCell>
                                            <StyledTableCell>{user.email}</StyledTableCell>
                                            <StyledTableCell>{user.role}</StyledTableCell>
                                            <StyledTableCell>{user.userType}</StyledTableCell>
                                            <StyledTableCell>{user.status ? "Active" : "Inactive"}</StyledTableCell>
                                            <StyledTableCell style={{ alignItems: "center" }}>
                                                <Tooltip title={user.status ? "Deactivate" : "Activate"}>
                                                    <IconButton style={{ alignItems: "center" }} onClick={() => onClickStatusChange(user.email)}>
                                                        {!user.status ? (<CheckCircleIcon style={{ color: green[500] }} />) : (<BlockIcon style={{ color: red[500] }} />)}
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title={"Edit"}>
                                                    <IconButton style={{ alignItems: "center", color: green[300] }} onClick={() => history.push(`/users/edit/${user.id}`)}>
                                                        <EditIcon style={{ color: green[500] }} />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title={"View"}>
                                                    <IconButton style={{ alignItems: "center", color: green[300] }} onClick={() => history.push(`/users/view/${user.id}`)}>
                                                        <VisibilityIcon style={{ color: blue[500] }} />
                                                    </IconButton>
                                                </Tooltip>
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            )
            }
        </div >

    )
}
