import React, { useState } from 'react'
import AppLayout from '../components/AppLayout/'
import StdButton from '../components/StdButton/'
import RecodeEditor from '../components/RecodeEditor/'
import { readNFC, writeNFC } from '../utils/nfc'
import { NDEFRecord, NDEFReadingEvent } from '../interfaces/nfc'

const IndexPage: React.FC = () => {
  const [NDEFData, setNDEFData] = useState<NDEFReadingEvent | null>(null)
  const [records, setRecords] = useState<NDEFRecord[]>([])
  const [isReadNFC, setIsReadNFC] = useState<boolean>(false)
  let isWriting = false

  const updateNewRecords = (index: number, record: NDEFRecord) => {
    const newRecords: NDEFRecord[] = [...records]
    newRecords[index] = record
    setRecords(newRecords)
  }

  const handleClickReadNFC = async () => {
    if (isWriting) {
      return
    }

    try {
      const content: NDEFReadingEvent = await readNFC()
      setNDEFData(content)
      setRecords(content?.message?.records || [])
      setIsReadNFC(true)
    } catch (error) {
      console.error(error)
      alert('NFCカードの読み込みに失敗しました。')
    }
  }

  const handleClickWriteNFC = async () => {
    isWriting = true
    try {
      await writeNFC(records)
      isWriting = false
      alert('NFCカードへの書き込みに成功しました。')
    } catch (error) {
      console.error(records)
      console.error(error)
      isWriting = false
      alert('NFCカードへの書き込みに失敗しました。')
    }
  }

  const handleClickClear = () => {
    setNDEFData(null)
    setRecords([])
    setIsReadNFC(false)
  }

  const handleClickAddRecode = () => {
    const encoder = new TextEncoder()
    const newRecords = [...records]
    newRecords.push({
      mediaType: 'application/json',
      recordType: 'mime',
      data: encoder.encode('{}'),
    })
    setRecords(newRecords)
  }

  const NFCInfo = () => {
    if (NDEFData?.serialNumber) {
      return (
        <div className="my-md">
          <p>{NDEFData.serialNumber}</p>
          <p>{records.length} records.</p>
        </div>
      )
    }
    return <div className="my-md">
      <p>0 records.</p>
    </div>
  }

  return (
    <AppLayout>
      <ul className="flex flex-wrap">
        <li className="mr-xs">
          <StdButton onClick={handleClickReadNFC}>Read NFC</StdButton>
        </li>
        <li className="mr-xs">
          <StdButton onClick={handleClickWriteNFC}>Write NFC</StdButton>
        </li>
        <li>
          <StdButton onClick={handleClickClear}>Clear</StdButton>
        </li>
      </ul>

      <NFCInfo />

      <div>
        {records.map((record: NDEFRecord, index: number) => {
          return (
            <RecodeEditor
              key={`record-${index + 1}`}
              record={record}
              index={index + 1}
              onChange={(record: NDEFRecord) => {
                updateNewRecords(index, record)
              }}
            />
          )
        })}
      </div>

      {!isReadNFC ? null : (
        <div>
          <StdButton onClick={handleClickAddRecode}>Add Recode</StdButton>
        </div>
      )}
    </AppLayout>
  )
}

export default IndexPage
