import { RefObject, useEffect } from 'react'

const useRTC = (
  audioRef: RefObject<HTMLAudioElement>,
  fileName: string = ''
): void => {
  useEffect(() => {
    if (fileName === '') return

    const socket = new WebSocket(
      `${process.env.REACT_APP_WEBRTC_SOCKET_URL}${fileName}`
    )

    let config: RTCConfiguration | undefined
    if (process.env.REACT_APP_WEBRTC_ICE_SERVER_URL) {
      const iceServer: RTCIceServer = {
        urls: process.env.REACT_APP_WEBRTC_ICE_SERVER_URL
      }
      if (process.env.REACT_APP_WEBRTC_ICE_SERVER_USER) {
        iceServer.username = process.env.REACT_APP_WEBRTC_ICE_SERVER_USER
        iceServer.credential = process.env.REACT_APP_WEBRTC_ICE_SERVER_PASSWORD
      }
    }

    const pc = new RTCPeerConnection(config)

    socket.addEventListener('open', () => {
      socket.addEventListener('message', (e) => {
        const message = JSON.parse(e.data)
        if (message.event === 'iceCandidate') {
          try {
            pc.setRemoteDescription(JSON.parse(window.atob(message.data)))
          } catch (e) {
            console.error(e)
          }
        }
      })

      pc.ontrack = function (event) {
        if (!audioRef.current) return
        audioRef.current.srcObject = event.streams[0]
      }

      pc.oniceconnectionstatechange = (e) => {
        // eslint-disable-next-line no-console
        console.log(pc.iceConnectionState)
        if (pc.iceConnectionState === 'disconnected') {
          // Cuando se desconecte que debo hacer?
        }
      }

      pc.onicecandidate = (event) => {
        if (event.candidate === null) {
          socket.send(
            JSON.stringify({
              type: pc.localDescription?.type,
              data: window.btoa(JSON.stringify(pc.localDescription))
            })
          )
        }
      }

      pc.addTransceiver('audio', {
        direction: 'sendrecv'
        // codecs: [{ mimeType: 'audio/PCMU' }] Revisar si este es innecesario
      })

      pc.createOffer()
        .then(async (offer) => await pc.setLocalDescription(offer))
        .catch((e) => console.error(e))
    })

    return () => {
      if (!audioRef.current) return
      socket.close()
      pc.close()
      audioRef.current.srcObject = null
    }
  }, [fileName])
}

export default useRTC
