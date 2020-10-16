import { Button, Card, CardActions, CardContent, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getUserById, saveUserChanges } from '../../services/userService';
import { openErrorDialogAction, openSuccessDialogAction } from '../../store/infoDialog/infoDialogAction';
import Spinner from '../common/Spinner'

export default function UserEdit(props: any) {

    const history = useHistory();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState<boolean>(true);
    const [userName, setUserName] = useState<string>("");
    const [role, setRole] = useState<string>("");
    const [userType, setUserType] = useState<string>("");
    const [userEmail, setUserEmail] = useState<string>("");

    useEffect(() => {
        getUserById(props.match.params.id).then((user: any) => {
            setUserEmail(user.email);
            setUserName(user.name);
            setRole(user.role);
            setUserType(user.userType);
        }).finally(() => {
            setLoading(false);
        })
    }, [props.match.params.id]);

    const handleNameChange = (event: any) => setUserName(event.target.value);
    const handleRoleChange = (event: any) => setRole(event.target.value);
    const handleUserTypeChange = (event: any) => setUserType(event.target.value);

    const saveUser = () => {
        var userEdits = {
            name: userName,
            role: role,
            userType: userType
        };
        saveUserChanges(props.match.params.id, JSON.stringify(userEdits)).then((status: any) => {
            if(status){
                dispatch(openSuccessDialogAction("Success!", "User Edited Successfully!"));
                history.push("/users")
            }else{
                dispatch(openErrorDialogAction("Failed!", "Operation cannot Serve!"));
            }
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
                                        <TextField id="standard-basic" value={userName} onChange={handleNameChange} label="Name" variant="outlined" style={{ width: '100%' }} />
                                    </FormControl>
                                    <FormControl fullWidth style={{ marginTop: 20 }}>
                                        <TextField id="standard-basic" disabled label="Email" value={userEmail} variant="outlined" style={{ width: '100%' }} />
                                    </FormControl>
                                    <FormControl fullWidth style={{ marginTop: 20 }}>
                                        <InputLabel id="demo-simple-select-label">Change User Role</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={role}
                                            onChange={handleRoleChange}
                                        >
                                            <MenuItem value="" selected>
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value="Member" selected>
                                                Member
                                            </MenuItem>
                                            <MenuItem value="Lead" selected>
                                                Initiative Lead
                                            </MenuItem>
                                            <MenuItem value="Evaluator" selected>
                                                Initiative Evaluator
                                            </MenuItem>
                                            <MenuItem value="SuperAdmin" selected>
                                                Super Admin
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                    <FormControl fullWidth style={{ marginTop: 20 }}>
                                        <InputLabel id="demo-simple-select-label">Change User Type</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={userType}
                                            onChange={handleUserTypeChange}
                                        >
                                            <MenuItem value="" selected>
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value="Normal" selected>
                                                Normal
                                            </MenuItem>
                                            <MenuItem value="Intern" selected>
                                                Intern
                                            </MenuItem>
                                            <MenuItem value="Permenent" selected>
                                                Permenent
                                            </MenuItem>
                                            <MenuItem value="Outsider" selected>
                                                Outsider
                                            </MenuItem>
                                            <MenuItem value="HR" selected>
                                                HR
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </CardContent>
                        <CardActions>
                            <FormControl fullWidth style={{ marginTop: 20 }}>
                                <Button size="large" variant="contained" onClick={saveUser} color="primary">Save</Button>
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
