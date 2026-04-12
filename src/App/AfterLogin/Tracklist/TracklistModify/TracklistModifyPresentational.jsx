import React from "react";
import styles from './TracklistModifyPresentational.module.css'

function TracklistModifyPresentational ({areTracklistsDifferent, handleCancelEditsClick, handleSaveEditsClick}) {
    
    return (        
        <>    
            { 
                areTracklistsDifferent ?
                    (
                        <div className={styles.modifyTracklist}>
                            <button className={`${styles.button} ${styles.cancelButton}`} onClick={handleCancelEditsClick}></button>
                            <button className={`${styles.button} ${styles.saveButton}`} onClick={handleSaveEditsClick}></button>
                        </div>
                    ) :
                    null
            }
        </> 
    );
};

export default TracklistModifyPresentational;