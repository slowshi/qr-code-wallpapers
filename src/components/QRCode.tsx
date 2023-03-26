import { useEffect, useRef, useState } from 'react'
import QRCodeStyling, { Options as QRCodeStylingOptions } from 'qr-code-styling'
import { svg64 } from 'svg64'
interface Props {
  options: QRCodeStylingOptions
  onRawData?: (value: string) => void
}
const useQRCodeStyling = (options: QRCodeStylingOptions): QRCodeStyling | null => {
  const [qrCodeStyling, setQRCodeStyling] = useState<QRCodeStyling | null>(null)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (!qrCodeStyling) {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const QRCodeStylingLib = require('qr-code-styling')
        const newQRCodeStyling = new QRCodeStylingLib(options)
        setQRCodeStyling(newQRCodeStyling)
      }
    }
  }, [])

  return qrCodeStyling
}

function QRCode({ options, onRawData }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const qrCode = useQRCodeStyling(options)

  const updateForeignObjects = (svg: SVGElement): Promise<string> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const svgClone = svg.cloneNode(true) as SVGElement

        // Find the image element in the original SVG
        const imageElement = svgClone.querySelector('image')
        if (imageElement) {
          const foreignObjectElement = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject')
          foreignObjectElement.setAttribute('width', imageElement.getAttribute('width')!)
          foreignObjectElement.setAttribute('height', imageElement.getAttribute('height')!)
          foreignObjectElement.setAttribute('x', imageElement.getAttribute('x')!)
          foreignObjectElement.setAttribute('y', imageElement.getAttribute('y')!)

          const imageSrc = imageElement.getAttribute('href')!
          const imageElementInsideForeignObject = document.createElementNS('http://www.w3.org/2000/svg', 'image')
          const img = new Image()
          img.onload = () => {
            imageElementInsideForeignObject.setAttribute('width', imageElement.getAttribute('width')!)
            imageElementInsideForeignObject.setAttribute('height', imageElement.getAttribute('height')!)
            imageElementInsideForeignObject.setAttributeNS('http://www.w3.org/1999/xlink', 'href', imageSrc)
            imageElementInsideForeignObject.onload = () => {
              foreignObjectElement.appendChild(imageElementInsideForeignObject)
              imageElement.parentNode?.replaceChild(foreignObjectElement, imageElement)
            }
          }
          img.src = imageSrc
        }

        const svgDataURL = svg64(svgClone)
        resolve(svgDataURL)
      }, 333)
    })
  }
  const loadRawData = async (options: QRCodeStylingOptions) => {
    if (onRawData && qrCode) {
      await qrCode.update(options)
      if (typeof window !== 'undefined') {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        if (ref.current) {
          const svg = ref.current.children[0] as SVGElement
          const newRawData = await updateForeignObjects(svg)
          onRawData(newRawData)
        }
      }
    }
  }
  useEffect(() => {
    if (qrCode && ref.current) {
      qrCode.append(ref.current)
      loadRawData(options)
    }
  }, [qrCode])
  useEffect(() => {
    loadRawData(options)
  }, [options])
  return <div ref={ref} />
}

export default QRCode
