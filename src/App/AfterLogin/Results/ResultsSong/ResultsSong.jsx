import React,{useState, useEffect} from 'react';
import ResultsSongPresentational from './ResultsSongPresentational';
import {pauseSong, resumeSong, changeSong} from "./ResultsSongHelperFunctions"

function ResultsSong ({song, modifiedTracklist, onAdd, onRemove, playlistSelected, token, playerReady, playingPlaylistUri, playingSongUri, playingSongPaused, currentPosition, onUpdateRequirement, onBlockingStateChange, blocking}) {
    const [resultsSongState,setResultsSongState] = useState('notStarted') //Can be 'notStarted', 'running', 'paused' 
    
    useEffect(()=>{
        if(playingPlaylistUri === null &&
           playingSongUri === song.uri &&
           playingSongPaused === true
        ){
            setResultsSongState("paused");
        } else if (
           playingPlaylistUri === null &&
           playingSongUri === song.uri &&
           playingSongPaused === false
        ){
            setResultsSongState("running")
        } else {
            setResultsSongState("notStarted") 
        }
    },[playingPlaylistUri, playingSongUri, playingSongPaused])

    //handleAddToPlaylistClick
    const handleAddToPlaylistClick = () => {
        onAdd(song);
    }

    //handleRemoveFromPlaylistClick
    const handleRemoveFromPlaylistClick = () => {
        onRemove(song);
    }

    const handlePauseSongClick = () => {
        onBlockingStateChange(true);
        setTimeout(()=>{onBlockingStateChange(false)}, 1000);    
        pauseSong(token).then(result => {
            console.log(result)
            onUpdateRequirement();
        });
    }

    const handleResumeOrStartSongClick = () => {
        if(resultsSongState === "notStarted"){
            onBlockingStateChange(true);
            setTimeout(()=>{onBlockingStateChange(false)}, 1000);            
            changeSong(token, song.uri ).then(result => { 
                console.log(result)
                onUpdateRequirement();
            })
        } else if(resultsSongState === 'paused'){
            onBlockingStateChange(true);
            setTimeout(()=>{onBlockingStateChange(false)}, 1000);    
            resumeSong(token, currentPosition).then(result => {
                console.log(result);
                onUpdateRequirement();
            })
        }
    };

    return <ResultsSongPresentational song={song}
                                      modifiedTracklist={modifiedTracklist}
                                      playlistSelected={playlistSelected}
                                      handleRemoveFromPlaylistClick={handleRemoveFromPlaylistClick}
                                      handleAddToPlaylistClick={handleAddToPlaylistClick}
                                      playerReady={playerReady}
                                      resultsSongState={resultsSongState}
                                      handlePauseSongClick={handlePauseSongClick}
                                      handleResumeOrStartSongClick={handleResumeOrStartSongClick}
                                      blocking={blocking}/>
};

export default ResultsSong;