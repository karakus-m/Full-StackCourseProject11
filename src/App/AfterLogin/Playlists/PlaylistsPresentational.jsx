import React from "react";
import PlaylistsElement from './PlaylistsElement/PlaylistsElement';
import PlaylistsCreate from './PlaylistsCreate/PlaylistsCreate';
import styles from './PlaylistsPresentational.module.css';

function PlaylistsPresentational({ playlists, onSelectClick, token, handleTriggeringEffect }) {

    return (
        <div className={styles.playlists}>
            <h2 className={styles.title}>Playlists</h2>
            <ul className={styles.mainPlaylists}>
                {playlists.map((playlist) => <PlaylistsElement key={playlist.uri}
                    onSelectClick={onSelectClick}
                    playlist={playlist}
                    token={token}
                    onApplyClick={handleTriggeringEffect} />
                )
                }
            </ul>
            <PlaylistsCreate token={token}
                onSaveClick={handleTriggeringEffect} />
        </div>
    );
};

export default PlaylistsPresentational;