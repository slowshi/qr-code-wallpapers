import { TwitterPicker, ColorChangeHandler, ColorResult } from 'react-color'
import { useState } from 'react'
import { palette } from '@/constants'

interface Props {
  color: string
  onChange: (color: ColorResult) => void
  disabled?: boolean
}

function ColorPickerInput({ color, onChange, disabled = false }: Props) {
  const [displayPicker, setDisplayPicker] = useState(false)

  const handleClick = () => {
    setDisplayPicker(!displayPicker)
  }

  const handleClose = () => {
    setDisplayPicker(false)
  }

  const handleChange: ColorChangeHandler = (color) => {
    onChange(color)
  }

  const colorPickerClasses = `p-2 border border-gray-400 bg-white rounded-lg shadow-sm inline-block cursor-pointer ${
    disabled ? 'opacity-50 bg-gray-300 pointer-events-none' : ''
  }`
  const colorPickerBoxClasses = `w-9 h-4 rounded-sm bg-color`

  return (
    <div>
      <style jsx>{`
        .bg-color {
          background-color: ${color};
        }
      `}</style>
      <div className={colorPickerClasses} onClick={handleClick}>
        <div className={colorPickerBoxClasses} />
      </div>
      {displayPicker ? (
        <div className="absolute z-10">
          <div className="fixed top-0 right-0 bottom-0 left-0" onClick={handleClose} />
          <TwitterPicker
            colors={[...Object.values(palette), '#FFFFFF', '#424242']}
            color={color}
            onChange={handleChange}
          />
        </div>
      ) : null}
    </div>
  )
}

export default ColorPickerInput
