import { forwardRef, useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import './style.css';

const CustomInput = forwardRef(
  (
    {
      rightIcon: IconToBeUsed,
      label,
      required,
      type,
      placeholder,
      autoComplete = 'off',
      id,
      name,
      inputClass,
      borderRadius,
      style,
      labelClass,
      onChange,
      onBlur,
      value,
      defaultValue,
      rows = 1,
      cols,
      min,
      max,
      iconColor,
      error = true,
      showBorders = true,
      disabled = false,
      direction,
      readOnly = false,
      onButtonClick,
      rightText,
      autoFocus,
      maxLength, // <-- Add maxLength prop
      containerClass,
    },
    ref
  ) => {
    const [typePass, setTypePass] = useState(true);

    const togglePassType = () => {
      setTypePass(!typePass);
    };

    return (
      <div className={`inputWrapper ${containerClass || ''} ${!error ? 'mb-0' : ''}`} style={style}>
        {label && (
          <label htmlFor={id} className={labelClass}>
            {label}
            {required ? <span className="text-danger">*</span> : ''}
          </label>
        )}
        {type === 'password' ? (
          <div className="d-flex align-items-center position-relative">
            <input
              ref={ref}
              type={typePass ? 'password' : 'text'}
              placeholder={placeholder}
              id={id}
              name={name}
              className={`mainInput passInput ${inputClass} ${IconToBeUsed ? 'paddingWithRightIcon' : ''}`}
              style={{ borderRadius: borderRadius }}
              value={value}
              onChange={(e) => {
                if (!maxLength || e.target.value.length <= maxLength) {
                  onChange && onChange(e);
                }
              }}
              onBlur={onBlur}
              readOnly={readOnly}
              maxLength={maxLength} // <-- Apply maxLength
            />
            <button type="button" className="right-icon" onClick={togglePassType}>
              {typePass ? <FaRegEyeSlash color={inputClass ? '#bbb' : '#707C8B'} /> : <FaRegEye color={inputClass ? '#bbb' : '#707C8B'} />}
            </button>
          </div>
        ) : type === 'textarea' ? (
          <textarea
            ref={ref}
            style={{
              borderRadius: borderRadius,
            }}
            direction={direction}
            disabled={disabled}
            placeholder={placeholder}
            id={id}
            name={name}
            rows={rows}
            cols={cols}
            className={`mainInput ${inputClass}`}
            onChange={(e) => {
              if (!maxLength || e.target.value.length <= maxLength) {
                onChange && onChange(e);
              }
            }}
            onBlur={onBlur}
            value={value}
            defaultValue={defaultValue}
            readOnly={readOnly}
            maxLength={maxLength} // <-- Apply maxLength
          />
        ) : (
          <div className="d-flex align-items-center position-relative">
            <input
              ref={ref}
              dir={direction}
              disabled={disabled}
              type={type}
              placeholder={placeholder}
              autoComplete={autoComplete}
              autoFocus={autoFocus}
              id={id}
              name={name}
              style={{
                borderRadius: borderRadius,
                borderWidth: `${showBorders ? '1px' : 0}`,
                paddingRight: rightText && '60px',
                ...(!showBorders && { borderColor: '#00000000' }),
              }}
              className={`mainInput ${inputClass} ${IconToBeUsed ? 'morePadding' : ''}`}
              onChange={(e) => {
                if (!maxLength || e.target.value.length <= maxLength) {
                  onChange && onChange(e);
                }
              }}
              onBlur={onBlur}
              value={value}
              defaultValue={defaultValue}
              min={type === 'date' || type === 'time' || type === 'number' ? min : undefined}
              max={type === 'date' || type === 'time' || type === 'number' ? max : undefined}
              readOnly={readOnly}
              maxLength={maxLength} // <-- Apply maxLength
              onKeyDown={(e) => {
                if (e.key === 'Enter' && onButtonClick) {
                  onButtonClick();
                }
              }}
            />
            {IconToBeUsed ? (
              <div className="right-icon" onClick={onButtonClick}>
                <IconToBeUsed color={iconColor} />
              </div>
            ) : rightText ? (
              <div className="right-icon" style={{ fontSize: '12px' }} onClick={onButtonClick}>
                {rightText}
              </div>
            ) : null}
          </div>
        )}
        {error && <div className="input-error-message text-danger">{error}</div>}
      </div>
    );
  }
);

export default CustomInput;
