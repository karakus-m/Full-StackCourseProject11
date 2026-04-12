import React from 'react';
import ResultsSongPresentational from './ResultsSongPresentational';

function ResultsSong ({song, modifiedTracklist, onAdd, onRemove, playlistSelected}) {
    
    //handleAddToPlaylistClick
    const handleAddToPlaylistClick = () => {
        onAdd(song);
        
    }

    //handleRemoveFromPlaylistClick
    const handleRemoveFromPlaylistClick = () => {
        onRemove(song);
    }

    return <ResultsSongPresentational song={song}
                                      modifiedTracklist={modifiedTracklist}
                                      playlistSelected={playlistSelected}
                                      handleRemoveFromPlaylistClick={handleRemoveFromPlaylistClick}
                                      handleAddToPlaylistClick={handleAddToPlaylistClick}/>
};

export default ResultsSong;