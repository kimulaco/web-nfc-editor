import React, { useState } from 'react'
import { decodeRecode } from '../../utils/nfc'
import StdButton from '../../components/StdButton/'
import styles from './index.module.scss'

type Props = {
  record: NDEFRecord
  index: number
  onChange: (recode: NDEFRecord) => void
}

const RecodeEditor: React.FC<Props> = ({
  record,
  index,
  onChange,
}: Props) => {
  const [recodeValue] = useState<string>(decodeRecode(record))
  const [value, setValue] = useState<string>(recodeValue)
  const textareaLineLength = (value.match(/\r\n|\r|\n/g) || []).length + 1
  const textareaHeight = (24 * textareaLineLength) + 32

  return (
    <div className={styles.root}>
      <div className="flex items-start mb-sm">
        <p className={styles.index}>{index}</p>
        <div>
          <p>Media Type: {record.mediaType}</p>
          <p>Record Type: {record.recordType}</p>
        </div>
      </div>
      <div className="mb-sm">
        <StdButton
          onClick={() => {
            setValue(recodeValue)
          }}
        >Reset</StdButton>
      </div>
      <div>
        <textarea
          className={styles.textarea}
          style={{
            height: `${textareaHeight}px`,
            minHeight: `${textareaHeight}px`,
            maxHeight: `${textareaHeight}px`,
          }}
          value={value}
          onChange={(event: any) => {
            const encoder = new TextEncoder()
            setValue(event.target.value)
            onChange({
              mediaType: record.mediaType,
              recordType: record.recordType,
              data: encoder.encode(event.target.value),
            })
          }}
        />
      </div>
    </div>
  )
}

export default RecodeEditor
