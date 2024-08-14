import React from 'react';
import styles from './ticketDetails.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faHourglassHalf, faTicketAlt } from '@fortawesome/free-solid-svg-icons';
import { useTickets } from '../../../ticketProvider';

const TicketDetails = () => {
    const {tickets} = useTickets();

    const openCount = tickets.filter(ticket => ticket.status.toLowerCase() === 'open').length;
    const inprogressCount = tickets.filter(ticket => ticket.status.toLowerCase() === 'inprogress').length;
    const closedCount = tickets.filter(ticket => ticket.status.toLowerCase() === 'closed').length;

    return (
        <div className={styles.ticketDetails}>
            <div className={styles.detailBox}>
                <FontAwesomeIcon icon={faTicketAlt} className={styles.icon} />
                <div className={styles.textContent}>
                    <span className={styles.statusText}>Open</span>
                    <span className={styles.ticketCount}>{openCount}</span>
                </div>
            </div>

            <div className={styles.detailBox}>
                <FontAwesomeIcon icon={faHourglassHalf} className={styles.icon}/>
                <div className={styles.textContent}>
                    <span className={styles.statusText}>Inprogress</span>
                    <span className={styles.ticketCount}>{inprogressCount}</span>
                </div>
            </div>

            <div className={styles.detailBox}>
                <FontAwesomeIcon icon={faCircleCheck} className={styles.icon} />
                <div className={styles.textContent}>
                    <span className={styles.statusText}>Closed</span>
                    <span className={styles.ticketCount}>{closedCount}</span>
                </div>
            </div>
        </div>
    );
}

export default TicketDetails;
