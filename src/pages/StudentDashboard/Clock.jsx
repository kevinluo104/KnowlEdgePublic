import React, {useEffect, useState} from 'react' // https://www.youtube.com/watch?v=xQOeltgbuTM&ab_channel=SamLama
import "./Clock.css";

export const Clock = () => {
    const [clockState, setClockState] = useState();


    useEffect(() => {
        setInterval(() => {
            const date = new Date();
            
            setClockState(`${date.toLocaleDateString()}  ${date.toLocaleTimeString()}`);
        }, 1000); 
    }, [])

    return (
        <div className = "clock-container" style = {{fontSize: "25px", margin: "20px"}}>
            {clockState} Vancouver Time
        </div>
    )
}

export default Clock;