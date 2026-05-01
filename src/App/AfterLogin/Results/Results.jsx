import React, {useState, useEffect} from 'react';
import ResultsPresentational from './ResultsPresentational';

function Results ({results, modifiedTracklist, onAdd, onRemove, playlistSelected, currentPosition, playerReady, playingPlaylistUri, playingSongPaused, playingSongUri, token, onUpdateRequirement, onBlockingStateChange, blocking}) {
    const [resultsTitleState, setResultsTitleState] = useState('notStarted')// Can be 'notStarted', 'paused', 'running'

    //Setting resultsTitleState
    useEffect(() => {
        if(results.map((item) => item.uri).includes(playingSongUri) && playingPlaylistUri===null) {
            if(playingSongPaused===true){
                setResultsTitleState('paused');  
            } else if(playingSongPaused===false){
                setResultsTitleState('running');
            }
        } else {
            setResultsTitleState('notStarted');
        }
    },[results, playingPlaylistUri, playingSongUri, playingSongPaused])

    return(
        <ResultsPresentational results={results}
                               modifiedTracklist={modifiedTracklist}
                               playlistSelected={playlistSelected}
                               onAdd={onAdd}
                               onRemove={onRemove}
                               currentPosition={currentPosition}
                               playerReady={playerReady}
                               playingPlaylistUri={playingPlaylistUri}
                               playingSongPaused={playingSongPaused}
                               playingSongUri={playingSongUri}
                               resultsTitleState={resultsTitleState}
                               token={token}
                               onUpdateRequirement={onUpdateRequirement}
                               onBlockingStateChange={onBlockingStateChange}
                               blocking={blocking}/>
    );
};

export default Results; 