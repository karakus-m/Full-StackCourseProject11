import React from "react";
import styles from "./PlayerVolumePresentational.module.css";

function PlayerVolumePresentational({blocking, shownVolume, handleInputChange, handleMouseDown, handleVolumeChangeMouseUp}) {

    //Stling condition for blocking
    const stylingCondition = () => {
        if(blocking === true){
            return 'blocked';
        }
        else if(blocking === false){
            return '';
        } else {
            console.error(`This is an non blocking error. \ Blocking state in PlayerVolume.jsx \ has found to be neither true nor false \ find the error. \ If not debugged, server might get too many requests, resulting in a temporary fetch ban.`);
        }
    } 

    return (
        <div className={`${styles.volumeSection}`}>
            <input disabled={blocking} step={1} className={`${stylingCondition()} ${styles.inputBar}`} value={shownVolume ?? 0} type="range" step={1} max={100} min={0} onChange={handleInputChange} onMouseDown={handleMouseDown} onMouseUp={handleVolumeChangeMouseUp}/>
            <p className={`${styles.volumeLevel}`}>{shownVolume}</p>
        </div>
    );  
}

export default PlayerVolumePresentational;