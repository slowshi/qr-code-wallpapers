import { useEffect, useRef, useState } from 'react'
import QRCodeStyling, { Options as QRCodeStylingOptions } from 'qr-code-styling'
interface Props {
  options: QRCodeStylingOptions
  onRawData?: (value: Blob) => void
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

  const loadRawData = async (options: QRCodeStylingOptions) => {
    if (onRawData && qrCode) {
      await qrCode.update(options)
      if (typeof window !== 'undefined') {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const QRCodeStylingLib = require('qr-code-styling')
        const newQRCodeStyling = new QRCodeStylingLib({ ...options, width: 1200, height: 1200 })
        const rawData = await newQRCodeStyling.getRawData()
        onRawData(rawData)
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
