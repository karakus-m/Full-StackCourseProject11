import React, { useState, useEffect } from 'react';
import { getPlaylists, getUserInfo } from './playlistsHelperFunctions.js'
import PlaylistsPresentational from './PlaylistsPresentational.jsx';

function Playlists({ token, onSelectClick, onPlaylistsRerender }) {
    const [playlists, setPlaylists] = useState([]);
    const [clickNumberToTriggerEffect, setClickNumberToTriggerEffect] = useState(0);

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
                };
            });
            return formattedPlaylists;
        };
        modifyFetchResults().then((formattedPlaylists) => {
            setPlaylists(formattedPlaylists);
            onPlaylistsRerender();
        });

    }, [clickNumberToTriggerEffect]);

    //Handler function to share with PlaylistsElement to set clickNumberForApllyNewName  state
    const handleTriggeringEffect = () => {
        setClickNumberToTriggerEffect(prev => prev + 1); // When this runs, state change triggers effect and hence fetch requests is for playlists state. 
    };

    return (
        <PlaylistsPresentational playlists={playlists}
            onSelectClick={onSelectClick}
            token={token}
            handleTriggeringEffect={handleTriggeringEffect} />
    );
};

export default Playlists;