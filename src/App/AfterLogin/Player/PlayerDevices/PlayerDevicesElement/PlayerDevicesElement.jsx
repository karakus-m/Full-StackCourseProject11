import React from 'react';
import {changeDevice} from './playerDevicesElementHelperFunctions';
import PlayerDevicesElementPresentational from './PlayerDevicesElementPresentational';

function PlaylistDevicesElement ({token, currentDeviceId, device, onSelectDeviceClick, blocking, onBlockingStateChange, isPlaying}) {
    
    //Select click handler
    const handleSelectDeviceClick = () => {
        if(currentDeviceId !== device.id) {
            onBlockingStateChange(true);
            setTimeout(()=>{onBlockingStateChange(false)}, 1000);
            changeDevice(token, device.id).then(response => {
                console.log(response);
                onSelectDeviceClick();
            });
        }
    };
    
    return (
        <>
            <PlayerDevicesElementPresentational currentDeviceId={currentDeviceId}
                                                device={device}
                                                blocking={blocking}
                                                isPlaying={isPlaying}
                                                handleSelectDeviceClick={handleSelectDeviceClick}/>
        </>
    );
};

export default PlaylistDevicesElement