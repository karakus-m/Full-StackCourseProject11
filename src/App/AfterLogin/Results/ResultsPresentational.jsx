import React from "react";
import ResultsSong from './ResultsSong/ResultsSong';
import styles from './ResultsPresentational.module.css';

function ResultsPresentational ({results, modifiedTracklist, playlistSelected, onAdd, onRemove, currentPosition, playerReady, playingPlaylistUri, playingSongPaused, playingSongUri, token, resultsTitleState, onUpdateRequirement, onBlockingStateChange, blocking}) {

    const beforeSearch = (
        <p className={styles.results}>No search result found</p>
    );

    const afterSearch = (
        <ul className={styles.results}>
            {results.map((song) => <ResultsSong key={song.uri}
                                                song={song}
                                                modifiedTracklist={modifiedTracklist}
                                                playlistSelected={playlistSelected} 
                                                onAdd={onAdd} 
                                                onRemove={onRemove}
                                                currentPosition={currentPosition}
                                                playerReady={playerReady}
                                                playingPlaylistUri={playingPlaylistUri}
                                                playingSongPaused={playingSongPaused}
                                                playingSongUri={playingSongUri}
                                                token={token}
                                                onUpdateRequirement={onUpdateRequirement}
                                                onBlockingStateChange={onBlockingStateChange}
                                                blocking={blocking} />
                        )
            }
        </ul>
    );
    
    //Stling condition for h2 element
    const stylingCondition = () => {
        if(resultsTitleState === 'paused'){
            return 'resultsSongPaused';
        }
        else if(resultsTitleState === 'running') {
            return 'resultsSongRunning';
        }
        else{
            return '';
        }
    } 

    return (
        <div className={styles.searchResults}>
            <h2 className={`${styles.title} ${styles[stylingCondition()]}`}>Search Results</h2>
            {results.length === 0 ? beforeSearch : afterSearch}
        </div>
    );
};

export default ResultsPresentational;