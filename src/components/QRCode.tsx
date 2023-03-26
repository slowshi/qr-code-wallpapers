import { useEffect, useRef, useState } from 'react'
import QRCodeStyling, { Options as QRCodeStylingOptions } from 'qr-code-styling'

interface Props {
  options: QRCodeStylingOptions
  onRawData?: (value: Blob | null) => void
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
      qrCode.update(options)
      const rawData = await qrCode.getRawData('png')
      onRawData(rawData)
      setTimeout(async () => {
        //dumb but had to do it
        qrCode.update(options)
        const rawData = await qrCode.getRawData('png')
        onRawData(rawData)
      }, 300)
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
