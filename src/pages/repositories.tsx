import React from 'react';
import { getRepository, Order } from "../api/github";
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { FormControl, FormControlLabel, FormLabel, Grid, Paper, Radio, RadioGroup, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel } from '@material-ui/core';
import { Repository } from '../api/models/repository';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        visuallyHidden: {
            visibility: "hidden",
        },
    }),
);

export function Repositories() {
    const classes = useStyles();
    const [data, setData] = React.useState<Array<Repository>>([]);
    const [type, setType] = React.useState<string>('all');
    const [orderBy, setOrderBy] = React.useState<string>('all');
    const [order, setOrder] = React.useState<Order>('asc');

    React.useEffect(() => {
        const fetchData = async () => {
            const result = await getRepository(type, orderBy, order);
            setData(result)
        };

        fetchData();
    }, [type, orderBy, order])

    const handleChangeType = (event: React.ChangeEvent<HTMLInputElement>) => {
        setType((event.target as HTMLInputElement).value);
    };

    const handleChangeFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOrderBy((event.target as HTMLInputElement).value);
    };

    const createSortHandler = (property: string) => (event: React.MouseEvent<unknown>) => {
        setOrderBy(property);
        setOrder(order == 'asc' ? 'desc':'asc')
    };

    return (<div>
        <div>
            <FormControl component="fieldset">
                <FormLabel component="legend">Type</FormLabel>
                <RadioGroup aria-label="type" name="type" value={type} row onChange={handleChangeType}>
                    <FormControlLabel value="all" control={<Radio />} label="All" />
                    <FormControlLabel value="public" control={<Radio />} label="Public" />
                    <FormControlLabel value="private" control={<Radio />} label="Private" />
                </RadioGroup>
            </FormControl>
        </div>
        <Grid container spacing={2}>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell
                                sortDirection={orderBy === "full_name" ? order : false}>
                                <TableSortLabel
                                    active={orderBy === "full_name"}
                                    direction={orderBy === "full_name" ? order : 'asc'}
                                    onClick={createSortHandler("full_name")}
                                >
                                    Name
                                    {orderBy === "full_name" ? (
                                        <span className={classes.visuallyHidden}>
                                            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                        </span>
                                    ) : null}
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Visibility</TableCell>
                            <TableCell>Watchers</TableCell>
                            <TableCell>Forks</TableCell>
                            <TableCell>Open issues</TableCell>
                            <TableCell
                                sortDirection={orderBy === "created" ? order : false}>
                                <TableSortLabel
                                    active={orderBy === "created"}
                                    direction={orderBy === "created" ? order : 'asc'}
                                    onClick={createSortHandler("created")}
                                >
                                    Created
                                    {orderBy === "created" ? (
                                        <span className={classes.visuallyHidden}>
                                            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                        </span>
                                    ) : null}
                                </TableSortLabel></TableCell>
                            <TableCell
                                sortDirection={orderBy === "updated" ? order : false}>
                                <TableSortLabel
                                    active={orderBy === "updated"}
                                    direction={orderBy === "updated" ? order : 'asc'}
                                    onClick={createSortHandler("updated")}
                                >
                                    Updated
                                    {orderBy === "updated" ? (
                                        <span className={classes.visuallyHidden}>
                                            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                        </span>
                                    ) : null}
                                </TableSortLabel></TableCell>
                            <TableCell
                                sortDirection={orderBy === "pushed" ? order : false}>
                                <TableSortLabel
                                    active={orderBy === "pushed"}
                                    direction={orderBy === "pushed" ? order : 'asc'}
                                    onClick={createSortHandler("pushed")}
                                >
                                    Pushed
                                    {orderBy === "pushed" ? (
                                        <span className={classes.visuallyHidden}>
                                            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                        </span>
                                    ) : null}
                                </TableSortLabel></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map(d => (
                            <TableRow key={d.name}>
                                <TableCell component="th" scope="row">
                                    <a href={d.html_url} target="_blank">{d.name}</a>
                                </TableCell>
                                <TableCell>{d.description}</TableCell>
                                <TableCell align="right">{d.private ? "Private" : "Public"}</TableCell>
                                <TableCell align="right">{d.watchers}</TableCell>
                                <TableCell align="right">{d.forks}</TableCell>
                                <TableCell align="right">{d.open_issues}</TableCell>
                                <TableCell align="right">{formatDate(d.created_at)}</TableCell>
                                <TableCell align="right">{formatDate(d.updated_at)}</TableCell>
                                <TableCell align="right">{formatDate(d.pushed_at)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
    </div>)

}

const formatDate = (dateString: string): string => {
    var date = new Date(dateString);
    var options = { year: 'numeric', month: 'short', day: '2-digit' };
    return new Intl.DateTimeFormat('es-ES', options).format(date);
}