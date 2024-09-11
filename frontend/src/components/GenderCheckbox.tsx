import React from "react"
const GenderCheckbox = ({
  selectedGender,
  onchangeGender,
}: {
  selectedGender: string
  onchangeGender: (gender: 'male' | 'female') => void
}) => {
  return (
    <div className="flex">
      <div className="form-control">
        <label className={`label gap-2 cursor-pointer`}>
          <span className="label-text text-white">Male</span>
          <input
            type="checkbox"
            className="checkbox border-slate-900"
            checked={selectedGender === 'male'}
            onChange={() => onchangeGender('male')}
          />
        </label>
      </div>
      <div className="form-control">
        <label className={`label gap-2 cursor-pointer`}>
          <span className="label-text text-white">Female</span>
          <input
            type="checkbox"
            className="checkbox border-slate-900"
            checked={selectedGender === 'female'}
            onChange={() => onchangeGender('female')}
          />
        </label>
      </div>
    </div>
  )
}
export default GenderCheckbox
