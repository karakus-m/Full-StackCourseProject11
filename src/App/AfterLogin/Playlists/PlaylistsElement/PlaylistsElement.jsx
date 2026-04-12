import React, { useState } from 'react';
import { renamePlaylist } from './playlistsElementHelperFunctions';
import PlaylistsElementPresentational from './PlaylistsElementPresentational';

function PlaylistsElement({ playlist, token, onApplyClick, onSelectClick }) {
    const [clickedRename, setClickedRename] = useState(false);
    const [newName, setNewName] = useState('');

    //Click event handler for rename button
    const handleRenamePlaylist = () => {
        setClickedRename(true);
    };
    //onChange event handler for new name input element
    const handleNewNameChange = (e) => {
        setNewName(e.target.value);
    };
    //Click event handler for Apply new name button
    const handleApplyNewNameClick = (e) => {
        //No need for additional error handling, errors hanlded in helper functions for fetching.
        renamePlaylist(token, newName, playlist.id).then((response) => {
            onApplyClick();
        });
        setNewName('');
        setClickedRename(false);
    };
    //Click event handler for Cancel rename button
    const handleCancelRenameClick = () => {
        setNewName('');
        setClickedRename(false);
    };

    //Click event handler for playlist selection
    const handleSelectPlaylistClick = () => {
        onSelectClick(playlist.id);
    };

    return (
        <PlaylistsElementPresentational handleSelectPlaylistClick={handleSelectPlaylistClick}
            playlist={playlist}
            clickedRename={clickedRename}
            newName={newName}
            handleNewNameChange={handleNewNameChange}
            handleApplyNewNameClick={handleApplyNewNameClick}
            handleCancelRenameClick={handleCancelRenameClick}
            handleRenamePlaylist={handleRenamePlaylist} />
    );
};

export default PlaylistsElement;