import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));


const LocationInfo = () => {
    const { id } = useParams()
    console.log(id)
    const classes = useStyles();

    const [pointData, setPointData] = useState([]);
    const [dataReady, setDataReady] = useState(true);
    const [dataChangeUpvote, setDataChangeUpvote] = useState(false);
    const [dataChangeDownvote, setDataChangeDownvote] = useState(false);

    const upvoteChange = () => {
        fetch(`http://localhost:8000/api/update/${id}/`, {
            method: "patch",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            //make sure to serialize your JSON body
            body: JSON.stringify({
                upvotes: pointData.upvotes + 1,
            })
        })
        setDataChangeUpvote(true)
        setDataChangeDownvote(false)
    }

    const downvoteChange = () => {
        fetch(`http://localhost:8000/api/update/${id}/`, {
            method: "patch",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            //make sure to serialize your JSON body
            body: JSON.stringify({
                upvotes: pointData.upvotes - 1,
            })
        })
        setDataChangeDownvote(true)
        setDataChangeUpvote(false)
    }

    useEffect(() => {
        fetch(`http://localhost:8000/api/update/${id}`)
            .then(res => res.json())
            .then((repos) => {
                setPointData(repos)
            })
            .catch(setDataReady(false));
    }, [dataChangeUpvote, dataChangeDownvote])


    return (
        <div>
            {pointData.upvotes}
            <Button variant="contained" color="primary" onClick={upvoteChange}>
                Upvote
            </Button>
            <Button variant="contained" color="primary" onClick={downvoteChange}>
                Downvote
            </Button>
        </div>
    );
}

export default LocationInfo;