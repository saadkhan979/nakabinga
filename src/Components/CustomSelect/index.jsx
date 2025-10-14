import React, { forwardRef } from 'react';
import Form from 'react-bootstrap/Form';
import Styles from './style.module.css';

const CustomSelect = (
  {
    size = '',
    options = [],
    name,
    onChange,
    defaultValue,
    value,
    className,
    fullWidth,
    halfWidth,
    required,
    label,
    firstIsLabel,
    onBlur,
    error,
  },
  ref
) => {
  const handleSelectChange = (event) => {
    if (onChange) {
      onChange(event);
    }
  };

  // Adjust options for firstIsLabel
  const selectOptions = firstIsLabel ? [{ value: '', label: options[0]?.label, disabled: true }, ...options.slice(1)] : options;

  return (
    <div className={`mb-3 ${Styles.customSelect} ${fullWidth && Styles.fullWidth} ${halfWidth && Styles.halfWidth}`}>
      {label && (
        <label htmlFor={name}>
          {label}
          {required && <span className="text-danger">*</span>}
        </label>
      )}
      <Form.Select
        ref={ref}
        name={name}
        defaultValue={defaultValue}
        value={value}
        onChange={handleSelectChange}
        size={size}
        className={Styles[className]}
        onBlur={onBlur}
      >
        {selectOptions.map(({ value, label, disabled }, index) => (
          <option
            key={`${name}-${index}`}
            value={value}
            disabled={disabled}
            className={label?.toLowerCase().startsWith('add new') ? 'text-center secondary-color' : ''}
          >
            {label}
          </option>
        ))}
      </Form.Select>
      {error && <div className="invalid-feedback d-block">{error}</div>}
    </div>
  );
};

export default forwardRef(CustomSelect);
