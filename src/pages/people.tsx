import React from 'react';
import { getPeople } from "../api/github";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { People as PeopleModel } from "../api/models/people";
import { FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        img: {
            width: 100,
        },
    }),
);

export function People() {
    const classes = useStyles();
    const [data, setData] = React.useState<Array<PeopleModel>>([]);
    const [role, setRole] = React.useState<string>('all');
    const [filter, setFilter] = React.useState<string>('all');

    React.useEffect(() => {
        const fetchData = async () => {
            const result = await getPeople(role, filter);
            setData(result)
        };

        fetchData();
    }, [role, filter])

    const handleChangeRole = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRole((event.target as HTMLInputElement).value);
    };

    const handleChangeFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilter((event.target as HTMLInputElement).value);
      };

    return (<div>
        <div>
            <FormControl component="fieldset">
                <FormLabel component="legend">Role</FormLabel>
                <RadioGroup aria-label="role" name="role" value={role} row onChange={handleChangeRole}>
                    <FormControlLabel value="all" control={<Radio />} label="All" />
                    <FormControlLabel value="admin" control={<Radio />} label="Admin" />
                    <FormControlLabel value="member" control={<Radio />} label="Member" />
                </RadioGroup>
            </FormControl>
            <FormControl component="fieldset">
                <FormLabel component="legend">Filter</FormLabel>
                <RadioGroup aria-label="filter" name="filter" value={filter} row onChange={handleChangeFilter}>
                    <FormControlLabel value="all" control={<Radio />} label="All" />
                    <FormControlLabel value="2fa_disabled" control={<Radio />} label="Two factor disabled" />
                </RadioGroup>
            </FormControl>
        </div>
        <Grid container spacing={2}>
            {data.map(d => (
                <Grid item xs={4}>
                    <Card >
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                image={d.avatar_url}
                                title={d.login}
                                className={classes.img}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {d.login}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Github: <a href={d.html_url} target="_blank">{d.html_url}</a> <br />
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>))}
        </Grid>
    </div>)

}