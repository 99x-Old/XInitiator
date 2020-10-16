import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import { getAllInitiatives, Initiative, getAllInitiativeYears, addNewInitiativeForYear } from '../../../services/InitiativeService'
import { getAllUsers, User } from '../../../services/userService'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Spinner from '../../common/Spinner'
import Select from '@material-ui/core/Select';

export default function AddInitiativesForYear() {

    const history = useHistory();
    const [filled, setFilled] = useState(false);
    const [lead, setLead] = useState("");
    const [selectedInitiative, setSelectedInitiative] = useState("");
    const [selectedYear, setSelectedYear] = useState("");
    const [allInitiatives, setAllInitiatives] = useState<Initiative[]>([]);
    const [allInitiativeYears, setAllInitiativeYears] = useState<any[]>([]);
    const [allUsers, setAllUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAllInitiatives().then(initiatives => {
            setAllInitiatives(initiatives);
        })
        getAllInitiativeYears().then(initiativeYears => {
            setAllInitiativeYears(initiativeYears);
        })
        getAllUsers().then(users => {
            setAllUsers(users);
        }).finally(() => {
            setLoading(false);
        })
    }, [lead, selectedInitiative, selectedYear]);

    useEffect(() => {

        if(selectedInitiative !== "" && selectedYear !== "")
            setFilled(true);

    }, [lead, selectedInitiative, selectedYear]);

    const handleLeadChange = (event: any) => {
        setLead(event.target.value as string);
    }

    const handleInitiativeChange = (event: any) => {
        setSelectedInitiative(event.target.value as string);
    }

    const handleYearChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSelectedYear(event.target.value as string);
    }

    const saveInitiativeForYear = () => {
        
        var initiativeForYear = {
            year: selectedYear,
            initiativeId: selectedInitiative,
            leadId: lead
        };

        addNewInitiativeForYear(JSON.stringify(initiativeForYear)).then(result => {
            history.push("/initiatives");
        })
    }

    return (
        <div>
            {loading ? (<Spinner marginTop={100}/>) : (
                <Grid container style={{ marginTop: '5%', width: '100%' }}>

                    <Grid item xs={3}>

                    </Grid>
                    <Grid item xs={6}>
                        <Card style={{ width: '100%' }}>
                            <CardContent>
                                <Typography variant="h5" color="inherit" gutterBottom>
                                    Adding an Initiative Year
                                </Typography>
                                <Grid container spacing={3} style={{ marginTop: 20 }}>
                                    <Grid item xs={12}>
                                        <FormControl fullWidth style={{ marginTop: 20 }}>
                                            <InputLabel id="demo-simple-select-label">Initiative Year</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={selectedYear}
                                                onChange={handleYearChange}
                                            >
                                                <MenuItem value="" selected>
                                                    <em>None</em>
                                                </MenuItem>
                                                {allInitiativeYears.map(year => <MenuItem key={year.year} value={year.year}>{year.year}</MenuItem>)}
                                            </Select>
                                        </FormControl>
                                        <FormControl fullWidth style={{ marginTop: 20 }}>
                                            <InputLabel id="demo-simple-select-label">Initiative</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={selectedInitiative}
                                                onChange={handleInitiativeChange}
                                            >
                                                <MenuItem value="" selected>
                                                    <em>None</em>
                                                </MenuItem>
                                                {allInitiatives.map(initiative => <MenuItem key={initiative.id} value={initiative.id}>{initiative.name}</MenuItem>)}
                                            </Select>
                                        </FormControl>
                                        <FormControl fullWidth style={{ marginTop: 20 }}>
                                            <InputLabel id="demo-simple-select-label">Lead</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={lead}
                                                onChange={handleLeadChange}
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
                                    <Button size="large" disabled={!filled} variant="contained" onClick={saveInitiativeForYear} color="primary">Save</Button>
                                    <br />
                                    <Button size="large" onClick={() => history.goBack()} variant="contained" color="default">Close</Button>
                                    <br />
                                </FormControl>

                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs={3}>

                    </Grid>
                </Grid>
            )}
        </div>

    )
}
