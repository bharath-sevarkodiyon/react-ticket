import styles from './slider.module.css';
// import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faGear, faUser, faClipboardList, faPeopleGroup} from '@fortawesome/free-solid-svg-icons'
import logo from './images/Logo.png'
import { useNavigate } from 'react-router-dom';

const Slider = ()=>{
    let navigate = useNavigate();

    const loadHome = ()=>{
        navigate('/home')
    }

    const loadManageTicket = ()=>{
        navigate('/manageTicket')
    }
    const loadManageTeam = ()=>{
        navigate('/manageTeam')
    }

    const loadLogin = ()=>{
        const confirmed = window.confirm('Are you sure you want to logout?');
        if (confirmed) {
            navigate('/login');
        }
    }
    return(
        <div className={styles.background}>
            <section>
                <article className={styles.logoIcon}>
                    <img src={logo} alt="Logo" onClick={loadHome}/>
                </article>
                <article className={styles.iconList}>
                    <div className={styles.iconItem}>
                        <FontAwesomeIcon icon={faClipboardList} style={{color: "#ffffff",}} onClick={loadManageTicket}/>
                    </div>
                    <div className={styles.iconItem}>
                        <FontAwesomeIcon icon={faPeopleGroup} style={{color: "#ffffff",}} onClick={loadManageTeam}/>
                    </div>
                </article>
            </section>
            <section className={styles.bottomIcons}>
                <div className={styles.iconItem}>
                    <FontAwesomeIcon icon={faGear} style={{color: "#ffffff",}} />
                </div>
                <div className={styles.iconItem}>
                    <FontAwesomeIcon icon={faUser} style={{color: "#ffffff",}} onClick={loadLogin}/>
                </div>
            </section>
        </div>
    )
}
export default Slider