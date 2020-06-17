import React, { ReactNode } from 'react'
import styles from './index.module.scss'

type Props = {
  children?: ReactNode
  onClick?: () => void
}

const StdButton: React.FC<Props> = ({
  children,
  onClick,
}: Props) => {
  return (
    <button
      className={styles.root}
      type="button"
      onClick={() => {
        if (typeof onClick === 'function') {
          onClick()
        }
      }}
    >{children}</button>
  )
}

export default StdButton
