import React from 'react'
import Grid from '@material-ui/core/Grid';
import { useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import AllInitiatives from './AllInitiatives/AllInitiatives'
import AllInitiatvesForYear from './InitiativeByYear/AllInitiatvesForYear'

export default function Initiatives() {

    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Grid container>
            <Grid item xs={12}>
                <AppBar position="static" style={{ marginTop: 20 }} color="default">
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="fullWidth"
                        aria-label="full width tabs example"
                    >
                        <Tab label="Initiative Year" />
                        <Tab label="All Initiatives" />
                    </Tabs>
                </AppBar>

                <TabPanel value={value} index={0} dir={theme.direction}>
                    <AllInitiatvesForYear/>
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    <AllInitiatives />
                </TabPanel>
            </Grid>
        </Grid>
    )
}

interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: any;
    value: any;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}