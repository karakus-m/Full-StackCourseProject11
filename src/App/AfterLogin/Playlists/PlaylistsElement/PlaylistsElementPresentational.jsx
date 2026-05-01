import React from "react";
import styles from './PlaylistsElementPresentational.module.css';

function PlaylistsElementPresentational ({handleSelectPlaylistClick, playlist, clickedRename, newName, handleNewNameChange, handleApplyNewNameClick, handleCancelRenameClick, handleRenamePlaylist, playlistState, playerReady, handlePausePlaylistClick, handleResumeOrStartPlaylistClick, blocking}) {

    //Stling condition for li element
    const stylingCondition = () => {
        if(playlistState === 'paused'){
            return 'playlistPaused';
        }
        else if(playlistState === 'running') {
            return 'playlistRunning';
        }
        else{
            return '';
        }
    }

    //Stling condition for blocking
    const stylingCondition2 = () => {
        if(blocking === true){
            return 'blocked';
        }
        else if(blocking === false){
            return '';
        } else {
            console.error(`This is an non blocking error. \ Blocking state in PlaylistElementPresentational.jsx \ has found to be neither true nor false \ find the error. \ Possible error location: \ PlaylistElement.jsx \ If not debugged, server might get too many requests, resulting in a temporary fetch ban.`);
        }
    } 

    
    return (
        <li className={`${styles.playlist} ${styles[stylingCondition()]}`} >
            <div disabled={blocking}  className={`${styles.playlistImageContainer}  ${stylingCondition2()}`} onClick={handleSelectPlaylistClick}><img className={styles.playlistImage} src={playlist.image} alt="Playlist image" /></div>
            <p className={styles.totalSongs}>{playlist.totalNumberOfSongs}</p>
            <p className={`${styles.playlistName}`}>{playlist.name}</p>
            <div className={`${styles.buttonSection}`}>
                {clickedRename === true ?
                    (
                        <div className={`${styles.inputSection}`}>
                            <input className={styles.newNameInput} type='text' value={newName} onChange={handleNewNameChange}/>
                            <button className={`${styles.button} ${styles.applyButton} ${stylingCondition2()}`} onClick={handleApplyNewNameClick}></button>
                            <button className={`${styles.button} ${styles.cancelButton}`} onClick={handleCancelRenameClick}></button>
                        </div>
                    ) : 
                    (
                        <button className={`${styles.button} ${styles.renameButton} ${styles.renameSection }`} onClick={handleRenamePlaylist}></button>
                    )
                }
                {!playerReady || playlist.totalNumberOfSongs === 0 ? 
                    null :
                    playlistState === 'notStarted' || playlistState === 'paused' ?
                        (
                            <button disabled={blocking} className={`${stylingCondition2()} ${styles.button} ${styles.playButton}`} onClick={handleResumeOrStartPlaylistClick}></button>
                        ) :
                        (
                            <button disabled={blocking} className={`${stylingCondition2()} ${styles.button} ${styles.pauseButton}`} onClick={handlePausePlaylistClick}></button>
                        )
                }  
            </div>    

        </li>
    );
};

export default PlaylistsElementPresentational;