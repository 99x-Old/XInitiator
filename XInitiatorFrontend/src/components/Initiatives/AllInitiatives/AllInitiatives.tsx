import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';
import { getAllInitiatives, Initiative, deleteInitiativeById } from '../../../services/InitiativeService';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Spinner from '../../common/Spinner'
import AddIcon from '@material-ui/icons/Add';
import { useHistory } from "react-router-dom";
import YesNoDialog from '../../common/InfoDialog/YesNoDialog';

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

export default function AllInitiatives() {

    const [initiativeList, setInitiativeList] = useState<Initiative[]>([]);
    const [loading, setLoading] = useState(true);
    const [dialogAction, setDialogAction] = useState(false);
    const [dialogResult, setDialogResult] = useState(false);
    const [deletingId, setDeletingId] = useState("");
    let history = useHistory();

    useEffect(() => {
        getAllInitiatives().then(initiatives => {
            setInitiativeList(initiatives)
            setLoading(false);
        })
    }, [dialogResult]);

    const handleDialogResult = (result: boolean) => {
        if(!result){
            setDialogAction(false);
        }
        setDialogResult(result);
    }

    const deleteInitiative = (id: string) => {
        setDialogAction(true);
        setDeletingId(id)
    }

    useEffect(() => {
        if(dialogResult){
            setDialogAction(false);
            setLoading(true);
            deleteInitiativeById(deletingId).then((res) => {
                setDialogResult(false);
            }).then(() => {
                setLoading(false);
            })
        }
    }, [dialogResult, deletingId])

    const goToAddInitiative = () => {
        history.push("initiatives/add");
    }

    const onClickEdit = (id: string) => {
        history.push(`initiatives/edit/${id}`);
    }

    return (
        <div style={{ paddingTop: 10 }}>
            {!loading ? (
                <Grid container style={{ width: 'inherit', padding: 10 }}>
                    <Grid item xs={12}>
                        <Grid item xs={4} style={{ paddingBottom: 20 }}>
                            <Button onClick={goToAddInitiative} style={{ alignItems: "center" }} size="large" variant="contained" color="primary" startIcon={<AddIcon />}> Add New Initiative</Button>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <TableContainer >
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>Initiative Name</StyledTableCell>
                                        <StyledTableCell>Description</StyledTableCell>
                                        <StyledTableCell >Actions</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {initiativeList.map((initiative) => (
                                        <StyledTableRow key={initiative.id}>
                                            <StyledTableCell component="th" scope="row">
                                                {initiative.name}
                                            </StyledTableCell>
                                            <StyledTableCell>{initiative.description}</StyledTableCell>
                                            <StyledTableCell>
                                                <ButtonGroup color="primary" aria-label="outlined primary button group">
                                                    <Button style={{ alignItems: "center" }} onClick={() => onClickEdit(initiative.id)} startIcon={<EditIcon />}></Button>
                                                    <Button startIcon={<DeleteIcon color="error" />} onClick={() => deleteInitiative(initiative.id)}></Button>
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
