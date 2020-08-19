import React from 'react';
import cn from 'classnames';

const InputWithError = ({labelText, name, value, placeholder, onChange, errorMsg, className}) => {
    const onChangeHandler = e => {
        const { value } = e.target;
        onChange(name, value);
    }

    return (
        <div className={cn('input-group', className)}>
            <div className="input-group__main">
                {labelText && <label htmlFor={name}>{labelText}</label>}
                <input
                    type="text"
                    value={value}
                    placeholder={placeholder}
                    onChange={onChangeHandler}
                    className={cn('input-group__input', {'error': errorMsg})}
                />
            </div>
            {errorMsg && <span className="input-group__error">{errorMsg}</span>}
        </div>
    )
}

export default InputWithError;
