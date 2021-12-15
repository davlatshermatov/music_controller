import React, {useState} from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography"
import {Link} from "react-router-dom";


const RoomJoinPage = () => {

    const [roomCode, setRoomCode] = useState("");
    const [error, setError] = useState("");

    const handleRoomCodeChange = (event) => {
        setRoomCode(event.target.value);
    }

    const handleEnterRoom = (event) => {
        // event.preventDefault();
        // if (roomCode.length === 0) {
        //     setError("Please enter a room code.");
        // } else {
        //     setError("");
        //     window.location.href = "/room/" + roomCode;
        // }
        console.log("room code: " + roomCode);
    }

    return (
        <div>
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <Typography variant="h4" component="h4" gutterBottom>
                        Join a room
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <TextField
                        label="Code"
                        error={error}
                        placeholder="Enter a Room Code"
                        value={roomCode}
                        helperText={error}
                        variant="outlined"
                        onChange={handleRoomCodeChange}
                    />
                </Grid>
                <Grid item xs={12} align="center">
                    <Button variant="contained" color="primary" onClick={handleEnterRoom}>
                        Join
                    </Button>
                </Grid>
                <Grid item xs={12} align="center">
                    <Button variant="contained" color="secondary" to="/" component={Link}>
                        Back
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
};

export default RoomJoinPage;
