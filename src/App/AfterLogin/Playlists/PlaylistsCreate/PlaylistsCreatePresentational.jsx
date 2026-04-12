import React from "react";
import styles from './PlaylistsCreatePresentational.module.css';

function PlaylistsCreatePresentational ({clickedCreate, newPlaylistName, handleNewPlaylistNameChange, handleSavePlaylistClick, handleCancelPlaylistClick, handleCreatePlaylistClick}) {

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
                            <button className={`${styles.button} ${styles.saveButton}`} onClick={handleSavePlaylistClick}></button>
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