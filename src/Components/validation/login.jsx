import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from './login.module.css';

const Login = () => {
    let [emailId, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [response, setResponse] = useState("");
    let navigate = useNavigate();

    let updateEmail = (data) => {
        setEmail(data.target.value);
    };

    let updatePassword = (data) => {
        setPassword(data.target.value);
    };

    let handler = async (e) => {
        e.preventDefault();
        const body = { emailId, password };
        try {
            const resLogin = await axios.post(`http://localhost:5000/login/`, body);
            localStorage.setItem('authToken', resLogin.data.token);
            navigate('/home');
            setEmail("");
            setPassword("");
            setResponse(resLogin.data.Message);
            // setTimeout(()=>{
            // }, 2000)
        } catch (error) {
            setEmail("");
            setPassword("");
            setResponse(error.response.data.Message);
        };
    };

    // Function to navigate to the signUp page
    let goToSignUp = () => {
        localStorage.removeItem('authToken');
        navigate('/signUp');
    };

    return (
        <div className={styles.body}>
            <form action="#" className={styles.form}>
                <h3 className={styles.title}>Login</h3>
                <table className={styles.table}>
                    <tbody>
                        <tr>
                            <td className={styles.td}>Email:</td>
                            <td><input type="email" onChange={updateEmail} value={emailId} className={styles.inputField} /></td>
                        </tr>
                        <tr>
                            <td className={styles.td}>Password:</td>
                            <td><input type="password" onChange={updatePassword} value={password} className={styles.inputField} /></td>
                        </tr>
                    </tbody>
                </table>
                <div className={styles.divContainer}>
                    <button type="submit" onClick={handler} className={`${styles.button} ${styles.submitButton}`}>Login</button>
                </div>
                <h5 className={styles.responseMessage}>{response}</h5>
                <button className={`${styles.button} ${styles.newAccount}`} onClick={goToSignUp}>Don't have an account?</button>
            </form>
        </div>
    );
};

export default Login;
