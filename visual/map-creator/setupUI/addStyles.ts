import MapCreatorCss from './map-creator.css'

export default function addStyles(): HTMLStyleElement {
  const htmlStyleElement = document.createElement('style')
  htmlStyleElement.textContent = MapCreatorCss
  document.head.appendChild(htmlStyleElement)
  return htmlStyleElement
}