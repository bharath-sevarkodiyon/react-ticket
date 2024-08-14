import style from './home.module.css'
import Slider from './Component/Slider/slider'
import Title from './Component/Title/title'
import TicketDetails from './Component/TicketDetails/ticketDetails'
import TicketList from './Component/TicketList/ticketList'

const Home = ()=>{
    return(
        <div className={style.homeContainer}>
            <div className={style.outline}>
                <Slider/>
                <div className={style.widget}>
                    <Title/>
                    <TicketDetails/>
                    <TicketList/>
                </div>
            </div>
        </div>
    )
}

export default Home