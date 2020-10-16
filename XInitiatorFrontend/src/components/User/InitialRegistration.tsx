import { Button, Grid, Typography } from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addNewUser } from '../../store/user/userActions';

export default function InitialRegistration() {
    const dispatch = useDispatch();
    const userAccount = useSelector((state: any) => state.auth.account);

    const registerUser = () => {
        var user = {
            id: userAccount.accountIdentifier,
            name: userAccount.name,
            email: userAccount.userName,
            role: "Member"
        };
        dispatch(addNewUser(JSON.stringify(user)));
    }
    return (
        <Grid container style={{ width: 'inherit', padding: 10 }}>
            <Grid container xs={12}>
                <Grid item xs={3}>
                </Grid>
                <Grid item xs={6} style={{ paddingTop: '10%', textAlign: 'center' }}>
                    <Typography variant="h2">
                        Hello Welcome to the XInitiator Platform.
                    </Typography>
                    <Typography variant="body1">
                        You are not still not a user in the system. Don't worry it's simple thing,
                        just click on continue button and we will suitup you to the platform.
                    </Typography>
                    <div style={{ paddingTop: '5%' }}>
                        <Button variant="contained" onClick={registerUser} color="primary">Continue</Button>
                    </div>

                </Grid>
                <Grid item xs={3}>
                </Grid>
            </Grid>
            <Grid item xs={12}></Grid>
        </Grid>
    )
}
