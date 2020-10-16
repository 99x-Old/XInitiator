import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import { addNewInitiativeYear } from '../../../../services/InitiativeService'

export default function AddNewInitiativeYear() {
    let history = useHistory();
    const [year, setYear] = useState("");
    const [filled, setFilled] = useState(false);

    useEffect(() => {
        if (year !== "") {
            setFilled(true);
        } else {
            setFilled(false);
        }
    }, [year])

    const saveInitiativeYear = () => {
        let body = {
            year: year
        };
        addNewInitiativeYear(JSON.stringify(body)).then((res) => {
            history.push("/initiatives");
        })
    }

    const handleYearChange = (event: any) => setYear(event.target.value);

    return (
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
                                    <TextField value={year} id="standard-basic" onChange={handleYearChange} label="Year" variant="outlined" style={{ width: '100%' }} />
                                </FormControl>
                            </Grid>
                        </Grid>
                    </CardContent>
                    <CardActions>
                        <FormControl fullWidth style={{ marginTop: 20 }}>
                            <Button size="large" disabled={!filled} variant="contained" onClick={saveInitiativeYear} color="primary">Save</Button>
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
    )
}
