import React, { useState } from 'react';
import styles from './manageTicket.module.css';
import { useTickets } from '../ticketProvider';

const ManageTicket = () => {
    const { tickets, updateTicket, deleteTicket } = useTickets();
    console.log(tickets);
    
    const [editTicket, setEditTicket] = useState(null);
    const [deleteTicketId, setDeleteTicketId] = useState(null);

    const handleEdit = (ticket) => {
        setEditTicket(ticket);
    };

    // const handleDelete = async (ticketId) => {
    //     setDeleteTicketId(ticketId);
    // };

    const handleSaveEdit = async () => {
        if (editTicket) {
            await updateTicket(editTicket);
            setEditTicket(null);
        }
    };

    const handleConfirmDelete = async () => {
        if (deleteTicketId) {
            await deleteTicket(deleteTicketId);
            setDeleteTicketId(null);
        }
    };

    function capitalizeFirstLetter(str) {
        if (!str) return ''; // Handle empty strings
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditTicket({ ...editTicket, [name]: value });
    };

    return (
        <div className={styles.container}>
            <button className={styles.backButton} onClick={() => window.history.back()}>Back</button>
            <h4>Manage Ticket</h4>
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
                            <th>Actions</th>
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
                                <td >
                                    <button className={styles.editButton} onClick={() => handleEdit(ticket)}>Edit</button>
                                    <button className={styles.deleteButton} onClick={() => setDeleteTicketId(ticket.ticketId)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {editTicket && (
                <div className={styles.dialogOverlay}>
                    <div className={styles.dialogBox}>
                        <h2>Edit Ticket</h2>
                        <label>Title:</label>
                        <input name="title" value={editTicket.title} onChange={handleChange} />
                        <label>Description:</label>
                        <input name="description" value={editTicket.description} onChange={handleChange} />
                        <label>Status:</label>
                        <input name="status" value={editTicket.status} onChange={handleChange} />
                        <label>Team:</label>
                        <input name="team" value={editTicket.team} onChange={handleChange} />
                        <label>Assignee:</label>
                        <input name="assignee" value={editTicket.assignee} onChange={handleChange} />
                        <label>Reporter:</label>
                        <input name="reporter" value={editTicket.reporter} onChange={handleChange} />
                        <div className={styles.dialogActions}>
                            <button className={styles.saveButton} onClick={handleSaveEdit}>Save</button>
                            <button className={styles.cancelButton} onClick={() => setEditTicket(null)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            {deleteTicketId !== null && (
                <div className={styles.dialogOverlay}>
                    <div className={styles.dialogBox}>
                        <h2>Confirm Deletion</h2>
                        <p>Are you sure you want to delete this ticket?</p>
                        <div className={styles.dialogActions}>
                            <button className={styles.deleteConfirmButton} onClick={handleConfirmDelete}>Yes</button>
                            <button className={styles.cancelButton} onClick={() => setDeleteTicketId(null)}>No</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageTicket;
