export const Filter = ({ label, options, onChange = () => {} }) => {

  return (
    <div className="pet-filter-container">
      <div className="filter-container">
        <label htmlFor={label}>{label}</label>
        <select onChange={e => onChange(e.target.value)} name={label} id={label} className="form-select">
          {options.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
        </select>
      </div>
    </div>
  )
};