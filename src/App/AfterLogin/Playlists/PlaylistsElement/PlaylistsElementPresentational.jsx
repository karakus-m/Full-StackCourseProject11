import React from "react";
import styles from './PlaylistsElementPresentational.module.css';

function PlaylistsElementPresentational ({handleSelectPlaylistClick, playlist, clickedRename, newName, handleNewNameChange, handleApplyNewNameClick, handleCancelRenameClick, handleRenamePlaylist }) {

    return (
        <li className={styles.playlist} >
            <p className={styles.playlistName} onClick={handleSelectPlaylistClick}>{playlist.name}</p>
            {clickedRename === true ?
                (
                    <div className={`${styles.renameSection} ${styles.inputSection}`}>
                        <input className={styles.newNameInput} type='text' value={newName} onChange={handleNewNameChange}/>
                        <button className={`${styles.button} ${styles.applyButton}`} onClick={handleApplyNewNameClick}></button>
                        <button className={`${styles.button} ${styles.cancelButton}`} onClick={handleCancelRenameClick}></button>
                    </div>
                ) : 
                (
                    <button className={`${styles.button} ${styles.renameButton} ${styles.renameSection }`} onClick={handleRenamePlaylist}></button>
                )
            }
        </li>
    );
};

export default PlaylistsElementPresentational;