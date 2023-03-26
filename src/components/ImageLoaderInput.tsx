import { ChangeEvent, useRef, useState } from 'react'
interface Props {
  value: string
  onChange: (value: string) => void
}
function ImageLoaderInput({ value, onChange }: Props) {
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

  const handleClearClick = () => {
    setImageData('')
    onChange('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="flex">
      <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
      <button
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
        onClick={() => fileInputRef.current?.click()}
      >
        Upload
      </button>
      {imageData && (
        <div className="relative inline-block ml-2">
          <button className="bg-red-500 text-white font-bold py-2 px-4 rounded" onClick={handleClearClick}>
            x
          </button>
        </div>
      )}
    </div>
  )
}

export default ImageLoaderInput
