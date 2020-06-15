import React, { useState, useMemo } from 'react'
import AppLayout from '../components/AppLayout/'
import { readNFC } from '../utils/nfc'

const IndexPage: React.FC = () => {
  const [NDEFData, setNDEFData] = useState<NDEFReadingEvent | null>(null)
  const records = NDEFData?.message?.records || []

  const handleClickReadNFC = async () => {
    try {
      const content = await readNFC()
      console.log(content)
      setNDEFData(content)
    } catch (error) {
      console.error(error)
      console.error(error)
    }
  }

  const handleClickClear = () => {
    setNDEFData(null)
  }

  const NFCInfo = () => {
    if (NDEFData?.serialNumber) {
      return (
        <div className="mb-lg">
          {NDEFData.serialNumber}
        </div>
      )
    }
    return <div></div>
  }

  return (
    <AppLayout>
      <div>
        <button
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
          type="button"
          onClick={handleClickReadNFC}
        >Read NFC</button>

        <button
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
          type="button"
          onClick={handleClickClear}
        >Clear</button>
      </div>

      <NFCInfo />

      <div>
        <p>{records.length} records.</p>
      </div>
    </AppLayout>
  )
}

export default IndexPage
