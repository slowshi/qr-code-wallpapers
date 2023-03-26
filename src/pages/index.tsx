import { ChangeEvent, useEffect, useState } from 'react'
import { defaultStyling } from '../constants'
import QRCode from '@/components/QRCode'
import { ColorResult } from 'react-color'
import ColorPickerInput from '@/components/ColorPickerInput'
import { Options as QRCodeStylingOptions } from 'qr-code-styling'
import ImageLoaderInput from '@/components/ImageLoaderInput'
import Switch from '@/components/Switch'
import DoodleSearch from '@/components/DoodleSearch'
import Button from '@/components/Button'

export default function Home() {
  useEffect(() => {
    document.title = 'QR Code Wallpaper'
  }, [])

  const [bgURL, setBgURL] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [url, setUrl] = useState('https://doodles.app')
  const [dotColor, setDotColor] = useState('#424242')
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF')
  const [backgroundColorTo, setBackgroundColorTo] = useState('#FFFFFF')
  const [backgroundGrardient, setBackgroundGradient] = useState(false)
  const [options, setOptions] = useState<QRCodeStylingOptions>(defaultStyling)
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null)

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
    if (backgroundGrardient === false) {
      console.log('we change both')
      setBackgroundColorTo(color.hex)
    }
    setOptions({
      ...options,
    })
  }
  const backgroundColorToHandler = (color: ColorResult) => {
    setBackgroundColorTo(color.hex)
    setOptions({
      ...options,
    })
  }
  const urlHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value
    setUrl(url)

    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    const newTimeoutId = setTimeout(() => {
      if (url !== '') {
        setOptions({
          ...options,
          data: url,
        })
      }
    }, 1000)

    setTimeoutId(newTimeoutId)
  }
  const imageHandler = (value: string) => {
    setImageUrl(value)
    setOptions({
      ...options,
      image: value,
    })
  }
  const handleClearImage = () => {
    setImageUrl('')
    setOptions({
      ...options,
      image: '',
    })
  }
  const downloadHandler = () => {
    const link = document.createElement('a')
    link.download = 'background.png'
    link.href = bgURL
    link.click()
  }
  const grandientHandler = () => {
    if (!backgroundGrardient === false) {
      setBackgroundColorTo(backgroundColor)
      setOptions({
        ...options,
      })
    }
    setBackgroundGradient(!backgroundGrardient)
  }
  const getRawData = (value: string) => {
    const canvas = document.createElement('canvas')
    canvas.width = 390 * 4
    canvas.height = 844 * 4
    const context = canvas.getContext('2d')

    const img = new Image()
    img.onload = () => {
      if (context) {
        const gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height)
        gradient.addColorStop(0, backgroundColor)
        gradient.addColorStop(1, backgroundColorTo)
        context.fillStyle = gradient
        context.fillRect(0, 0, canvas.width, canvas.height)
        const x = (canvas.width - img.width) / 2
        const y = (canvas.height - img.height) / 2 + 150
        context.drawImage(img, x, y)
        setBgURL(canvas.toDataURL())
      }
    }

    img.src = value
  }
  return (
    <div className="w-screen h-screen flex justify-center">
      <div className="container p-4">
        <div className="mb-4 text-3xl text-center font-bold">QR Code Wallpaper</div>
        <div className="flex flex-col md:flex-row items-center mx-auto">
          <div className="w-full md:w-1/2 p-4">
            <div className="bg-white rounded-lg overflow-hidden shadow-md mb-4">
              <ul className="divide-y divide-gray-300">
                <li className="px-6 py-3">
                  <h3 className="text-lg font-bold mb-2">URL</h3>
                  <div className="p-4">
                    <input
                      className="block border border-gray-400 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                      placeholder="Enter URL"
                      value={url}
                      onChange={urlHandler}
                    />
                  </div>
                </li>
                <li className="px-6 py-3">
                  <h3 className="text-lg font-bold mb-2">Doodle/Image</h3>
                  <div className="p-4">
                    <div className="mb-4">
                      <DoodleSearch onSubmit={imageHandler}></DoodleSearch>
                    </div>
                    <div className="flex justify-between items-center">
                      <ImageLoaderInput onChange={imageHandler} />
                      {imageUrl !== '' ? (
                        <Button className="bg-red-500 hover:bg-red-600" onClick={handleClearImage}>
                          x
                        </Button>
                      ) : (
                        ''
                      )}
                    </div>
                  </div>
                </li>
                <li className="px-6 py-3">
                  <div className="flex justify-between">
                    <div className="w-1/2">
                      <h3 className="text-lg font-bold mb-2">Dots</h3>
                      <div className="p-4">
                        <label htmlFor="dot-color-picker">Color</label>
                        <ColorPickerInput color={dotColor} onChange={colorHandler} />
                      </div>
                    </div>
                    <div className="w-1/2">
                      <h3 className="text-lg font-bold mb-2">Background</h3>
                      <div className="p-4">
                        <div className="mb-2">
                          <label htmlFor="background-color-picker">Color</label>
                          <ColorPickerInput color={backgroundColor} onChange={backgroundColorHandler} />
                          <label htmlFor="background-gradient">Gradient</label>
                          <div className="flex">
                            <div className="mr-2">
                              <ColorPickerInput
                                disabled={!backgroundGrardient}
                                color={backgroundColorTo}
                                onChange={backgroundColorToHandler}
                              />
                            </div>
                            <Switch
                              className="m-2"
                              id="bg-gradient"
                              onChange={grandientHandler}
                              checked={backgroundGrardient}
                            ></Switch>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full md:w-1/2 p-4 mb-4 flex items-center flex-col">
            <div className="w-80 h-160 rounded-3xl bg-white border-8 border-black shadow-lg overflow-hidden mb-4">
              {bgURL !== '' ? <img src={bgURL} alt="QR code" /> : ''}
              <div className="hidden">
                <QRCode options={options} onRawData={getRawData} />
              </div>
            </div>
            <Button onClick={downloadHandler}>Download</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
