import React, {useState, useEffect} from 'react';
import {changeVolume} from './playerVolumeHelperFunctions';
import PlayerVolumePresentational from './PlayerVolumePresentational';

function PlayerVolume ({currentVolume, token, onUpdateRequirement, onBlockingStateChange, blocking}) {
    const [shownVolume, setShownVolume] = useState(3);
    const [mouseDown, setMouseDown] = useState(false);
    const [trigger, setTrigger] = useState(0);

    useEffect(()=> {
        if(mouseDown === false ) {
            setShownVolume(currentVolume);
        }
    }, [currentVolume])


    //After updating server, it will wait for some time before sending new update because server does not return new value when requested directly after change in this case. It is better to wait for 1 second.

    useEffect(() => {
        const waitingTimeout = setTimeout(()=>{
            setMouseDown(false);
            onUpdateRequirement();
        }, 1000)

        return () => {
            clearTimeout(waitingTimeout);
        }
    }, [trigger])

    //handler for mousedown
    const handleMouseDown = () => {
        setMouseDown(true);
    }

    //handler for mouseup
    const handleVolumeChangeMouseUp = () => {
        if(currentVolume !== shownVolume) {
            onBlockingStateChange(true);
            setTimeout(()=>{onBlockingStateChange(false)}, 1000);
            changeVolume(token, shownVolume).then(response => {
                console.log(response);
                setTrigger(prev => prev + 1);
            })
        } else {
            setMouseDown(false);
        }
    };

    //handler for input change
    const handleInputChange = (e) => {
        setShownVolume(prev => {
            return Math.round(Number(e.target.value))
        });
    };

    return (
        <>
            <PlayerVolumePresentational blocking={blocking}
                                        handleInputChange={handleInputChange}
                                        handleMouseDown={handleMouseDown}
                                        handleVolumeChangeMouseUp={handleVolumeChangeMouseUp}
                                        shownVolume={shownVolume} />
        </>
    );
};

export default PlayerVolume;