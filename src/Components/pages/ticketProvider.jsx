import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const TicketContext = createContext();

export const useTickets = () => {
    return useContext(TicketContext);
};

export const TicketProvider = ({ children }) => {
    const [tickets, setTickets] = useState([]);

    const fetchTickets = async () => {
        try {
            const response = await axios.get('http://localhost:5000/tickets');
            setTickets(response.data.ReceivedData);
        } catch (error) {
            console.error('Error fetching ticket data:', error);
        }
    };

    useEffect(() => {
        fetchTickets();
    }, []);

    const addTicket = async (newTicket) => {
        try {
            const response = await axios.post('http://localhost:5000/tickets', newTicket);
            setTickets(prevTickets => [...prevTickets, response.data.ReceivedData]);
        } catch (error) {
            console.error('Error creating ticket:', error);
        }
    };

    const updateTicket = async (updatedTicket) => {
        try {
            const response = await axios.patch(`http://localhost:5000/tickets/${updatedTicket.ticketId}`, updatedTicket);
            setTickets(prevTickets =>
                prevTickets.map(ticket =>
                    ticket.ticketId === updatedTicket.ticketId ? response.data.UpdatedData : ticket
                )
            );
        } catch (error) {
            console.error('Error updating ticket:', error);
        }
    };

    const deleteTicket = async (ticketId) => {
        try {
            await axios.delete(`http://localhost:5000/tickets/${ticketId}`);
            setTickets(prevTickets => prevTickets.filter(ticket => ticket.ticketId !== ticketId));
        } catch (error) {
            console.error('Error deleting ticket:', error);
        }
    };

    return (
        <TicketContext.Provider value={{ tickets, addTicket, updateTicket, deleteTicket }}>
            {children}
        </TicketContext.Provider>
    );
};