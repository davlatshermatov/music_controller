import React, {useEffect, useState} from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";


const HomePage = () => {

    const [roomCode, setRoomCode] = useState(null);
    const navigate = useNavigate();

    useEffect((() => {
        fetch('/api/user-in-room')
            .then((res) => res.json())
            .then((data) => {
                setRoomCode(data.code);
            });
    }), []);

    return (
        <div>
            {
                roomCode ? navigate(`/room/${roomCode}`) : (
                    <Grid container spacing={3}>
                        <Grid item xs={12} align="center">
                            <Typography variant="h3">
                                House Party
                            </Typography>
                        </Grid>
                        <Grid item xs={12} align="center">
                            <ButtonGroup color="primary" disableElevation variant="contained">
                                <Button color="primary" to="/join" component={Link}>Join a Room</Button>
                                <Button color="secondary" to="/create" component={Link}>Create a Room</Button>
                            </ButtonGroup>
                        </Grid>
                    </Grid>
                )
            }

        </div>
    );
};

export default HomePage;
