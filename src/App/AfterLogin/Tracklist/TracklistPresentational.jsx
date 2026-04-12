import React from "react";
import TracklistTrack from './TracklistTrack/TracklistTrack';
import TracklistModify from './TracklistModify/TracklistModify';
import styles from './TracklistPresentational.module.css';

function TracklistPresentational({ playlistSelected, modifiedTracklist, onRemove, token, originalTracklist, onModifiedTracklistUpdate, selectedPlaylist, handleOriginalTracklistUpdate }) {
    //jsx to render
    const beforeSelect = (
        <p className={styles.mainTracklist}>No playlist is selected</p>
    );

    const afterSelect = (
        <>
            <ul className={styles.mainTracklist}>
                {modifiedTracklist.map((track) => <TracklistTrack key={track.uri}
                    track={track}
                    onRemove={onRemove} />
                )
                }
            </ul>
            <TracklistModify token={token}
                modifiedTracklist={modifiedTracklist}
                originalTracklist={originalTracklist}
                onModifiedTracklistUpdate={onModifiedTracklistUpdate}
                selectedPlaylist={selectedPlaylist}
                onSave={handleOriginalTracklistUpdate} />
        </>
    );

    return (
        <div className={styles.tracklist}>
            <h2 className={styles.title}>Tracklist</h2>
            {
                playlistSelected === false ?
                    beforeSelect :
                    afterSelect
            }
        </div>
    );
};

export default TracklistPresentational;
