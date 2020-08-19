import React from 'react';
import cn from 'classnames';

const Button = ({ text, onClick, className }) => {
    return (
        <button
            onClick={onClick}
            className={cn('btn', className)}
        >{text}</button>
    )
}

export default Button;
