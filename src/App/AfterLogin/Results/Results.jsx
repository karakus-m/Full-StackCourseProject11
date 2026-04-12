import React from 'react';
import ResultsPresentational from './ResultsPresentational';

function Results ({results, modifiedTracklist, onAdd, onRemove, playlistSelected}) {

    return(
        <ResultsPresentational results={results}
                               modifiedTracklist={modifiedTracklist}
                               playlistSelected={playlistSelected}
                               onAdd={onAdd}
                               onRemove={onRemove}/>
    );
};

export default Results; 