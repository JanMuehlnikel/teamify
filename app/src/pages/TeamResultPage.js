import React, { useContext } from "react";
import useFetch from "react-fetch-hook";
import { useNavigate } from "react-router-dom";
import { Team } from "../context/context";

function TeamResultPage() {

    const { teamName, setTeam } = useContext(Team)
    const navigate = useNavigate();

    const { isLoading, data, error } = useFetch("http://localhost:8080/api/user/getteamresult/" + teamName);

    if (isLoading) {
        return <div>IS loading</div>
    }

    if (error) {
        return <div>Fehler beim laden der Userdaten! Bitte starte den Rest Server</div>
    }

    function showTeam() {
        return(
            data.map(user => {
                console.log(user)
                return(
                <h1>{user.name} {user.color}</h1 >
            ) 
        }))
}

return (

    <><h1>x{console.log(data)}</h1>
    
    <div>{showTeam()}</div></>
)

}

export default TeamResultPage