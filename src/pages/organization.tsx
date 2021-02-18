import React from 'react';
import { getOrganization } from "../api/github";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Organization as OrganizationModel } from "../api/models/organization";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        img: {
            width: 100,
        },
    }),
);

export function Organization() {
    const classes = useStyles();
    const [data, setData]= React.useState<OrganizationModel>();

    React.useEffect(() => {
        const fetchData = async () => {
            const result = await getOrganization();
            setData(result)
        };

        fetchData();
    }, [])
    return (<div>
        {data && <Card >
            <CardActionArea>
                <CardMedia
                    component="img"
                    image={data.avatar_url}
                    title={data.login}
                    className={classes.img}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {data!.description}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Github: <a href={data.html_url} target="_blank">{data.html_url}</a> <br />
                        Web: <a href={"http://"+data.blog} target="_blank">{data.blog}</a>
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>}
    </div>)

}