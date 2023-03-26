import { useState } from 'react'
import { IPFS_URL } from '@/constants'
import Button from './Button'

interface DoodleProps {
  onSubmit?: (imageUrl: string) => void
}

const DoodleSearch = ({ onSubmit }: DoodleProps) => {
  const [inputValue, setInputValue] = useState('')
  const [loading, setLoading] = useState(false)

  const getImageMetadata = async (imageUrl: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const image = new Image()
      image.crossOrigin = 'anonymous'
      image.onload = () => {
        const canvas = document.createElement('canvas')
        canvas.width = image.width
        canvas.height = image.height
        const ctx = canvas.getContext('2d')
        if (ctx) {
          ctx.drawImage(image, 0, 0)
          resolve(canvas.toDataURL())
        }
      }
      image.src = imageUrl
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const response = await fetch(`/api/doodle/${inputValue}`)
    const data = await response.json()
    if (data.error) {
      return
    }
    const imageUrl = `${IPFS_URL}/${data.image.substring(7)}`
    const metadata = await getImageMetadata(imageUrl)
    if (onSubmit) {
      onSubmit(metadata)
    }
    setLoading(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Token ID"
          value={inputValue}
          onChange={handleInputChange}
          className="border border-gray-400 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
        />
        <Button type="submit" loading={loading} disabled={inputValue === ''}>
          Submit
        </Button>
      </div>
    </form>
  )
}

export default DoodleSearch
