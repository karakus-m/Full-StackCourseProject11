import React, { useState } from 'react';
import { createPlaylist } from './playlistsCreateHelperFunctions';
import PlaylistsCreatePresentational from './PlaylistsCreatePresentational';


function PlaylistsCreate({ token, onSaveClick, clickedCreate, onClickedCreate, onBlockingStateChange, blocking }) {
    //States
    const [newPlaylistName, setNewPlaylistName] = useState('');

    //Click event handler for create a new playlist button
    const handleCreatePlaylistClick = () => {
        onClickedCreate(true);
    };
    //Click event handler for save playlist button
    const handleSavePlaylistClick = () => {
        if (newPlaylistName !== '') {
            onBlockingStateChange(true);
            setTimeout(()=>{onBlockingStateChange(false)}, 1000);
            createPlaylist(token, newPlaylistName).then((responseBody) => {
                onSaveClick();
                onClickedCreate(false);
                setNewPlaylistName('');
            });
        };
    };
    //Click event handler for cancel button
    const handleCancelPlaylistClick = () => {
        setNewPlaylistName('');
        onClickedCreate(false);
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
        handleCreatePlaylistClick={handleCreatePlaylistClick}
        blocking={blocking} />
};

export default PlaylistsCreate 