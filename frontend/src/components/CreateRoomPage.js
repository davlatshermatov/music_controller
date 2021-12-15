import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Grid from "@material-ui/core/Grid";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import React, {useState} from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import {useNavigate} from "react-router-dom";

const CreateRoomPage = () => {

        const [defaultVotes, setDefaultVotes] = useState(2);
        const [guestCanPause, setGuestCanPause] = useState(true);
        const [voutesToSkip, setVoutesToSkip] = useState(defaultVotes);
        const navigate = useNavigate();

        const handleVotesChange = (event) => {
            setVoutesToSkip(event.target.value);
        };

        const handleGuestCanPauseChange = (event) => {
            setGuestCanPause(event.target.value === 'true');
        };

        const handleRoomButtonClick = () => {
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    guest_can_pause: guestCanPause,
                    votes_to_skip: voutesToSkip
                })
            };
            fetch('/api/create-room', requestOptions)
                .then(response => response.json())
                .then(data => {
                    navigate('/room/' + data.code);
                });
        };

        return (
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <Typography component="h4" variant="h4">
                        Create
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormControl component="fieldset">
                        <FormHelperText>
                            <div align="center">Guest Control of Playback State</div>
                        </FormHelperText>
                        <RadioGroup row defaultValue="true" onChange={handleGuestCanPauseChange}>
                            <FormControlLabel
                                value="true"
                                control={<Radio color="primary"/>}
                                label="Play/Pause"
                                labelPlacement="bottom"
                            />
                            <FormControlLabel
                                value="false"
                                control={<Radio color="secondary"/>}
                                label="No Control"
                                labelPlacement="bottom"
                            />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormControl component="fieldset">
                        <TextField
                            required={true}
                            type="number"
                            defaultValue={defaultVotes}
                            inputProps={{min: "1", style: {textAlign: "center"}}}
                            onChange={(event) => handleVotesChange(event)}
                        />
                        <FormHelperText>
                            <div align="center">Votes Required To Skip Song</div>
                        </FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center">
                    <Button color="primary" variant="contained" onClick={handleRoomButtonClick}>Create A Room</Button>
                </Grid>
                <Grid item xs={12} align="center">
                    <Button
                        color="secondary"
                        variant="contained"
                        to="/"
                        component={Link}
                    >
                        Back
                    </Button>
                </Grid>
            </Grid>
        );
    }
;

export default CreateRoomPage;
