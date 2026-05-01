import React from "react";
import Search from "./Search/Search";
import Player from './Player/Player';
import Results from "./Results/Results";
import Playlists from './Playlists/Playlists';
import Tracklist from './Tracklist/Tracklist';
import styles from './AfterLoginPresentational.module.css';

function AfterLoginPresentational({ handleSearch, token, results, modifiedTracklist, playlistSelected, handleAddToTrackList, handleRemoveFromTracklist, handlePlaylistSelection, handlePlaylistRerender, selectedPlaylist, handleModifiedTracklistUpdate, currentPosition, playerReady, playingPlaylistUri, playingSongPaused, playingSongUri, onUpdateRequirement, onBlockingStateChange, blocking, playingSongName, playingSongImage, playingSongDetails, isPlaying, currentSmartShuffleState, currentShuffleState, currentRepeatState, currentDeviceId, currentDeviceName, currentVolume, playingSongDuration, handleSettingPlayerReady }) {

    return (
        <div className={styles.content}>
            <Player blocking={blocking}
                    currentPosition={currentPosition}
                    currentRepeatState={currentRepeatState}
                    currentShuffleState={currentShuffleState}
                    currentSmartShuffleState={currentSmartShuffleState}
                    isPlaying={isPlaying}
                    onBlockingStateChange={onBlockingStateChange}
                    playingSongDetails={playingSongDetails}
                    playingSongImage={playingSongImage}
                    playingSongName={playingSongName}
                    token={token}
                    onUpdateRequirement={onUpdateRequirement}
                    playingPlaylistUri={playingPlaylistUri}
                    currentDeviceName={currentDeviceName}
                    currentDeviceId={currentDeviceId}
                    currentVolume={currentVolume}
                    playingSongDuration={playingSongDuration}
                    playingSongUri={playingSongUri}
                    handleSettingPlayerReady={handleSettingPlayerReady} />
            <div className={styles.search}>
                <Search onSearch={handleSearch}
                    token={token} />
                <Results results={results}
                    modifiedTracklist={modifiedTracklist}
                    playlistSelected={playlistSelected}
                    onAdd={handleAddToTrackList}
                    onRemove={handleRemoveFromTracklist}
                    currentPosition={currentPosition}
                    playerReady={playerReady}
                    playingPlaylistUri={playingPlaylistUri}
                    playingSongPaused={playingSongPaused}
                    playingSongUri={playingSongUri}
                    token={token}
                    onUpdateRequirement={onUpdateRequirement}
                    onBlockingStateChange={onBlockingStateChange}
                    blocking={blocking}/>
            </div>
            <Playlists token={token}
                onSelectClick={handlePlaylistSelection}
                onPlaylistsRerender={handlePlaylistRerender}
                currentPosition={currentPosition}
                playerReady={playerReady}
                playingPlaylistUri={playingPlaylistUri}
                playingSongPaused={playingSongPaused}
                onUpdateRequirement={onUpdateRequirement}
                blocking={blocking}
                onBlockingStateChange={onBlockingStateChange}
                selectedPlaylist={selectedPlaylist} />
            <Tracklist token={token}
                selectedPlaylist={selectedPlaylist}
                playlistSelected={playlistSelected}
                modifiedTracklist={modifiedTracklist}
                onModifiedTracklistUpdate={handleModifiedTracklistUpdate}
                onRemove={handleRemoveFromTracklist}
                currentPosition={currentPosition}
                playerReady={playerReady}
                playingPlaylistUri={playingPlaylistUri}
                playingSongPaused={playingSongPaused}
                playingSongUri={playingSongUri}
                blocking={blocking}
                onBlockingStateChange={onBlockingStateChange} />
        </div>
    );
};

export default AfterLoginPresentational;
