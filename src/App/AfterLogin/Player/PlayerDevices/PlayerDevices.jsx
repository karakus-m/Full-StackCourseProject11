import React, { useState, useEffect } from 'react'
import { getCurrentDevices } from './playerDevicesHelperFunctions';
import PlayerDevicesPresentational from './PlayerDevicesPresentational'

function PlayerDevices({ token, currentDeviceName, currentDeviceId, onUpdateRequirement, onBlockingStateChange, blocking, isPlaying}) {
    const [availableDevices, setAvailableDevices] = useState([]);
    const [showDevicesClicked, setShowDevicesClicked] = useState(false);
    const [updateTrigger, setUpdateTrigger] = useState(0);

    useEffect(() => {
        getCurrentDevices(token).then(response => {
            const devicesArray = response['devices']
            setAvailableDevices(devicesArray);
        });
    }, [updateTrigger]);

    //Show Devices  Click handler
    const handleShowDevicesClick = () => {
        setShowDevicesClicked(true);
    };

    //Close Devices Click handler
    const handleCloseDevicesMenuClick = () => {
        setShowDevicesClicked(false);
    };

    //Reload devices click handler
    const handleReloadDevicesClick = () => {
        onBlockingStateChange(true);
        setTimeout(() => { onBlockingStateChange(false) }, 1000);
        setUpdateTrigger(prev => prev + 1);
    };

    //Device selection click handler to execute after sending new device request
    const handleSelectDeviceClick = () => {
        setShowDevicesClicked(false);
        onUpdateRequirement(); //Runs in after login
    };

    return (
        <>
            <PlayerDevicesPresentational blocking={blocking}
                                         currentDeviceId={currentDeviceId}
                                         handleCloseDevicesMenuClick={handleCloseDevicesMenuClick}
                                         handleReloadDevicesClick={handleReloadDevicesClick}
                                         handleSelectDeviceClick={handleSelectDeviceClick}
                                         handleShowDevicesClick={handleShowDevicesClick}
                                         isPlaying={isPlaying}
                                         onBlockingStateChange={onBlockingStateChange}
                                         showDevicesClicked={showDevicesClicked}
                                         token={token}
                                         availableDevices={availableDevices}/>
        </>
    );
};

export default PlayerDevices;