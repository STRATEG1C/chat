import React from 'react';
import cn from 'classnames';
import './style.scss';

const Loader = ({mode, className}) => {
    return (
        <div className={cn('loader', {'fullscreen': mode === 'fullscreen'})}>
            <div className={cn('lds-ellipsis', className)}>
                <div/>
                <div/>
                <div/>
                <div/>
            </div>
        </div>
    );
}

export default Loader;
