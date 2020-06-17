import React, { useState, useMemo } from 'react'
import AppLayout from '../components/AppLayout/'
import StdButton from '../components/StdButton/'
import RecodeEditor from '../components/RecodeEditor/'
import { readNFC, writeNFC } from '../utils/nfc'

const IndexPage: React.FC = () => {
  const [NDEFData, setNDEFData] = useState<NDEFReadingEvent | null>(null)
  const [newRecords, setNewRecords] = useState<NDEFRecord[]>([])
  const records = NDEFData?.message?.records || []
  let isWriting = false

  const updateNewRecords = (index: number, record: NDEFRecord) => {
    const records: NDEFRecord[] = [...newRecords]
    records[index] = record
    setNewRecords(records)
  }

  const handleClickReadNFC = async () => {
    if (isWriting) {
      return
    }

    try {
      const content = await readNFC()
      console.log(content)
      setNDEFData(content)
      console.log('setNewRecords')
      console.log(content?.message?.records || [])
      setNewRecords(content?.message?.records || [])
    } catch (error) {
      console.error(error)
      alert('NFCカードの読み込みに失敗しました。')
    }
  }

  const handleClickWriteNFC = async () => {
    isWriting = true
    try {
      await writeNFC(newRecords)
      isWriting = false
      alert('NFCカードへの書き込みに成功しました。')
    } catch (error) {
      console.error(newRecords)
      console.error(error)
      isWriting = false
      alert('NFCカードへの書き込みに失敗しました。')
    }
  }

  const handleClickClear = () => {
    setNDEFData(null)
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
                console.log(record)
                updateNewRecords(index, record)
              }}
            />
          )
        })}
      </div>
    </AppLayout>
  )
}

export default IndexPage
