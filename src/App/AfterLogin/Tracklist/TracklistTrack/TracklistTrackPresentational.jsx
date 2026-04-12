import React from "react";
import styles from './TracklistTrackPresentational.module.css';

function TracklistTrackPresentational ({track, handleRemoveFromTracklistClick}) {
    
    return (
        <li className={styles.tracklistTrack}>
            <p className={styles.songName}> {track.name}</p>
            <p className={styles.artist}> {track.artists.join(', ')}</p>
            <p className={styles.album}> {track.album}</p>
            <button className={styles.button} onClick={handleRemoveFromTracklistClick}></button>
        </li>
    );
};

export default TracklistTrackPresentational;