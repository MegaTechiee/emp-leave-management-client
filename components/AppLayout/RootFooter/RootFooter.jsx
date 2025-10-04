import React from 'react';
import styles from "./RootFooter.module.css";

const RootFooter = () => {

  return (
    <footer className={styles.footer} data-testid="root-footer">
      <span data-testid="footer-text">
        Copyright 2025 © Employee Leave Management System
        / <a 
            href={'https://www.helpdesk.com'} 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.link}
            data-testid="footer-link"
          >
            our helpdesk
          </a>
      </span>
    </footer>
  )
}

export default RootFooter;
