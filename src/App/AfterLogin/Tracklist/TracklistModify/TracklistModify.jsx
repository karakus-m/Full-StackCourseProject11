import React from 'react';
import { addTracks, removeTracks } from './tracklistModifyHelperFunctions';
import TracklistModifyPresentational from './TracklistModifyPresentational';

function TracklistModify ({token, modifiedTracklist, originalTracklist, onModifiedTracklistUpdate, selectedPlaylist, onSave}) {
    
    //Constant to check if originalTracklist is different from modifiedTracklist
    const areTracklistsDifferent = modifiedTracklist.length !== originalTracklist.length || modifiedTracklist.some((modifiedListSong) => {
                return !originalTracklist.some((originalListSong) => modifiedListSong.uri === originalListSong.uri) 
            }); /*This whole condition returns true if original tracklist is different from modified tracklist, otherwise false. It does this in an efficient manner*/
    // Click event handler for cancel edits button
    const handleCancelEditsClick = () => {
        onModifiedTracklistUpdate(originalTracklist); //Sets the modifiedTracklist back to original tracklist fetched from the server earlier
    };

    // Click event handler for save edits button
    const handleSaveEditsClick = () => {
        (async () => {
            const removeResponse = await removeTracks(token, selectedPlaylist, originalTracklist, modifiedTracklist);
            const addResponse = await addTracks(token, selectedPlaylist, originalTracklist, modifiedTracklist);
            onSave();
        })();     
    };

    return (
        <TracklistModifyPresentational areTracklistsDifferent={areTracklistsDifferent}
                                       handleCancelEditsClick={handleCancelEditsClick}
                                       handleSaveEditsClick={handleSaveEditsClick} />
    );
};

export default TracklistModify;
