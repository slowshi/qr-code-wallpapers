import { ChangeEvent, useEffect, useState } from 'react'
import { defaultStyling } from '../constants'
import QRCode from '@/components/QRCode'
import { ColorResult } from 'react-color'
import ColorPickerInput from '@/components/ColorPickerInput'
import { Options as QRCodeStylingOptions } from 'qr-code-styling'
import ImageLoaderInput from '@/components/ImageLoaderInput'

export default function Home() {
  useEffect(() => {
    document.title = 'QR Code Wallpaper'
  }, [])

  const [bgURL, setBgURL] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [url, setUrl] = useState('https://doodles.app')
  const [dotColor, setDotColor] = useState('#000000')
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF')
  const [options, setOptions] = useState<QRCodeStylingOptions>(defaultStyling)

  const colorHandler = (color: ColorResult) => {
    setDotColor(color.hex)
    setOptions({
      ...options,
      dotsOptions: {
        ...options.dotsOptions,
        color: color.hex,
      },
    })
  }
  const backgroundColorHandler = (color: ColorResult) => {
    setBackgroundColor(color.hex)
    setOptions({
      ...options,
      backgroundOptions: {
        ...options.backgroundOptions,
        // color: color.hex,
      },
    })
  }
  const urlHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value
    setUrl(url)
    setOptions({
      ...options,
      data: url,
    })
  }
  const imageHandler = (value: string) => {
    setImageUrl(value)
    setOptions({
      ...options,
      image: value,
    })
  }
  const downloadHandler = () => {
    const link = document.createElement('a')
    link.download = 'background.png'
    link.href = bgURL
    link.click()
  }

  const getRawData = (value: Blob) => {
    if (value !== null) {
      const canvas = document.createElement('canvas')
      canvas.width = 390 * 4
      canvas.height = 844 * 4
      const context = canvas.getContext('2d')

      const img = new Image()
      img.onload = () => {
        if (context) {
          context.fillStyle = backgroundColor
          context.fillRect(0, 0, canvas.width, canvas.height)
          const x = (canvas.width - img.width) / 2
          const y = (canvas.height - img.height) / 2 + 150
          context.drawImage(img, x, y)
          setBgURL(canvas.toDataURL())
        }
      }

      img.src = URL.createObjectURL(value)
    }
  }

  return (
    <div className="w-screen h-screen flex justify-center">
      <style jsx>{`
        .phone-qr {
          top: 310px;
          left: 40px;
        }
        .phone {
          width: 390px;
          height: 844px;
          background-color: ${backgroundColor};
        }
      `}</style>
      <div className="container p-4">
        <div className="mb-4 text-3xl text-center font-bold">QR Code Wallpaper</div>
        <div className="flex flex-col md:flex-row items-center mx-auto">
          <div className="w-full md:w-1/2 p-4">
            <div className="bg-white rounded-lg overflow-hidden shadow-md mb-4">
              <div className="px-8 py-16">
                <details className="border border-gray-300 rounded-md mb-2" open>
                  <summary className="bg-gray-200 px-4 py-2 cursor-pointer">URL</summary>
                  <div className="p-4">
                    <input
                      className="block border border-gray-400 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter URL"
                      value={url}
                      onChange={urlHandler}
                    />
                  </div>
                </details>

                <details className="border border-gray-300 rounded-md mb-2" open>
                  <summary className="bg-gray-200 px-4 py-2 cursor-pointer">Dots</summary>
                  <div className="p-4">
                    <label htmlFor="dot-color-picker">Color</label>
                    <ColorPickerInput color={dotColor} onChange={colorHandler} />
                  </div>
                </details>

                <details className="border border-gray-300 rounded-md mb-2" open>
                  <summary className="bg-gray-200 px-4 py-2 cursor-pointer">Background</summary>
                  <div className="p-4">
                    <div className="mb-2">
                      <label htmlFor="background-color-picker">Color</label>
                      <ColorPickerInput color={backgroundColor} onChange={backgroundColorHandler} />
                    </div>
                  </div>
                </details>

                <details className="border border-gray-300 rounded-md mb-2">
                  <summary className="bg-gray-200 px-4 py-2 cursor-pointer">Image</summary>
                  <div className="p-4">
                    <ImageLoaderInput value={imageUrl} onChange={imageHandler} />
                  </div>
                </details>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 p-4 mb-4 flex items-center flex-col">
            <div className="w-80 h-160 rounded-3xl bg-white border-8 border-black shadow-lg overflow-hidden mb-4">
              {bgURL !== '' ? <img src={bgURL} alt="QR code" /> : ''}
              <div className="hidden">
                <QRCode options={options} onRawData={getRawData} />
              </div>
            </div>
            <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded" onClick={downloadHandler}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
