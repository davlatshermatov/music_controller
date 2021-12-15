import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";


const Room = () => {

    const [guestCanPause, setGuestCanPause] = useState(false);
    const [votesToSkip, setVotesToSkip] = useState(2);
    const [isHost, setIsHost] = useState(false);
    const roomCode = useParams().roomCode

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

    return (
        <div>
            <h1>Room</h1>
            <h3>{roomCode}</h3>
            <p>Votes : {votesToSkip}</p>
            <p>Guest can pause : {guestCanPause.toString()}</p>
            <p>Host : {isHost.toString()}</p>
        </div>
    );
};

export default Room;
