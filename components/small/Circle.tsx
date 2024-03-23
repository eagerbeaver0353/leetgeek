import RellaxHOC from './Rellax'

const Circle = ({ rellax, ...props }: { rellax?: string; [key: string]: unknown }) => (
  <RellaxHOC>
    <span {...props} {...(rellax != undefined ? { 'data-rellax-speed': rellax } : {})}></span>
  </RellaxHOC>
)

export default Circle
