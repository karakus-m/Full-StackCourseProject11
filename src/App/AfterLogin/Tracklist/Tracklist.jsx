import React, { useEffect, useState } from 'react';
import { getTracklist } from './tracklistHelperFunctions';
import TracklistPresentational from './TracklistPresentational';

function Tracklist({ token, playlistSelected, selectedPlaylist, modifiedTracklist, onModifiedTracklistUpdate, onRemove, playingPlaylistUri, playingSongPaused, playingSongUri, playerReady, currentPosition, onBlockingStateChange, blocking }) {
    const [originalTracklist, setOriginalTracklist] = useState([]);
    const [originalTracklistUpdateCount, setOriginalTracklistUpdateCount] = useState(0);
    const [tracklistTitleState, setTracklistTitleState] = useState('notStarted') // Can be 'notStarted', 'running', 'paused'.

    useEffect(() => {
        if (playlistSelected === true) {
            getTracklist(token, selectedPlaylist).then((unformattedTracklist) => {
                let formattedTracklist;
                if (unformattedTracklist.items.length === 0) {
                    formattedTracklist = [];
                } else {
                    formattedTracklist = unformattedTracklist.items.map((track, index) => {
                        return {
                            name: track.item.name,
                            uri: track.item.uri,
                            id: track.item.id,
                            artists: track.item.artists,
                            album: track.item.album.name,
                            albumLink: track.item.album.external_urls.spotify,
                            position: index,
                            image: track.item.album.images[0].url,
                            link: track.item.external_urls.spotify
                        }
                    });
                }
                setOriginalTracklist(formattedTracklist);
                onModifiedTracklistUpdate(formattedTracklist);
            });
        }
    }, [playlistSelected, selectedPlaylist, originalTracklistUpdateCount]);

    // tracklistTitleState setting
    useEffect(() => {
        if( playingPlaylistUri === `spotify:playlist:${selectedPlaylist}` && modifiedTracklist.map((item) => item.uri).includes(playingSongUri) ) {
            if(playingSongPaused === true){
                setTracklistTitleState('paused');
            } else if(playingSongPaused === false) {
                setTracklistTitleState('running');
            }
        } else {
            setTracklistTitleState('notStarted');
        }
    }, [modifiedTracklist, playingPlaylistUri, playingSongUri, playingSongPaused, selectedPlaylist])

    // Handler function to trigger effect when original tracklist needs to be updated.
    const handleOriginalTracklistUpdate = () => {
        setOriginalTracklistUpdateCount(prev => prev + 1);
    }

    return (
        <TracklistPresentational playlistSelected={playlistSelected}
            modifiedTracklist={modifiedTracklist}
            onRemove={onRemove}
            token={token}
            originalTracklist={originalTracklist}
            onModifiedTracklistUpdate={onModifiedTracklistUpdate}
            selectedPlaylist={selectedPlaylist}
            handleOriginalTracklistUpdate={handleOriginalTracklistUpdate}
            currentPosition={currentPosition}
            playerReady={playerReady}
            playingPlaylistUri={playingPlaylistUri}
            playingSongPaused={playingSongPaused}
            playingSongUri={playingSongUri}
            tracklistTitleState={tracklistTitleState}
            blocking={blocking}
            onBlockingStateChange={onBlockingStateChange} />
    );
};

export default Tracklist;