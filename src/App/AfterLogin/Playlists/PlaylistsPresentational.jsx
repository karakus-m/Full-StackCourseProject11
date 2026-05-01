import React from "react";
import PlaylistsElement from './PlaylistsElement/PlaylistsElement';
import PlaylistsCreate from './PlaylistsCreate/PlaylistsCreate';
import styles from './PlaylistsPresentational.module.css';

function PlaylistsPresentational({ playlists, onSelectClick, token, handleTriggeringEffect, playlistsTitleState, currentPosition, playerReady, playingPlaylistUri, playingSongPaused, onUpdateRequirement, handleClickedCreate, clickedCreate, clickedRename, handleClickedRename, selectedPlaylist, onBlockingStateChange, blocking}) {

    //Stling condition for h2 element
    const stylingCondition = () => {
        if(playlistsTitleState === 'paused'){
            return 'playlistPaused';
        }
        else if(playlistsTitleState === 'running') {
            return 'playlistRunning';
        }
        else{
            return '';
        }
    } 

    return (
        <div className={styles.playlists}>
            <h2 className={`${styles.title} ${styles[stylingCondition()]}`}>Playlists</h2>
            <ul className={styles.mainPlaylists}>
                {playlists.map((playlist) => <PlaylistsElement key={playlist.uri}
                    onSelectClick={onSelectClick}
                    playlist={playlist}
                    token={token}
                    onApplyClick={handleTriggeringEffect}
                    currentPosition={currentPosition}
                    playerReady={playerReady}
                    playingPlaylistUri={playingPlaylistUri}
                    playingSongPaused={playingSongPaused}
                    onUpdateRequirement={onUpdateRequirement}
                    onClickedRename={handleClickedRename}
                    blocking={blocking}
                    onBlockingStateChange={onBlockingStateChange}
                    selectedPlaylist={selectedPlaylist} />
                )
                }
            </ul>
            <PlaylistsCreate token={token}
                onSaveClick={handleTriggeringEffect}
                onClickedCreate={handleClickedCreate}
                clickedCreate={clickedCreate}
                blocking={blocking}
                onBlockingStateChange={onBlockingStateChange} />
        </div>
    );
};

export default PlaylistsPresentational;