import React, {useEffect} from 'react';
import { addTracks, removeTracks } from './tracklistModifyHelperFunctions';
import TracklistModifyPresentational from './TracklistModifyPresentational';

function TracklistModify ({token, modifiedTracklist, originalTracklist, onModifiedTracklistUpdate, selectedPlaylist, playlistSelected, onOriginalTracklistUpdateRequirement, onBlockingStateChange, blocking}) {
    
    //Constant to check if originalTracklist is different from modifiedTracklist
    const areTracklistsDifferent = modifiedTracklist.length !== originalTracklist.length || modifiedTracklist.some((modifiedListSong) => {
                return !originalTracklist.some((originalListSong) => modifiedListSong.uri === originalListSong.uri) 
            }); /*This whole condition returns true if original tracklist is different from modified tracklist, otherwise false. It does this in an efficient manner*/
    //Effect to update tracklist to its newest form in server.
    useEffect(() => {
        const tracklistUpdater = setInterval(()=>{
            if(areTracklistsDifferent === false ) {
                onOriginalTracklistUpdateRequirement();
            }
        }, 3600000); //Don't decrease this, because rate limits are so low, like 100 request per day for this spesific request.
        return () => {
            clearInterval(tracklistUpdater);
        };
    }, [modifiedTracklist, areTracklistsDifferent])
    // Click event handler for cancel edits button
    const handleCancelEditsClick = () => {
        onModifiedTracklistUpdate(originalTracklist);
    };

    // Click event handler for save edits button
    const handleSaveEditsClick = () => {
        onBlockingStateChange(true);
        setTimeout(()=>{onBlockingStateChange(false)}, 1000);    
        (async () => {
            const removeResponse = await removeTracks(token, selectedPlaylist, originalTracklist, modifiedTracklist);
            const addResponse = await addTracks(token, selectedPlaylist, originalTracklist, modifiedTracklist);
            onOriginalTracklistUpdateRequirement();
        })();     
    };

    return (
        <TracklistModifyPresentational areTracklistsDifferent={areTracklistsDifferent}
                                       handleCancelEditsClick={handleCancelEditsClick}
                                       handleSaveEditsClick={handleSaveEditsClick}
                                       blocking={blocking} />
    );
};

export default TracklistModify;
