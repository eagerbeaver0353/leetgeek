import Rellax from 'rellax'
import { useEffect } from 'react'

export default function RellaxHOC(props) {
  useEffect(() => {
    new Rellax('.rellax', {
      speed: -2,
      center: true,
      wrapper: null,
      round: true,
    })
  }, [])

  return <div {...props} />
}
