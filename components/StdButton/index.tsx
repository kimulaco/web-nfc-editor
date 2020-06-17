import React, { ReactNode } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import styles from './index.module.scss'

type Props = {
  children?: ReactNode
  type?: string
  onClick?: () => void
}

const StdButton: React.FC<Props> = ({
  children,
  type = 'button',
  onClick,
}: Props) => {
  return (
    <button
      className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
      type={type}
      onClick={() => {
        if (typeof onClick === 'function') {
          onClick()
        }
      }}
    >{children}</button>
  )
}

export default StdButton
