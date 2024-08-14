import React from 'react';
import styles from './ticketList.module.css';
import { useTickets } from '../../../ticketProvider';

const TicketList = () => {
    const {tickets} = useTickets();

    function capitalizeFirstLetter(str) {
        if (!str) return ''; // Handle empty strings
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    return (
        <div className={styles.tableContainer}>
            <table className={styles.ticketTable}>
                <thead>
                    <tr>
                        <th>Ticket ID</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Team</th>
                        <th>Assignee</th>
                        <th>Reporter</th>
                    </tr>
                </thead>
                <tbody>
                    {tickets.map((ticket, index) => (
                        <tr key={index}>
                            <td>{ticket.ticketId}</td>
                            <td>{ticket.title}</td>
                            <td>{ticket.description}</td>
                            <td className={styles[ticket.status.toLowerCase().replace(" ", "")]}>
                                {capitalizeFirstLetter(ticket.status)}
                            </td>
                            <td>{ticket.team}</td>
                            <td>{ticket.assignee}</td>
                            <td>{ticket.reporter}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TicketList;
