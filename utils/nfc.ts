declare global {
  interface Window {
    NDEFReader: any
    NDEFWriter: any
  }
}

import { NDEFRecord, NDEFReadingEvent } from '../interfaces/nfc'

export const readNFC = (): Promise<NDEFReadingEvent> => {
  return new Promise((resolve, reject) => {
    const reader = new window.NDEFReader()

    const handleError = (event: any) => {
      reader.removeEventListener('error', handleError)
      reader.removeEventListener('reading', handleReading)
      reject(event)
    }

    const handleReading = (content: any) => {
      reader.removeEventListener('error', handleError)
      reader.removeEventListener('reading', handleReading)
      resolve(content)
    }

    const read = async () => {
      try {
        await reader.scan()

        reader.addEventListener('error', handleReading)
        reader.addEventListener('reading', handleReading)
      } catch (error) {
        reject(error)
      }
    }

    read()
  })
}

export const writeNFC = (records: NDEFRecord[]) => {
  return new Promise(async (resolve, reject) => {
    try {
      const writer = new window.NDEFWriter()
      await writer.write({ records })
      resolve()
    } catch (error) {
      reject(error)
    }
  })
}

export const getRecordType = (record: NDEFRecord): string => {
  if (
    record.recordType === 'mime' &&
    record.mediaType === 'application/json'
  ) {
    return 'json'
  } else if (record.recordType === 'text') {
    return 'text'
  } else {
    return ''
  }
}

export const decodeRecodeOfText = (recode: NDEFRecord): string => {
  const textDecoder = new TextDecoder(recode.encoding)
  return textDecoder.decode(recode.data)
}

export const decodeRecodeOfJSON = (
  recode: NDEFRecord
): { [key: string]: any } => {
  const textDecoder = new TextDecoder()
  return JSON.parse(textDecoder.decode(recode.data))
}

export const decodeRecodeOfImage = (recode: NDEFRecord): string => {
  const blob = new Blob([recode.data], {
    type: recode.mediaType
  })
  return URL.createObjectURL(blob)
}

export const decodeRecode = (record: NDEFRecord): string => {
  const recordType = getRecordType(record)
  if (recordType === 'json') {
    return JSON.stringify(decodeRecodeOfJSON(record))
  } else if (recordType === 'text') {
    return decodeRecodeOfText(record)
  } else {
    return ''
  }
}
