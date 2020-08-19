import React, { useEffect } from 'react';
import cn from 'classnames';
import './style.scss';

const PageLayout = ({ title, headerTitle, children, className }) => {
    const onPageLoad = () => {
        document.title = title;
    };

    useEffect(onPageLoad);

    return (
        <div className={cn('page', className)}>
            <header className="page__header">
                <span className="page__header-title">
                    {headerTitle || title}
                </span>
            </header>
            <main className="page__content">
                {children}
            </main>
        </div>
    );
};

export default PageLayout;
