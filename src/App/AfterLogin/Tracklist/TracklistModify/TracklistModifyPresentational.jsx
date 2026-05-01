import React from "react";
import styles from './TracklistModifyPresentational.module.css'

function TracklistModifyPresentational ({areTracklistsDifferent, handleCancelEditsClick, handleSaveEditsClick, blocking}) {
    
    //Stling condition for blocking
    const stylingCondition = () => {
        if(blocking === true){
            return 'blocked';
        }
        else if(blocking === false){
            return '';
        } else {
            console.error(`This is an non blocking error. \ Blocking state in ResultsSongPresentational.jsx \ has found to be neither true nor false \ find the error. \ Possible error location: \ ResultsSong.jsx \ If not debugged, server might get too many requests, resulting in a temporary fetch ban.`);
        }
    } 

    return (        
        <>    
            { 
                areTracklistsDifferent ?
                    (
                        <div className={styles.modifyTracklist}>
                            <button className={`${styles.button} ${styles.cancelButton}`} onClick={handleCancelEditsClick}></button>
                            <button disabled={blocking} className={`${stylingCondition()} ${styles.button} ${styles.saveButton}`} onClick={handleSaveEditsClick}></button>
                        </div>
                    ) :
                    null
            }
        </> 
    );
};

export default TracklistModifyPresentational;