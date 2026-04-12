import React, { useState } from 'react'
import AfterLoginPresentational from './AfterLoginPresentational';

function AfterLogin({ token }) {
    const [results, setResults] = useState([]);
    const [playlistSelected, setPlaylistSelected] = useState(false);
    const [modifiedTracklist, setModifiedTracklist] = useState([]);
    const [selectedPlaylist, setSelectedPlaylist] = useState('');

    const handleSearch = (resultArray) => {
        setResults(resultArray);
    };

    const handleAddToTrackList = (song) => {
        setModifiedTracklist((prev) => [song, ...prev]);
    };

    const handleRemoveFromTracklist = (song) => {
        setModifiedTracklist((prev) => prev.filter((track) => song.uri !== track.uri));
    };

    const handlePlaylistSelection = (playlistId) => {
        setPlaylistSelected(true);
        setSelectedPlaylist(playlistId);
    };

    const handlePlaylistRerender = () => {
        setPlaylistSelected(false);
        setSelectedPlaylist('');
    }

    const handleModifiedTracklistUpdate = (updatedTracklist) => {
        setModifiedTracklist(updatedTracklist);
    };

    return (
        <AfterLoginPresentational handleSearch={handleSearch}
            token={token}
            results={results}
            modifiedTracklist={modifiedTracklist}
            playlistSelected={playlistSelected}
            handleAddToTrackList={handleAddToTrackList}
            handleRemoveFromTracklist={handleRemoveFromTracklist}
            handlePlaylistSelection={handlePlaylistSelection}
            handlePlaylistRerender={handlePlaylistRerender}
            selectedPlaylist={selectedPlaylist}
            handleModifiedTracklistUpdate={handleModifiedTracklistUpdate} />
    );
};

export default AfterLogin;