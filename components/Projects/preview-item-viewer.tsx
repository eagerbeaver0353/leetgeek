import YouTubePlayer from 'react-player/youtube'
import FilePlayer from 'react-player/file'
import NextImage from 'next/image'
import { CSSProperties } from 'react'

const MediaViewer = ({ tag_type, url }) => {
  let renderer = () => <></>
  const style = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    margin: 'auto',
  }
  switch (tag_type) {
    case 'img':
      renderer = () => (
        <NextImage
          src={url}
          alt="media"
          loading="lazy"
          width={0}
          height={0}
          style={style as CSSProperties}
          className="max-h-full max-w-full object-contain"
        />
      )
      break
    case 'a':
      renderer = () => <></>
      break
    case 'source':
      renderer = () => (
        <FilePlayer
          url={url}
          className="absolute m-auto object-contain"
          width="100%"
          height="100%"
        />
      )
      break
    case 'iframe':
      // let videoId = url.match(/embed\/(.*)\?/)[1];
      renderer = () => (
        <YouTubePlayer
          url={url}
          className="absolute m-auto object-contain"
          width="100%"
          height="100%"
        />
      )
      break
  }
  return <div className="relative top-0 w-full bg-gray-600 pb-[75%]">{renderer()}</div>
}

export default MediaViewer
