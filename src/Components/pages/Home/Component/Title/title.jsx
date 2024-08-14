import React, { useState, useEffect } from 'react';
import styles from './title.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
// import axios from 'axios';
import { useTickets } from '../../../ticketProvider';
const ProjectTitle = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        team: '',
        status: '',
        assignee: '',
        reporter: ''
    });

    const [existingTitles, setExistingTitles] = useState([]);
    const { tickets, addTicket } = useTickets();
    
    useEffect(() => {
        const titles = tickets.map(ticket => ticket.title.toLowerCase());
        setExistingTitles(titles);
    }, [tickets]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        const newErrors = {};
        Object.keys(formData).forEach(field => {
            if (!formData[field].trim()) {
                newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} cannot be empty.`;
            }
        });

        if (existingTitles.includes(formData.title.trim().toLowerCase())) {
            newErrors.title = 'Title already exists. Please use a different title.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleCreateTicket = async () => {
        if (!validateForm()) return;

        await addTicket(formData);  // Call the function from context
        setIsDialogOpen(false); // Close the dialog box
        setFormData({
            title: '',
            description: '',
            team: '',
            status: '',
            assignee: '',
            reporter: ''
        });
    };

    return (
        <div className={styles.titleContainer}>
            <div className={styles.heading}>
                Ticketing System
            </div>
            <div className={styles.buttonContainer}>
                <button className={styles.createButton} onClick={() => setIsDialogOpen(true)}>
                    <FontAwesomeIcon icon={faPlus} className={styles.icon} /> Create Ticket
                </button>
            </div>

            {isDialogOpen && (
                <div className={styles.dialog}>
                    <div className={styles.dialogContent}>
                        <h3>Create New Ticket</h3>
                        <input
                            type="text"
                            name="title"
                            placeholder="Title"
                            value={formData.title}
                            onChange={handleInputChange}
                            className={errors.title && styles.errorInput}
                        />
                        {errors.title && <span className={styles.errorText}>{errors.title}</span>}
                        <input
                            type="text"
                            name="description"
                            placeholder="Description"
                            value={formData.description}
                            onChange={handleInputChange}
                            className={errors.description && styles.errorInput}
                        />
                        {errors.description && <span className={styles.errorText}>{errors.description}</span>}
                        <input
                            type="text"
                            name="team"
                            placeholder="Team"
                            value={formData.team}
                            onChange={handleInputChange}
                            className={errors.team && styles.errorInput}
                        />
                        {errors.team && <span className={styles.errorText}>{errors.team}</span>}
                        <input
                            type="text"
                            name="status"
                            placeholder="Status"
                            value={formData.status}
                            onChange={handleInputChange}
                            className={errors.status && styles.errorInput}
                        />
                        {errors.status && <span className={styles.errorText}>{errors.status}</span>}
                        <input
                            type="text"
                            name="assignee"
                            placeholder="Assignee"
                            value={formData.assignee}
                            onChange={handleInputChange}
                            className={errors.assignee && styles.errorInput}
                        />
                        {errors.assignee && <span className={styles.errorText}>{errors.assignee}</span>}
                        <input
                            type="text"
                            name="reporter"
                            placeholder="Reporter"
                            value={formData.reporter}
                            onChange={handleInputChange}
                            className={errors.reporter && styles.errorInput}
                        />
                        {errors.reporter && <span className={styles.errorText}>{errors.reporter}</span>}
                        
                        <div className={styles.dialogActions}>
                            <button onClick={handleCreateTicket} className={styles.dialogButton}>Create</button>
                            <button onClick={() => setIsDialogOpen(false)} className={styles.dialogButton}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProjectTitle;

