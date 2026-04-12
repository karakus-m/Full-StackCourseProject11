import React from 'react';
import TracklistTrackPresentational from './TracklistTrackPresentational';

function TracklistTrack ({track, onRemove}) {
    //Click event handler for remove from playlist button
    const handleRemoveFromTracklistClick = () => {
        onRemove(track);
    };

    return (
        <TracklistTrackPresentational track={track}
                                      handleRemoveFromTracklistClick={handleRemoveFromTracklistClick} />
    );
};

export default TracklistTrack;