import React from 'react';
import styles from './RootHeader.module.css';

const RootHeader = () => {
  return (
    <header className={styles.header} data-testid="root-header">
      <div className={styles.bannerBlock} data-testid="top-banner">
        {/* <Image 
          src={rootHeaderLogo.src} 
          alt={rootHeaderLogo.alt}
          width={rootHeaderLogo.width}
          height={rootHeaderLogo.height}
          className={styles.bannerImg}
          data-testid="top-banner-img"
        /> */}
        <span className={styles.bannerText} data-testid="top-banner-title-text">
          ELMS - Employees Leave Management System
        </span>
      </div>
    </header>
  );
};

export default RootHeader;
