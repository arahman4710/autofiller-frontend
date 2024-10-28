import ReactDOM from 'react-dom'

export const PreloadResources = () => {
  ReactDOM.preload('/fonts/OpenSans-Regular.ttf', { as: 'font', crossOrigin: 'anonymous' })
  ReactDOM.preload('/fonts/OpenSans-Bold.ttf', { as: 'font', crossOrigin: 'anonymous' })

  return null
}
