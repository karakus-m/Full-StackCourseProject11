import React from "react";
import styles from './ResultsSongPresentational.module.css';

function ResultsSongPresentational({song, modifiedTracklist, playlistSelected, handleRemoveFromPlaylistClick, handleAddToPlaylistClick}) {
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

    return (
        <li className={styles.resultsSong}>
            <p className={styles.songName}>{song.name}</p>
            <p className={styles.artist}>{song.artists.join(', ')}</p>
            <p className={styles.album}> {song.album}</p>
            {buttonElement()}
        </li>
    );
};

export default ResultsSongPresentational;