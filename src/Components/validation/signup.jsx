import React, { useState } from "react"
import axios from "axios";
import styles from './login.module.css'
import { useNavigate } from "react-router-dom";

let Signup = ()=>{
    let [emailId, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [response, setResponse] = useState("");
    let navigate = useNavigate();

    let updateEmail = (data)=>{
        setEmail(data.target.value);
    }

    let updatePassword = (data)=>{
        setPassword(data.target.value)
    }
    
    let handler = async (e)=>{
        e.preventDefault();
        const body = {
            emailId,
            password
        }
        try{
            const resSignIn = await axios.post(`http://localhost:5000/signUp/`, body)
            setEmail("")
            setPassword("")
            setTimeout(()=>{
                navigate('/login');
            }, 2000)
            setResponse(resSignIn.data.Message);
        }
        catch(error){
            setEmail("")
            setPassword("")
            setResponse(error.response.data.Message);
        };
    }

    return(
        <div className={styles.body}>
            <form action="#" className={styles.form}>
                <h3 className={styles.title}>Sign up</h3>
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
                    <button type="submit" onClick={handler} className={`${styles.button} ${styles.submitButton}`}>Signup</button>
                </div>
                <h5 className={styles.responseMessage}>{response}</h5>
            </form>
        </div>
    )
}
export default Signup