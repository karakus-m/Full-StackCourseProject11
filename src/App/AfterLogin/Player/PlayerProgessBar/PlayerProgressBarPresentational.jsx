import React from "react";
import styles from './PlayerProgressBarPresentational.module.css';

function PlayerProgressBarPresentational({blocking, handleMouseDown, handleMouseUp, handlePositionChange, shownPosition, currentDuration, shownPositionInMinutes, shownDurationInMinutes}) {

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
        <div className={`${styles.progressBar}`}>
            <input disabled={blocking} className={`${stylingCondition()} ${styles.inputBar}`} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onChange={handlePositionChange} value={shownPosition} type="range" step={1} min={0} max={Math.round(currentDuration/1000)}/>
            <div className={`${styles.progressSection}`}>
                <p className={`${styles.progress}`}>{shownPositionInMinutes}</p>
                <p className={`${styles.slash}`}>{` / `}</p>
                <p className={`${styles.duration}`}>{shownDurationInMinutes}</p>
            </div>
  
        </div>
    );
}

export default PlayerProgressBarPresentational;