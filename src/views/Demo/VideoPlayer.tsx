import { ReactElement } from 'react'
import VideoPlayerComponent from 'components/VideoPlayer'

const VideoPlayer = (): ReactElement => {
  return (
    <div>
      <VideoPlayerComponent videoUrl="http://media.w3.org/2010/05/bunny/movie.mp4" />
    </div>
  )
}

export default VideoPlayer
