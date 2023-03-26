import { useState } from 'react'

interface SwitchProps {
  id: string
  checked: boolean
  onChange: (checked: boolean) => void
  className?: string
}

const Switch = ({ id, checked, onChange, className = '' }: SwitchProps) => {
  const [isChecked, setIsChecked] = useState(checked)

  const handleChange = () => {
    const newValue = !isChecked
    setIsChecked(newValue)
    if (onChange) {
      onChange(newValue)
    }
  }

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <label htmlFor={id} className="cursor-pointer">
        <div className={`relative rounded-full w-12 h-6 ${isChecked ? 'bg-blue-500' : 'bg-gray-300'}`}>
          <input type="checkbox" id={id} className="sr-only" checked={isChecked} onChange={handleChange} />
          <div
            className={`${
              isChecked ? 'translate-x-6' : ''
            } absolute transform transition-all duration-300  ease-in-out rounded-full w-6 h-6 bg-white shadow top-0 left-0 flex items-center justify-center`}
          >
            <span className="sr-only">Toggle</span>
          </div>
        </div>
      </label>
    </div>
  )
}

export default Switch
