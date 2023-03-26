import { TwitterPicker, ColorChangeHandler, RGBColor, ColorResult } from 'react-color'
import { useEffect, useState } from 'react'
import { palette } from '@/constants'
interface Props {
  color: string
  onChange: (color: ColorResult) => void
}
function ColorPickerInput({ onChange, color }: Props) {
  const [displayPicker, setDisplayPicker] = useState(false)
  // const [colorPickerStyle, setColorPickerStyle] = useState('rgba(241,112,19,1)')

  // useEffect(() => {
  //   if (color) {
  //     const { r, g, b, a } = color
  //     setColorPickerStyle(`rgba(${r}, ${g}, ${b}, ${a})`)
  //   }
  // }, [color])

  const handleClick = () => {
    setDisplayPicker(!displayPicker)
  }

  const handleClose = () => {
    setDisplayPicker(false)
  }

  const handleChange: ColorChangeHandler = (color) => {
    onChange(color)
  }

  return (
    <div>
      <style jsx>{`
        .bg-color {
          background-color: ${color};
        }
      `}</style>
      <div
        className="p-2 border border-gray-400 bg-white rounded-lg shadow-sm inline-block cursor-pointer"
        onClick={handleClick}
      >
        <div className="w-9 h-4 rounded-sm bg-color" />
      </div>
      {displayPicker ? (
        <div className="absolute z-10">
          <div className="fixed top-0 right-0 bottom-0 left-0" onClick={handleClose} />
          <TwitterPicker
            colors={[...Object.values(palette), '#FFFFFF', '#000000']}
            color={color}
            onChange={handleChange}
          />
        </div>
      ) : null}
    </div>
  )
}

export default ColorPickerInput
