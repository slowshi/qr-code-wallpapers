import { ChangeEvent, useRef, useState } from 'react'
import Button from './Button'
interface Props {
  onChange: (value: string) => void
}
function ImageLoaderInput({ onChange }: Props) {
  const [imageData, setImageData] = useState<string>('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        const result = reader.result?.toString() || ''
        setImageData(result)
        onChange(result)
      }
      reader.readAsDataURL(file)
    }
  }

  // const handleClearClick = () => {
  //   setImageData('')
  //   onChange('')
  //   if (fileInputRef.current) {
  //     fileInputRef.current.value = ''
  //   }
  // }

  return (
    <div className="flex">
      <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
      <Button onClick={() => fileInputRef.current?.click()}>Upload</Button>
      {/* {imageData && (
        <div className="relative inline-block ml-2">
          <button className="bg-red-500 text-white font-bold py-2 px-4 rounded" onClick={handleClearClick}>
            x
          </button>
        </div>
      )} */}
    </div>
  )
}

export default ImageLoaderInput
