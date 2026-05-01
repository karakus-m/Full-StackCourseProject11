import React, {useState, useEffect} from 'react';
import TracklistTrackPresentational from './TracklistTrackPresentational';
import {changeTrack} from './tracklistTrackHelperFunctions'
import {resumeSong as resumeTrack, pauseSong as pauseTrack} from '../../Results/ResultsSong/ResultsSongHelperFunctions'

function TracklistTrack ({track, onRemove, playingSongUri, playingPlaylistUri, selectedPlaylist, playingSongPaused, token, currentPosition, playerReady, originalTracklist}) {
    const [tracklistTrackState, setTracklistTrackState] = useState('notStarted') // Can be 'notStarted', 'running', 'paused'

    useEffect(()=>{
        if(playingSongUri === track.uri && playingPlaylistUri === `spotify:playlist:${selectedPlaylist}`) {
            if(playingSongPaused === true){
                setTracklistTrackState('paused');
            } else if(playingSongPaused === false) {
                setTracklistTrackState('running');
            }
        } else {
            setTracklistTrackState('notStarted');
        }
    },[playingSongUri, playingPlaylistUri, playingSongPaused, selectedPlaylist])

    //Click event handler for remove from playlist button
    const handleRemoveFromTracklistClick = () => {
        onRemove(track);
    };

    //Click event handler for Start-Resume click
    const handleResumeOrStartTrackClick = () => {
        if(tracklistTrackState === "notStarted"){
            changeTrack(token, track.position, `spotify:playlist:${selectedPlaylist}`).then(result => console.log(result));
        } else if(tracklistTrackState === 'paused'){
            resumeTrack(token, currentPosition).then(result => console.log(result));
        }
    }

    //Click event handler for Pause click
    const handlePauseTrackClick = () => {
        pauseTrack(token).then(result => console.log(result))
    }

    return (
        <TracklistTrackPresentational track={track}
                                      handleRemoveFromTracklistClick={handleRemoveFromTracklistClick}
                                      handlePauseTrackClick={handlePauseTrackClick}
                                      handleResumeOrStartTrackClick={handleResumeOrStartTrackClick}
                                      playerReady={playerReady}
                                      tracklistTrackState={tracklistTrackState}
                                      originalTracklist={originalTracklist} />
    );
};

export default TracklistTrack;