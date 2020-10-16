import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';
import { getAllInitiativesForYear,  deleteInitiativeForYear } from '../../../services/InitiativeService';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Spinner from '../../common/Spinner'
import AddIcon from '@material-ui/icons/Add';
import { useHistory } from "react-router-dom";
import YesNoDialog from '../../common/InfoDialog/YesNoDialog'
import ButtonGroup from '@material-ui/core/ButtonGroup';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

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

export default function AllInitiatvesForYear() {

    const [initiativeList, setInitiativeList] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [dialogAction, setDialogAction] = useState(false);
    const [dialogResult, setDialogResult] = useState(false);
    const [deletingId, setDeletingId] = useState("");
    let history = useHistory();

    useEffect(() => {
        getAllInitiativesForYear("2020").then(initiatives => {
            setInitiativeList(initiatives)
            setLoading(false);
        })
    }, [dialogResult]);

    const handleDialogResult = (result: boolean) => {
        if (!result) {
            setDialogAction(false);
        }

        setDialogResult(result);
    }

    const deleteInitiative = (id: string) => {
        setDialogAction(true);

        setDeletingId(id)
    }

    useEffect(() => {
        if (dialogResult) {
            setDialogAction(false);
            setLoading(true);
            deleteInitiativeForYear(deletingId).then((res) => {
                setDialogResult(false);
            }).then(() => {
                setLoading(false);
            })
        }
    }, [dialogResult, deletingId])

    const goToAddInitiativeForYear = () => {
        history.push("initiativebyyear/add");
    }

    const goToAddInitiativeYear = () => {
        history.push("initiativeyear/add");
    }

    const onClickEdit = (id: string) => {
        history.push(`initiativesByYear/edit/${id}`);
    }

    const onClickAddMembers = (id: string) => {
        history.push(`initiativesByYear/addMembers/${id}`);
    }

    return (
        <div style={{ paddingTop: 10 }}>
            {!loading ? (
                <Grid container style={{ width: 'inherit', padding: 10 }}>
                    <Grid item xs={12}>
                        <Grid item xs={4} style={{ paddingBottom: 20 }}>
                            <ButtonGroup color="primary" aria-label="outlined primary button group">
                                <Button onClick={goToAddInitiativeForYear} style={{ alignItems: "center" }} size="large" variant="contained" color="primary" startIcon={<AddIcon />}> Add Initiative For Year</Button>
                                <Button onClick={goToAddInitiativeYear} style={{ alignItems: "center" }} size="large" variant="contained" color="primary" startIcon={<AddIcon />}> Add New Initiative Year</Button>
                            </ButtonGroup>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <TableContainer >
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>Initiative Name</StyledTableCell>
                                        <StyledTableCell>Lead Name</StyledTableCell>
                                        <StyledTableCell>Lead Email</StyledTableCell>
                                        <StyledTableCell >Actions</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {initiativeList.map((initiative) => (
                                        <StyledTableRow key={initiative.id}>
                                            <StyledTableCell component="th" scope="row">
                                                {initiative.initiativeByYear.name}
                                            </StyledTableCell>
                                            <StyledTableCell>{initiative.lead ? initiative.lead.name: "Not Assigned"}</StyledTableCell>
                                            <StyledTableCell>{initiative.lead ? initiative.lead.email: "Not available"}</StyledTableCell>
                                            <StyledTableCell>
                                                <ButtonGroup color="primary" aria-label="outlined primary button group">
                                                <Button style={{ alignItems: "center" }} onClick={() => onClickAddMembers(initiative.initiativeByYear.id)} startIcon={<PersonAddIcon />}></Button>
                                                    <Button style={{ alignItems: "center" }} onClick={() => onClickEdit(initiative.initiativeByYear.id)} startIcon={<EditIcon />}></Button>
                                                    <Button startIcon={<DeleteIcon color="error" />} onClick={() => deleteInitiative(initiative.initiativeByYear.id)}></Button>
                                                </ButtonGroup>
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            ) : (<Spinner marginTop={100} />)}
            <YesNoDialog
                header={"Are you sure to Delete?"}
                subheader={"Deleted data cannot be retrieved"}
                onClickYes={() => handleDialogResult(true)}
                onClickNo={() => handleDialogResult(false)}
                open={dialogAction}
            />
        </div>
    )
}
