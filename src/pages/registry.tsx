import { Button, createStyles, FormControl, Grid, IconButton, makeStyles, TextField, Theme } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React from 'react';
import { userRegistry } from '../api/github';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        margin: {
            margin: theme.spacing(1),
        }
    })
);

export const Registry = () => {
    const classes = useStyles();
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [company, setCompany] = React.useState('');
    const [phone, setPhone] = React.useState('');

    const [error, setError] = React.useState<boolean>(false);
    const [success, setSuccess] = React.useState<boolean>(false);

    const handleSubmit = async () => {
        try {
            setError(false);
            await userRegistry(firstName, lastName, email, company, phone);
            setSuccess(true);
            setTimeout(() => { setSuccess(false) }, 5000)
        } catch {
            setError(true)
        }
    };

    return <form noValidate autoComplete="off">
        <Grid container>
            <Grid item xs={12}>
                <FormControl fullWidth className={classes.margin} >
                    <TextField id="standard-name" label="First name" value={firstName} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setFirstName(event.target.value);
                    }} />
                </FormControl>
            </Grid>

            <Grid item xs={12}>
                <FormControl fullWidth className={classes.margin} >
                    <TextField id="standard-name" label="Last name" value={lastName} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setLastName(event.target.value);
                    }} />
                </FormControl>
            </Grid>

            <Grid item xs={12}>
                <FormControl fullWidth className={classes.margin} >
                    <TextField id="standard-name" label="Email" value={email} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setEmail(event.target.value);
                    }} />
                </FormControl>
            </Grid>


            <Grid item xs={12}>
                <FormControl fullWidth className={classes.margin} >
                    <TextField id="standard-name" label="Company" value={company} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setCompany(event.target.value);
                    }} />
                </FormControl>
            </Grid>


            <Grid item xs={12}>
                <FormControl fullWidth className={classes.margin} >
                    <TextField id="standard-name" label="Phone number" value={phone} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setPhone(event.target.value);
                    }} />
                </FormControl>
            </Grid>

            <Button variant="contained" color="primary" onClick={async () => { handleSubmit() }}>
                Send
        </Button>
        </Grid>
        {error && <Alert severity="error">The user can't be save!</Alert>}
        {success && <Alert
            action={
                <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => { setSuccess(false) }}
                >
                    <CloseIcon fontSize="inherit" />
                </IconButton>
            }
        >
            User save correctly!
      </Alert>}
    </form>;
};