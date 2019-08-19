import React from 'react';
import './Input.css';
const input = (props) => {
  let inputElement = null;
  const inputClasses = ['InputElement']
  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push('invalid');
  }
  switch (props.elementType) {
    case 'input':
      inputElement = <input onChange={props.changed} className={inputClasses.join(" ")} {...props.validations} {...props.elementConfig} value={props.value} />
      break;
    case 'textarea':
      inputElement = <input onChange={props.changed} className={inputClasses.join(" ")} {...props.validations} {...props.elementConfig} value={props.value} />
      break;
    case 'email':
      inputElement = <input onChange={props.changed} className={inputClasses.join(" ")} {...props.validations}{...props.elementConfig} value={props.value} />
      break;
    case 'select':
      inputElement = (
        <select onChange={props.changed}
          className={inputClasses.join(" ")} {...props.elementConfig} value={props.value}>
          {props.elementConfig.options.map(option => (
            <option key={option.value} value={option.value}>{option.displayValue}</option>
          ))}
        </select>
      )
      break;
    default:
      inputElement = <input onChange={props.changed} {...props.validations} className={inputClasses.join(" ")} {...props.elementConfig} value={props.value} />
  }
  let validationError = null;
  if (props.invalid && props.touched) {
    validationError = <p>Please enter a valid value!</p>;
  }
  return (
    <div className="Input">
      <label className="Label">{props.label}</label>
      {inputElement}
      {validationError}
    </div>
  );
}

export default input;