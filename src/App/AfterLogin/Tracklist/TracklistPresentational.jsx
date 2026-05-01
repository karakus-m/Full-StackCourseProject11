import React from "react";
import TracklistTrack from './TracklistTrack/TracklistTrack';
import TracklistModify from './TracklistModify/TracklistModify';
import styles from './TracklistPresentational.module.css';

function TracklistPresentational({ playlistSelected, modifiedTracklist, onRemove, token, originalTracklist, onModifiedTracklistUpdate, selectedPlaylist, handleOriginalTracklistUpdate, currentPosition, playerReady, playingPlaylistUri, playingSongPaused, playingSongUri, tracklistTitleState, blocking, onBlockingStateChange }) {
    //jsx to render
    const beforeSelect = (
        <p className={styles.mainTracklist}>No playlist is selected</p>
    );

    const afterSelect = (
        <>
            <ul className={styles.mainTracklist}>
                {modifiedTracklist.map((track) => <TracklistTrack key={track.uri}
                    track={track}
                    onRemove={onRemove}
                    currentPosition={currentPosition}
                    originalTracklist={originalTracklist}
                    playerReady={playerReady}
                    playingPlaylistUri={playingPlaylistUri}
                    playingSongPaused={playingSongPaused}
                    playingSongUri={playingSongUri}
                    selectedPlaylist={selectedPlaylist}
                    token={token} />
                )
                }
            </ul>
            <TracklistModify token={token}
                modifiedTracklist={modifiedTracklist}
                originalTracklist={originalTracklist}
                onModifiedTracklistUpdate={onModifiedTracklistUpdate}
                selectedPlaylist={selectedPlaylist}
                onOriginalTracklistUpdateRequirement={handleOriginalTracklistUpdate}
                playlistSelected={playlistSelected}
                blocking={blocking}
                onBlockingStateChange={onBlockingStateChange} />
        </>
    );

    //Stling condition for li element
    const stylingCondition = () => {
        if (tracklistTitleState === 'paused') {
            return 'tracklistTrackPaused';
        }
        else if (tracklistTitleState === 'running') {
            return 'tracklistTrackRunning';
        }
        else {
            return '';
        }
    }

    return (
        <div className={`${styles.tracklist}`}>
            <h2 className={`${styles.title}  ${styles[stylingCondition()]}`}>Tracklist</h2>
            {
                playlistSelected === false ?
                    beforeSelect :
                    afterSelect
            }
        </div>
    );
};

export default TracklistPresentational;
