import React, {useState} from 'react';
import cn from 'classnames';

const PasswordInput = ({labelText, name, value, placeholder, onChange, errorMsg, className}) => {
    const [isVisible, setIsVisible] = useState(false);

    const onChangeHandler = e => {
        const {value} = e.target;
        onChange(name, value);
    };

    const visibleOrHiddenInput = (
        <input
            type={isVisible ? 'text' : 'password'}
            value={value}
            placeholder={placeholder}
            onChange={onChangeHandler}
            className={cn('input-group__input', {'error': errorMsg})}
        />
    );

    const visibilityButton = (
      <div className="input-group__visibility-button">
          <i
              className={cn('far', {'fa-eye-slash': !isVisible, 'fa-eye': isVisible})}
              onClick={() => setIsVisible(!isVisible)}
          />
      </div>
    );

    return (
        <div className={cn('input-group', className)}>
            <div className="input-group__main">
                {labelText && <label htmlFor={name}>{labelText}</label>}
                {visibleOrHiddenInput}
                {visibilityButton}
            </div>
            {errorMsg && <span className="input-group__error">{errorMsg}</span>}
        </div>
    )
}

export default PasswordInput;
