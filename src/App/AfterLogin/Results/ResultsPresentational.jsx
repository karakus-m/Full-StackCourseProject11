import React from "react";
import ResultsSong from './ResultsSong/ResultsSong';
import styles from './ResultsPresentational.module.css';

function ResultsPresentational ({results, modifiedTracklist, playlistSelected, onAdd, onRemove}) {

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
                                                onRemove={onRemove}/>
                        )
            }
        </ul>
    );
    
    return (
        <div className={styles.searchResults}>
            <h2 className={styles.title}>Search Results</h2>
            {results.length === 0 ? beforeSearch : afterSearch}
        </div>
    );
};

export default ResultsPresentational;