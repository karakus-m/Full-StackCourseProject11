import React from "react";
import Search from "./Search/Search";
import Results from "./Results/Results";
import Playlists from './Playlists/Playlists';
import Tracklist from './Tracklist/Tracklist';
import styles from './AfterLoginPresentational.module.css';

function AfterLoginPresentational({ handleSearch, token, results, modifiedTracklist, playlistSelected, handleAddToTrackList, handleRemoveFromTracklist, handlePlaylistSelection, handlePlaylistRerender, selectedPlaylist, handleModifiedTracklistUpdate }) {

    return (
        <div className={styles.content}>
            <div className={styles.search}>
                <Search onSearch={handleSearch}
                    token={token} />
                <Results results={results}
                    modifiedTracklist={modifiedTracklist}
                    playlistSelected={playlistSelected}
                    onAdd={handleAddToTrackList}
                    onRemove={handleRemoveFromTracklist} />
            </div>
            <Playlists token={token}
                onSelectClick={handlePlaylistSelection}
                onPlaylistsRerender={handlePlaylistRerender} />
            <Tracklist token={token}
                selectedPlaylist={selectedPlaylist}
                playlistSelected={playlistSelected}
                modifiedTracklist={modifiedTracklist}
                onModifiedTracklistUpdate={handleModifiedTracklistUpdate}
                onRemove={handleRemoveFromTracklist} />
        </div>
    );
};

export default AfterLoginPresentational;
