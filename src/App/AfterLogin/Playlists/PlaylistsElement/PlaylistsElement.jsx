import React, { useState, useEffect } from 'react';
import { renamePlaylist, playPlaylist } from './playlistsElementHelperFunctions';
import { pauseSong as pausePlaylist, resumeSong as resumePlaylist } from '../../Results/ResultsSong/ResultsSongHelperFunctions';

import PlaylistsElementPresentational from './PlaylistsElementPresentational';

function PlaylistsElement({ playlist, token, onApplyClick, onSelectClick, playerReady, playingPlaylistUri, playingSongPaused, currentPosition, onUpdateRequirement, onClickedRename, onBlockingStateChange, selectedPlaylist, blocking}) {

    const [newName, setNewName] = useState('');
    const [playlistState, setPlaylistState] = useState('notStarted') // Can be 'notStarted', 'paused', 'running'
    const [clickedRename, setClickedRename] = useState(false);

    useEffect(() => {

        if(playingPlaylistUri === playlist.uri && playingSongPaused === true){
            setPlaylistState('paused');
        } else if(playingPlaylistUri === playlist.uri && playingSongPaused === false){
            setPlaylistState('running');
        } else {
            setPlaylistState('notStarted');
        }
    }, [playingPlaylistUri, playingSongPaused])

    //Click event handler for rename button
    const handleRenamePlaylist = () => {
        onClickedRename(true);
        setClickedRename(true);
    };
    //onChange event handler for new name input element
    const handleNewNameChange = (e) => {
        setNewName(e.target.value);
    };
    //Click event handler for Apply new name button
    const handleApplyNewNameClick = (e) => {
        onBlockingStateChange(true);
        setTimeout(()=>{onBlockingStateChange(false)}, 1000);   
        //No need for additional error handling, errors hanlded in helper functions for fetching.
        renamePlaylist(token, newName, playlist.id).then((response) => {
            onApplyClick();
        });
        setNewName('');
        onClickedRename(false);
        setClickedRename(false);
    };
    //Click event handler for Cancel rename button
    const handleCancelRenameClick = () => {
        setNewName('');
        onClickedRename(false);
        setClickedRename(false);
    };

    //Click event handler for playlist selection
    const handleSelectPlaylistClick = () => {
        if(selectedPlaylist !== playlist.id){
            onBlockingStateChange(true);
            setTimeout(()=>{onBlockingStateChange(false)}, 1000);   
            onSelectClick(playlist.id);
        }
    };

    //Click event handler for play playlist
    const handlePausePlaylistClick = () => {
        onBlockingStateChange(true);
        setTimeout(()=>{onBlockingStateChange(false)}, 1000);   
        pausePlaylist(token).then(result => {
            console.log(result);
            onUpdateRequirement();
        });
    };

    //Click event handler for pause playlist
    const handleResumeOrStartPlaylistClick  = () => {
        if(playlistState === 'notStarted') {
            onBlockingStateChange(true);
            setTimeout(()=>{onBlockingStateChange(false)}, 1000);   
            playPlaylist(token, playlist.uri).then(result => {
                console.log(result);
                onUpdateRequirement();
            });
        } else if(playlistState === 'paused') {
            onBlockingStateChange(true);
            setTimeout(()=>{onBlockingStateChange(false)}, 1000);   
            resumePlaylist(token, currentPosition).then(result => {
                console.log(result);
                onUpdateRequirement();
            });
        }
    };

    return (
        <PlaylistsElementPresentational handleSelectPlaylistClick={handleSelectPlaylistClick}
            playlist={playlist}
            clickedRename={clickedRename}
            newName={newName}
            handleNewNameChange={handleNewNameChange}
            handleApplyNewNameClick={handleApplyNewNameClick}
            handleCancelRenameClick={handleCancelRenameClick}
            handleRenamePlaylist={handleRenamePlaylist}
            handlePausePlaylistClick={handlePausePlaylistClick}
            handleResumeOrStartPlaylistClick={handleResumeOrStartPlaylistClick}
            playerReady={playerReady}
            playlistState={playlistState}
            blocking={blocking} />
    );
};

export default PlaylistsElement;