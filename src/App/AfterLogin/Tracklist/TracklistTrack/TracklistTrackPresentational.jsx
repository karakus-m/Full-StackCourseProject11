import React from "react";
import styles from './TracklistTrackPresentational.module.css';

function TracklistTrackPresentational({ track, handleRemoveFromTracklistClick, playerReady, tracklistTrackState, handleResumeOrStartTrackClick, handlePauseTrackClick, originalTracklist }) {


    const buttonElement2 = () => {
        if (!playerReady || !originalTracklist.map((item) => item.id).includes(track.id)) {
            return null
        } else if (tracklistTrackState === "notStarted" || tracklistTrackState === "paused") {
            return (
                <button className={`${styles.button} ${styles.playButton}`} onClick={handleResumeOrStartTrackClick}></button>
            )
        } else {
            return (
                <button className={`${styles.button} ${styles.pauseButton}`} onClick={handlePauseTrackClick}></button>
            )
        }
    }

    //Stling condition for li element
    const stylingCondition = () => {
        if (tracklistTrackState === 'paused') {
            return 'tracklistTrackPaused';
        }
        else if (tracklistTrackState === 'running') {
            return 'tracklistTrackRunning';
        }
        else {
            return '';
        }
    }

    return (
        <li className={`${styles.tracklistTrack} ${styles[stylingCondition()]}`}>
            <div className={styles.songImageContainer}><a href={track.link} target={"_blank"}><img className={styles.songImage} src={track.image} alt="Track image" /></a></div>
            <p className={styles.songName}> {track.name}</p>
            <p className={styles.artist}>{track.artists.map((artist, index) => (
                <span key={artist.uri}><a href={artist.external_urls.spotify} target={"_blank"}>{artist.name}</a>{index<(artist.length - 1) ? ", " : ""}</span>
                ))}
            </p>
            <p className={styles.album}> {<a href={track.albumLink} target={"_blank"}>{track.album}</a>}</p>
            <div className={styles.buttonSection}>
                {
                    buttonElement2()
                }
                <button className={`${styles.button} ${styles.removeButton}`} onClick={handleRemoveFromTracklistClick}></button>
            </div>
        </li>
    );
};

export default TracklistTrackPresentational;