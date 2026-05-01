import React from "react";
import styles from './PlaylistsCreatePresentational.module.css';

function PlaylistsCreatePresentational ({clickedCreate, newPlaylistName, handleNewPlaylistNameChange, handleSavePlaylistClick, handleCancelPlaylistClick, handleCreatePlaylistClick, blocking}) {

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
                clickedCreate === true ?
                    (
                        <div className={`${styles.createPlaylistSection} ${styles.inputSection}`}>
                            <input className={styles.playlistNameInput} value={newPlaylistName}
                                   placeholder='Please enter a name for the new playlist'
                                   type='text' 
                                   onChange={handleNewPlaylistNameChange} />
                            <button disabled={blocking} className={`${stylingCondition()} ${styles.button} ${styles.saveButton}`} onClick={handleSavePlaylistClick}></button>
                            <button className={`${styles.button} ${styles.cancelButton}`} onClick={handleCancelPlaylistClick} ></button>
                        </div>
                    ) :
                    (
                        <button className={`${styles.createPlaylistSection} ${styles.button} ${styles.playlistCreateButton}`} onClick={handleCreatePlaylistClick}></button>
                    )                    
            }
        </> 
    );
};

export default PlaylistsCreatePresentational;