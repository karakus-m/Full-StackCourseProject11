import React, { useState } from 'react';
import { createPlaylist } from './playlistsCreateHelperFunctions';
import PlaylistsCreatePresentational from './PlaylistsCreatePresentational';


function PlaylistsCreate({ token, onSaveClick }) {
    //States
    const [clickedCreate, setClickedCreate] = useState(false);
    const [newPlaylistName, setNewPlaylistName] = useState('');

    //Click event handler for create a new playlist button
    const handleCreatePlaylistClick = () => {
        setClickedCreate(true);
    };
    //Click event handler for save playlist button
    const handleSavePlaylistClick = () => {
        if (newPlaylistName !== '') {
            createPlaylist(token, newPlaylistName).then((responseBody) => {
                onSaveClick();
                setClickedCreate(false);
                setNewPlaylistName('');
            });
        };
    };
    //Click event handler for cancel button
    const handleCancelPlaylistClick = () => {
        setNewPlaylistName('');
        setClickedCreate(false);
    };
    //Change event handler for new playlist name input element
    const handleNewPlaylistNameChange = (e) => {
        setNewPlaylistName(e.target.value);
    };

    return <PlaylistsCreatePresentational clickedCreate={clickedCreate}
        newPlaylistName={newPlaylistName}
        handleNewPlaylistNameChange={handleNewPlaylistNameChange}
        handleSavePlaylistClick={handleSavePlaylistClick}
        handleCancelPlaylistClick={handleCancelPlaylistClick}
        handleCreatePlaylistClick={handleCreatePlaylistClick} />
};

export default PlaylistsCreate 