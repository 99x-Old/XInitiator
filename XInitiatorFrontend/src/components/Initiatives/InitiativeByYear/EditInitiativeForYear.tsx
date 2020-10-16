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
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { getAllUsers, User } from '../../../services/userService';
import { editLeadForInitiative, getInitiativeForYearById } from '../../../services/InitiativeService';

// type Props = {
//     initiative: Initiative
// }

export default function EditInitiativeForYear(props: any) {
    let history = useHistory();
    const [selectedUser, setSelectedUser] = useState("");
    const [allUsers, setAllUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [, setInitiativeByYear] = useState<any>();

    useEffect(() => {
        getAllUsers().then(users => {
            setAllUsers(users);
            getInitiativeForYearById(props.match.params.id).then(initiative => {
                if(initiative.lead !== null)
                    setSelectedUser(initiative.lead.id);
                
                setInitiativeByYear(initiative);
            })
        }).finally(() => {
            setLoading(false);
        })
    }, [props.match.params.id]);

    const handleUserChange = (event: any) => setSelectedUser(event.target.value as string);

    const saveInitiative = () => {

        let body = {
            "initiativeId": props.match.params.id,
            "leadId": selectedUser
        };

        editLeadForInitiative(JSON.stringify(body), props.match.params.id).then(result => {
            history.push("/initiatives");
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
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={selectedUser}
                                            onChange={handleUserChange}
                                        >
                                            <MenuItem value="" selected>
                                                <em>None</em>
                                            </MenuItem>
                                            {allUsers.map(user => <MenuItem key={user.id} value={user.id}>{user.name}</MenuItem>)}
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </CardContent>
                        <CardActions>
                            <FormControl fullWidth style={{ marginTop: 20 }}>
                                <Button size="large" variant="contained" onClick={saveInitiative} color="primary">Save</Button>
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
        </Grid>
    )
}
