import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const TeamContext = createContext();

export const useTeams = () => {
    return useContext(TeamContext);
};

export const TeamProvider = ({ children }) => {
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await axios.get('http://localhost:5000/teams');
                setTeams(response.data.ReceivedData);
            } catch (error) {
                console.error('Error fetching team data:', error);
            }
        };

        fetchTeams();
    }, []);

    const addTeam = async (newTeam) => {
        try {
            const response = await axios.post('http://localhost:5000/teams', newTeam);
            setTeams(prevTeams => [...prevTeams, response.data.ReceivedData]);
        } catch (error) {
            console.error('Error adding team:', error);
        }
    };

    const updateTeam = async (teamId, updatedTeam) => {
        try {
            const response = await axios.patch(`http://localhost:5000/teams/${teamId}`, updatedTeam);
            setTeams(prevTeams => prevTeams.map(team => (team.teamId === teamId ? response.data.UpdatedData : team)));
        } catch (error) {
            console.error('Error updating team:', error);
        }
    };

    const deleteTeam = async (teamId) => {
        try {
            await axios.delete(`http://localhost:5000/teams/${teamId}`);
            setTeams(prevTeams => prevTeams.filter(team => team.teamId !== teamId));
        } catch (error) {
            console.error('Error deleting team:', error);
        }
    };

    return (
        <TeamContext.Provider value={{ teams, addTeam, updateTeam, deleteTeam }}>
            {children}
        </TeamContext.Provider>
    );
};
