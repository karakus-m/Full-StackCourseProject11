import React, { useEffect, useState } from 'react';
import { getTracklist } from './tracklistHelperFunctions';
import TracklistPresentational from './TracklistPresentational';

function Tracklist({ token, playlistSelected, selectedPlaylist, modifiedTracklist, onModifiedTracklistUpdate, onRemove }) {
    const [originalTracklist, setOriginalTracklist] = useState([]);
    const [originalTracklistUpdateCount, setOriginalTracklistUpdateCount] = useState(0);

    useEffect(() => {
        if (playlistSelected === true) {
            getTracklist(token, selectedPlaylist).then((unformattedTracklist) => {
                let formattedTracklist;
                if (unformattedTracklist.items.length === 0) {
                    formattedTracklist = [];
                } else {
                    formattedTracklist = unformattedTracklist.items.map((track) => {
                        return {
                            name: track.item.name,
                            uri: track.item.uri,
                            id: track.item.id,
                            artists: track.item.artists.map(artist => artist.name),
                            album: track.item.album.name
                        }
                    });
                }
                setOriginalTracklist(formattedTracklist);
                onModifiedTracklistUpdate(formattedTracklist);
            });
        }
    }, [selectedPlaylist, originalTracklistUpdateCount]);

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
            handleOriginalTracklistUpdate={handleOriginalTracklistUpdate} />
    );
};

export default Tracklist;