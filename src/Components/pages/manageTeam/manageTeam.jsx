import React, { useState } from 'react';
import { useTeams } from '../teamProvider';
import styles from './manageTeam.module.css';

const ManageTeam = () => {
    const { teams, addTeam, updateTeam, deleteTeam } = useTeams();
    const [editTeam, setEditTeam] = useState(null);
    const [newTeam, setNewTeam] = useState({ teamName: '', members: [] });
    const [deleteTeamId, setDeleteTeamId] = useState(null);
    const [showAddTeamPopup, setShowAddTeamPopup] = useState(false);

    const handleEdit = (team) => {
        setEditTeam(team);
    };

    const handleDelete = (teamId) => {
        setDeleteTeamId(teamId);
    };

    const handleSaveEdit = () => {
        if (editTeam) {
            updateTeam(editTeam.teamId, editTeam);
            setEditTeam(null);
        }
    };

    const handleAddTeam = () => {
        addTeam(newTeam);
        setNewTeam({ teamName: '', members: [] });
        setShowAddTeamPopup(false)
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewTeam({ ...newTeam, [name]: value });
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditTeam({ ...editTeam, [name]: value });
    };

    return (
        <div className={styles.container}>
            <button className={styles.backButton} onClick={() => window.history.back()}>Back</button>

            <h1>Manage Teams</h1>

            <div className={styles.alignRight}>
                <button className={styles.addButton} onClick={() => setShowAddTeamPopup(true)}>Add Team</button>
            </div>

            {/* Add Team Form */}
            {showAddTeamPopup && (
                <div className={styles.dialogOverlay}>
                    <div className={styles.dialogBox}>
                        <h2>Add New Team</h2>
                        <label>Team Name</label>
                        <input name="teamName" value={newTeam.teamName} onChange={handleChange} />
                        <label>Members (comma separated)</label>
                        <input
                            name="members"
                            value={newTeam.members.join(', ')}
                            onChange={(e) => setNewTeam({ ...newTeam, members: e.target.value.split(',').map(member => member.trim()) })}
                        />
                        <div className={styles.dialogActions}>
                            <button className={styles.saveButton} onClick={handleAddTeam}>Add Team</button>
                            <button className={styles.cancelButton} onClick={() => setShowAddTeamPopup(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Team Form */}
            {editTeam && (
                <div className={styles.dialogOverlay}>
                    <div className={styles.dialogBox}>
                        <h2>Edit Team</h2>
                        <label>Team Name</label>
                        <input name="teamName" value={editTeam.teamName} onChange={handleEditChange} />
                        <label>Members (comma separated):</label>
                        <input name="members" value={editTeam.members.join(', ')} onChange={(e) => setEditTeam({ ...editTeam, members: e.target.value.split(',').map(member => member.trim()) })} />
                        <div className={styles.dialogActions}>
                            <button className={styles.saveButton} onClick={handleSaveEdit}>Save</button>
                            <button className={styles.cancelButton} onClick={() => setEditTeam(null)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Confirm Delete */}
            {deleteTeamId !== null && (
                <div className={styles.dialogOverlay}>
                    <div className={styles.dialogBox}>
                        <h2>Confirm Deletion</h2>
                        <p>Are you sure you want to delete this team?</p>
                        <div className={styles.dialogActions}>
                            <button className={styles.deleteConfirmButton} onClick={() => {
                                deleteTeam(deleteTeamId);
                                setDeleteTeamId(null);
                            }}>Yes</button>
                            <button className={styles.cancelButton} onClick={() => setDeleteTeamId(null)}>No</button>
                        </div>
                    </div>
                </div>
            )}

            <div className={styles.tableContainer}>
                <table className={styles.teamTable}>
                    <thead>
                        <tr>
                            <th>Team Name</th>
                            <th>Members</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teams.length > 0 ? (
                            teams.map((team) => (
                                <tr key={team.teamId}>
                                    <td>{team.teamName}</td>
                                    <td>{team.members.join(', ')}</td>
                                    <td>
                                        <button className={styles.editButton} onClick={() => handleEdit(team)}>Edit</button>
                                        <button className={styles.deleteButton} onClick={() => handleDelete(team.teamId)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3">No Teams Available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageTeam;
