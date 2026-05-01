import React, { useState, useEffect } from 'react';
import { getPlaylists, getUserInfo } from './playlistsHelperFunctions.js'
import PlaylistsPresentational from './PlaylistsPresentational.jsx';

function Playlists({ token, onSelectClick, onPlaylistsRerender, playingPlaylistUri, playingSongPaused, playerReady, currentPosition, onUpdateRequirement, blocking, onBlockingStateChange, selectedPlaylist}) {
    const [playlists, setPlaylists] = useState([]);
    const [clickNumberToTriggerEffect, setClickNumberToTriggerEffect] = useState(0);
    const [playlistsTitleState, setPlaylistsTitleState] = useState('notStarted') // Can be 'notStarted', 'paused', 'running'
    const [clickedCreate, setClickedCreate] = useState(false);
    const [clickedRenameInPlaylists, setClickedRenameInPlaylists] = useState(false);

    useEffect(() => {
        //All errors were handled in helper function. No additional error handling is required here.
        async function modifyFetchResults() {
            const unformattedUserInfo = await getUserInfo(token);
            const userId = unformattedUserInfo.id;
            const unformattedPlaylists = await getPlaylists(token);
            const formattedPlaylists = unformattedPlaylists.items.filter((playlist) => playlist.owner.id === userId).map((playlist) => {
                return {
                    name: playlist.name,
                    uri: playlist.uri,
                    id: playlist.id,
                    totalNumberOfSongs: playlist.items.total,
                    image: playlist.images[0].url,
                };
            });
            return formattedPlaylists;
        };
        modifyFetchResults().then((formattedPlaylists) => {
            setPlaylists(formattedPlaylists);
            onPlaylistsRerender(formattedPlaylists);
        });

    }, [clickNumberToTriggerEffect]);

    //Setting playlistTitleState
    useEffect(() => {
        if(playlists.map((item) => item.uri).includes(playingPlaylistUri)) {
            if(playingSongPaused===true){
                setPlaylistsTitleState('paused');  
            } else if(playingSongPaused===false){
                setPlaylistsTitleState('running');
            }
        } else {
            setPlaylistsTitleState('notStarted');
        }
    },[playlists, playingPlaylistUri, playingSongPaused]);

    //Setting a timeInterval for playlists update
    useState(()=> {
        const playlistsUpdater = setInterval(()=>{
            if(clickedCreate === false && clickedRenameInPlaylists === false){
                setClickNumberToTriggerEffect(prev => prev + 1);
            }
        }, 3600000); //Do not decrease this because rate limits are too low, like 100 request per day for this spesific request.
        return () => {
            clearInterval(playlistsUpdater);
        }
    },[clickedCreate, clickedRenameInPlaylists]);

    //Handler function to share with PlaylistsElement to set clickNumberForApllyNewName  state
    const handleTriggeringEffect = () => {
        setClickNumberToTriggerEffect(prev => prev + 1); // When this runs, state change triggers effect and hence fetch requests is for playlists state. 
    };

    //Handler function to share with PlaylistsCreate to set clickedCreate state.
    const handleClickedCreate = (value) => {
        setClickedCreate(value);
    }


    //Handler function to share with PlaylistsElement to set clickedRename state.
    const handleClickedRename = (value) => {
        setClickedRenameInPlaylists(value);
    }

    return (
        <PlaylistsPresentational playlists={playlists}
            onSelectClick={onSelectClick}
            token={token}
            handleTriggeringEffect={handleTriggeringEffect}
            currentPosition={currentPosition}
            playerReady={playerReady}
            playingPlaylistUri={playingPlaylistUri}
            playingSongPaused={playingSongPaused}
            playlistsTitleState={playlistsTitleState}
            onUpdateRequirement={onUpdateRequirement} 
            handleClickedCreate={handleClickedCreate}
            clickedCreate={clickedCreate}
            handleClickedRename={handleClickedRename}
            blocking={blocking}
            onBlockingStateChange={onBlockingStateChange}
            selectedPlaylist={selectedPlaylist} />
    );
};

export default Playlists;