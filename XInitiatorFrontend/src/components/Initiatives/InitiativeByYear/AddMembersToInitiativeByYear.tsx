import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
import Spinner from '../../common/Spinner';
import InputLabel from '@material-ui/core/InputLabel';
import Select from 'react-select';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import DeleteIcon from '@material-ui/icons/Delete';
import TableRow from '@material-ui/core/TableRow';
import makeAnimated from 'react-select/animated';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { withStyles } from '@material-ui/core/styles';
import { getAllUsers } from '../../../services/userService';
import { addMembersListToInitiative, getMembersInInitiative, removeMemberFromInitiative } from '../../../services/InitiativeService';

const animatedComponents = makeAnimated();
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

export default function AddMembersToInitiativeByYear(props: any) {
    let history = useHistory();
    const [loading, setLoading] = useState(true);
    const [usersInInitiative, setUsersInInitiative] = useState<any[]>([]);
    const [optionSelect, setOptionSelect] = useState<any[]>([]);
    const [selectedMembers, setSelectedMembers] = useState<any[]>([]);

    useEffect(() => {
        var notMembersArray: any = [];
        getAllUsers().then(users => {
            getMembersInInitiative(props.match.params.id).then((members: any[]) => {
                users.forEach((element: any) => {
                    if (!members.find(((x: any) => x.user.id === element.id))) {
                        var option = {
                            value: element.id,
                            label: element.name
                        }
                        notMembersArray.push(option);
                    }
                })
                setUsersInInitiative(members);
            }).then(() => {
                setOptionSelect(notMembersArray);
            })
                .finally(() => {
                    setLoading(false);
                });
        });
    }, [selectedMembers, props.match.params.id])

    const handleSelectOnChange = (event: any) => {
        setSelectedMembers(event);
    }

    const addMembersToInitiative = () => {
        addMembersListToInitiative(props.match.params.id, selectedMembers).then((res) => {
            if (res) {
                setSelectedMembers([]);
            }
        })
    }

    const removeMember = (userId: string) => {
        removeMemberFromInitiative(props.match.params.id, userId).then(res => {
            if(res)
                setSelectedMembers([]);
        })
    }

    return (
        <Grid container style={{ marginTop: '5%', width: '100%' }}>
            <Grid item xs={3}>
            </Grid>
            <Grid item xs={6}>
                {loading ? (<Spinner marginTop={100} />) : (
                    <Card style={{ width: '100%' }}>
                        <CardContent>
                            <Typography variant="h5" color="inherit" gutterBottom>
                                Edit Initiative
                            </Typography>
                            <Grid container spacing={3} style={{ marginTop: 20 }}>
                                <Grid item xs={12}>
                                    <FormControl fullWidth style={{ marginTop: 20 }}>
                                        <InputLabel id="demo-simple-select-label">Change Lead</InputLabel>
                                        <Select
                                            closeMenuOnSelect={false}
                                            components={animatedComponents}
                                            isMulti
                                            options={optionSelect}
                                            onChange={handleSelectOnChange}
                                            value={selectedMembers}
                                        />
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </CardContent>
                        <CardActions>
                            <FormControl fullWidth style={{ marginTop: 20 }}>
                                <Button size="large" variant="contained" onClick={addMembersToInitiative} color="primary">Add Members</Button>
                                <br />
                                <Button size="large" onClick={() => history.goBack()} variant="contained" color="default">Close</Button>
                                <br />
                            </FormControl>

                        </CardActions>
                    </Card>
                )}

            </Grid>
            <Grid item xs={3}>

            </Grid>
            {!loading && (<Grid item xs={12} style={{ padding: 20 }}>
                <TableContainer>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Name</StyledTableCell>
                                <StyledTableCell>Email</StyledTableCell>
                                <StyledTableCell>Role</StyledTableCell>
                                <StyledTableCell >Actions</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {usersInInitiative.map((member) => (
                                <StyledTableRow key={member.id}>
                                    <StyledTableCell component="th" scope="row">
                                        {member.user.name}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        {member.user.email}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        {member.role}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <ButtonGroup color="primary" aria-label="outlined primary button group">
                                            <Button onClick={() => removeMember(member.userId)} startIcon={<DeleteIcon color="error" />}></Button>
                                        </ButtonGroup>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>)}
        </Grid>
    )
}
