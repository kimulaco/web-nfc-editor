export interface NDEFRecord {
  encoding?: string
  mediaType: string
  recordType: string
  data: any
}

export interface NDEFReadingEvent {
  serialNumber: string
  message: {
    records: NDEFRecord[]
  }
}

