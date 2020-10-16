import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
import { getInitiativeById, editInitiative } from '../../../services/InitiativeService';
import Spinner from '../../common/Spinner';

export default function EditInitiative(props: any) {
    let history = useHistory();
    const [initiativeId, setInitiativeId] = useState("");
    const [initiativeName, setInitiativeName] = useState("");
    const [initiativeDescription, setInitiativeDescription] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getInitiativeById(props.match.params.id).then(response => {
            setInitiativeId(response.id);
            setInitiativeName(response.name);
            setInitiativeDescription(response.description);
            setLoading(false);
        })
    }, [props.match.params.id]);

    const handleChangeOnName = (event: any) => setInitiativeName(event.target.value)
    const handleChangeOnDescription = (event: any) => setInitiativeDescription(event.target.value);

    const saveInitiative = () => {

        let body = {
            "name": initiativeName,
            "description": initiativeDescription
        };

        editInitiative(initiativeId, JSON.stringify(body)).then(response => {
            history.push("/initiatives")
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
                                        <TextField disabled value={initiativeId} id="standard-basic" label="Initiative ID" variant="outlined" style={{ width: '100%' }} />
                                    </FormControl>
                                    <FormControl fullWidth style={{ marginTop: 20 }}>
                                        <TextField value={initiativeName} id="standard-basic" onChange={handleChangeOnName} label="Initiative Name" variant="outlined" style={{ width: '100%' }} />
                                    </FormControl>
                                    <FormControl fullWidth style={{ marginTop: 20 }}>
                                        <TextField value={initiativeDescription} id="standard-basic" onChange={handleChangeOnDescription} label="Initiative Description" variant="outlined" multiline rows={4} style={{ width: '100%' }} />
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
