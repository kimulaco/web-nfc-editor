import React from 'react'
import styles from './index.module.scss'

const AppHeader: React.FC = () => {
  return (
    <header className={styles.root}>
      <div className={styles.inner}>
        <h1  className={styles.title}>Web NFC Editor</h1>
      </div>
    </header>
  )
}

export default AppHeader
