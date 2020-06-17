import React, { ReactNode } from 'react'
import styles from './index.module.scss'

type Props = {
  children?: ReactNode
}

const AppMain: React.FC<Props> = ({
  children,
}: Props) => {
  return (
    <header className={styles.root}>
      <div className={styles.inner}>
        {children}
      </div>
    </header>
  )
}

export default AppMain
