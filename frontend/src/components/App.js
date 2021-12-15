import React from "react";
import HomePage from "./HomePage";
import {Route, Routes} from "react-router-dom";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import Room from "./Room";

const App = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/join" element={<RoomJoinPage/>}/>
                <Route path="/create" element={<CreateRoomPage/>}/>
                <Route path="/room/:roomCode" element={<Room/>}/>
            </Routes>
        </div>
    );
};

export default App;
