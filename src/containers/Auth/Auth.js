import React, { Component } from 'react';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import './Auth.css'
class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Email'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password'
        },
        value: '',
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    }
  }
  inputChangeHandler(event, controlName) {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value
      }
    }
    this.setState({ controls: updatedControls });

  }
  render() {
    const formElementArray = [];
    for (let key in this.state.controls) {
      formElementArray.push({
        id: key,
        config: this.state.controls[key]
      })
    }
    let form = (
      <div>
        <form>
          {formElementArray.map(formElement => (
            <Input changed={(event) => this.inputChangeHandler(event, formElement.id)}
              key={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              invalid={!formElement.config.valid}
              shouldValidate={formElement.config.validation}
              touched={formElement.config.touched}
              validations={formElement.config.validation}
            />
          ))}
          <Button class='Success'>AUTH</Button>
        </form>
      </div>
    )
    return (
      <div className="Auth">
        {form}
      </div>
    );
  }
}
export default Auth;