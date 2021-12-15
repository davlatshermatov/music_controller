import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {useNavigate} from "react-router-dom";
import CreateRoomPage from "./CreateRoomPage";


const Room = () => {

    const [guestCanPause, setGuestCanPause] = useState(false);
    const [votesToSkip, setVotesToSkip] = useState(2);
    const [isHost, setIsHost] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const roomCode = useParams().roomCode
    const navigate = useNavigate();

    useEffect(() => {
        getRoomDetails()
    }, [])

    const getRoomDetails = () => {
        fetch(`/api/get-room?code=${roomCode}`)
            .then(res => res.json())
            .then(data => {
                setGuestCanPause(data.guest_can_pause);
                setVotesToSkip(data.votes_to_skip);
                setIsHost(data.is_host);
            })
    }

    const leaveRoom = () => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
        };
        fetch(`/api/leave-room`, requestOptions).then(res => navigate("/"))
    }

    const toggleSettings = (value) => {
        setShowSettings(value)
    }

    const renderSettingsButton = () => {
        return (
            <Grid item xs={12} align="center">
                <Button variant="contained" color="primary" onClick={() => toggleSettings(true)}>
                    Settings
                </Button>
            </Grid>
        )
    }

    const renderSettings = () => {
        return (
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <CreateRoomPage
                        update={true}
                        votesToSkip={votesToSkip}
                        guestCanPause={guestCanPause}
                        roomCode={roomCode}
                        updateCallBack={() => {
                        }}
                    />
                </Grid>
                <Grid item xs={12} align="center">
                    <Button variant="contained" color="secondary" onClick={() => toggleSettings(false)}>
                        Close
                    </Button>
                </Grid>
            </Grid>
        )
    }


    return (
        showSettings ? renderSettings() : (
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <Typography variant="h4" component="h4">
                        Room Code: {roomCode}
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <Typography variant="h6" component="h6">
                        Votes to Skip: {votesToSkip}
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <Typography variant="h6" component="h6">
                        Guest Can Pause: {guestCanPause ? "Yes" : "No"}
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <Typography variant="h6" component="h6">
                        Host: {isHost ? "Yes" : "No"}
                    </Typography>
                </Grid>
                {isHost ? renderSettingsButton() : null}
                <Grid item xs={12} align="center">
                    <Button variant="contained" color="secondary" onClick={leaveRoom}>
                        Leave Room
                    </Button>
                </Grid>
            </Grid>
        )
    )
};

export default Room;
