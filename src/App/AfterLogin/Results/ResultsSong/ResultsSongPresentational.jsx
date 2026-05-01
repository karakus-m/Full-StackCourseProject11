import React from "react";
import styles from './ResultsSongPresentational.module.css';

function ResultsSongPresentational({song, modifiedTracklist, playlistSelected, handleRemoveFromPlaylistClick, handleAddToPlaylistClick, playerReady, resultsSongState, handleResumeOrStartSongClick, handlePauseSongClick, blocking}) {

    //Stling condition for blocking
    const stylingCondition2 = () => {
        if(blocking === true){
            return 'blocked';
        }
        else if(blocking === false){
            return '';
        } else {
            console.error(`This is an non blocking error. \ Blocking state in ResultsSongPresentational.jsx \ has found to be neither true nor false \ find the error. \ Possible error location: \ ResultsSong.jsx \ If not debugged, server might get too many requests, resulting in a temporary fetch ban.`);
        }
    } 

    //Conditional Jsx to render
    const buttonElement = () => {
        const songUri = song.uri; //Song uri in string form
        const modifiedTracklistUriArray = modifiedTracklist.map((track) => track.uri); //Modified tracklist uri strings in array form.
        if(playlistSelected === false) {
            return null;
        } else if (modifiedTracklistUriArray.includes(songUri)) {
            return (
                <button className={`${styles.removeButton} ${styles.button}`} onClick={handleRemoveFromPlaylistClick}></button>
            );
        } else {
            return (
                <button className={`${styles.addButton} ${styles.button}`}onClick={handleAddToPlaylistClick}></button>
            )
        }
    };
    //Conditional Jsx to render
    const buttonElement2 = () => {
        if(playerReady === false) {
            return null;
        } else if (resultsSongState === 'notStarted' || resultsSongState === 'paused') {
            return (
                <button disabled={blocking} className={`${styles.playButton} ${stylingCondition2()} ${styles.button}`} onClick={handleResumeOrStartSongClick}></button>
            );
        } else {
            return (
                <button disabled={blocking} className={`${styles.pauseButton} ${stylingCondition2()} ${styles.button}`} onClick={handlePauseSongClick}></button>
            )
        }
    };

    //Stling condition for li element
    const stylingCondition = () => {
        if(resultsSongState === 'paused'){
            return 'resultsSongPaused';
        }
        else if(resultsSongState === 'running') {
            return 'resultsSongRunning';
        }
        else{
            return '';
        }
    } 

    return (
        <li className={`${styles.resultsSong} ${styles[stylingCondition()]}`}>
            <div className={styles.songImageContainer}><a href={song.link} target={"_blank"}><img className={styles.songImage} src={song.image} alt="Song image"/></a></div>
            <p className={styles.songName}>{song.name}</p>
            <p className={styles.artist}>{song.artists.map((artist, index) => (
                <span key={artist.uri}><a href={artist.external_urls.spotify} target={"_blank"}>{artist.name}</a>{index<(artist.length - 1) ? ", " : ""}</span>
            ))}</p>
            <p className={styles.album}> {<a href={song.albumLink} target={"_blank"}>{song.album}</a>}</p>
            <div className={styles.buttonSection}>
                {buttonElement()}
                {buttonElement2()}
            </div>
        </li>
    );
};

export default ResultsSongPresentational;