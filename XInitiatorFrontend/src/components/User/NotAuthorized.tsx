import { Button, Grid, Typography } from '@material-ui/core'
import React from 'react'
import AzureAD, { IAzureADFunctionProps } from 'react-aad-msal';
import { useHistory } from 'react-router-dom';
import { authProvider } from '../../Auth/AuthProvider';

export default function NotAuthorized() {

    const history = useHistory();
    return (
        <Grid container style={{ width: 'inherit', padding: 10 }}>
            <Grid container xs={12}>
                <Grid item xs={3}>
                </Grid>
                <Grid item xs={6} style={{ paddingTop: '10%', textAlign: 'center' }}>
                    <Typography variant="h2">
                        You don't have to access this level.
                    </Typography>
                    <Typography variant="body1">
                        You can go back or Login with Different Account.
                    </Typography>
                    <div style={{ paddingTop: '5%' }}>
                        <Button variant="outlined" style={{margin: 20}} onClick={() => history.goBack()} color="primary">Go Back</Button>
                        <AzureAD provider={authProvider}>
                            {({ logout }: IAzureADFunctionProps) => {
                                return (
                                    <Button variant="contained" onClick={logout} color="secondary">Login with Different Account</Button>
                                );
                            }}

                        </AzureAD>
                    </div>

                </Grid>
                <Grid item xs={3}>
                </Grid>
            </Grid>
            <Grid item xs={12}></Grid>
        </Grid>
    )
}
