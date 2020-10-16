import { Card, CardContent, Chip, Grid, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import Logo from '../../App/logo.svg'
import { getFullUserById } from '../../services/userService';
import Spinner from '../common/Spinner';
import moment from 'moment'
import { getAllInitiativesForYear } from '../../services/InitiativeService';

export default function ViewUser(props: any) {

    const [user, setUser] = useState<any>();
    const [loading, setLoading] = useState<boolean>(true);
    const [allInitiatives, setAllInitiatives] = useState<any>([]);

    useEffect(() => {
        getFullUserById(props.match.params.id).then((object: any) => {
            getAllInitiativesForYear("2020").then(initiatives => {
                setAllInitiatives(initiatives);
            })
            setUser(object)
        }).finally(() => {
            setLoading(false);
        })
    }, [props.match.params.id])

    const getRoleButify = (role: string) => {
        if (role === "Member") {
            return role;
        } else if (role === "Lead") {
            return "Initiative Lead";
        } else if (role === "Evaluator") {
            return "Initiative Evaluator";
        } else if (role === "SuperAdmin") {
            return "Super Admin";
        }
    }

    const getInitiativeName = (id: string) => {
        const name = allInitiatives.find((x: any) => x.initiativeByYear.id === id)?.initiativeByYear.name;
        return name;
    }
    return (
        <div>
            {loading ? (<Spinner marginTop={100} />) : (
                <Grid container style={{ width: 'inherit', padding: 10 }}>
                    <Grid container xs={12}>
                        <Grid item xs={3} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <img alt="profile" src={Logo} />
                        </Grid>
                        <Grid item xs={9}>
                            <Card variant="outlined">
                                <CardContent>
                                    <Typography variant="h4">Basic Information</Typography>
                                    <Grid container xs={12} style={{ marginTop: 20 }}>

                                        <Table style={{ maxWidth: "50%" }} size="small" aria-label="spanning table">
                                            <TableRow>
                                                <TableCell align="left"><Typography variant="subtitle1">Name: </Typography></TableCell>
                                                <TableCell align="left"><Typography variant="subtitle2">{user.name}</Typography></TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align="left"><Typography variant="subtitle1">Email: </Typography></TableCell>
                                                <TableCell align="left"><Typography variant="subtitle2">{user.email}</Typography></TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align="left"><Typography variant="subtitle1">Role: </Typography></TableCell>
                                                <TableCell align="left"><Typography variant="subtitle2">{getRoleButify(user.role)}</Typography></TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align="left"><Typography variant="subtitle1">User Type: </Typography></TableCell>
                                                <TableCell align="left"><Typography variant="subtitle2">{user.userType}</Typography></TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align="left"><Typography variant="subtitle1">Status: </Typography></TableCell>
                                                <TableCell align="left">{user.isActive ? (
                                                    <Chip
                                                        label="Active"
                                                        color="primary"
                                                    />) : (
                                                        <Chip
                                                            label="Inactive"
                                                            color="secondary"
                                                        />
                                                    )}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align="left"><Typography variant="subtitle1">Member Since: </Typography></TableCell>
                                                <TableCell align="left"><Typography variant="subtitle2">{moment(user.createdDate).format("YYYY-MM-DD")}</Typography></TableCell>
                                            </TableRow>
                                        </Table>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                    <Grid container xs={12} style={{ marginTop: 20 }}>
                        <Grid item xs={6} style={{ marginTop: 20 }}>
                            <Card variant="outlined" style={{ width: '100%' }}>
                                <CardContent>
                                    <Typography variant="h4">Initiatives Joined</Typography>
                                    <Table size="small" aria-label="a dense table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="right">Initiative</TableCell>
                                                <TableCell align="right">Role</TableCell>
                                                <TableCell align="right">Overall Rating</TableCell>
                                                <TableCell align="right">Member Since</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {user.joinedInitiatives.map((row: any) => (
                                                <TableRow key={row.id}>
                                                    <TableCell align="right">
                                                        {getInitiativeName(row.initiativeByYearId)}
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        {row.role}
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        {row.overallRating}
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        {moment(row.createdDate).format("YYYY-MM-DD")}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
            )
            }
        </div >
    )
}
