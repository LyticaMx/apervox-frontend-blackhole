import { useRTCPlayer } from 'context/RTCPlayer'
import { RefObject, useEffect, useRef } from 'react'

interface RTCOut {
  audioRef: RefObject<HTMLAudioElement>
  openPlayer: boolean
  hidePlayer?: () => void
}

const useRTC = (): RTCOut => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const { roomName: fileName, actions } = useRTCPlayer()

  useEffect(() => {
    if (fileName === '') return

    const socket = new WebSocket(
      `${process.env.REACT_APP_WEBRTC_SOCKET_URL}${fileName}`
    )
    const pc = new RTCPeerConnection()

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
        audioRef.current.autoplay = true
        audioRef.current.controls = true
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
      socket.close()
    }
  }, [fileName])

  return {
    audioRef,
    openPlayer: Boolean(fileName),
    hidePlayer: actions?.hidePlayer
  }
}

export default useRTC