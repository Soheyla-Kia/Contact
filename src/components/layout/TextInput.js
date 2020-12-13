import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
const TextInput = (props) => {
  const { lable, type, name, placeholder, value, onChange, error } = props
  return (
    <div className='form-group'>
      <label htmlFor={name}>{lable}</label>
      <input
        type={type}
        name={name}
        id={name}
        className={classnames('form-control', { 'is-invalid': error })}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {error && <div className='invalid-feedback'>{error}</div>}
    </div>
  )
}

TextInput.defaultProps = {
  type: 'text',
}
TextInput.propTypes = {
  lable: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default TextInput
