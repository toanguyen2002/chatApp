import React from 'react'
import { useParams } from 'react-router-dom'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt'

function VideoCall() {
    const { roomId } = useParams()
    console.log(roomId);
    const myMetting = async (element) => {
        const appId = 1369038062
        const server = "9f5459f14ae93ae1beffbcde28709515"
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appId, server, roomId, Date.now().toString(), "end")
        const zc = ZegoUIKitPrebuilt.create(kitToken)
        zc.joinRoom({
            container: element,
            scenario: {
                mode: ZegoUIKitPrebuilt.GroupCall
            },
            showScreenSharingButton: true,
            showLeaveRoomConfirmDialog: true

        })
    }
    console.log(myMetting);

    return (
        <div>
            <div className="" ref={myMetting} style={{ width: '100vw', height: '100vh' }}></div>
        </div>
    )
}

export default VideoCall