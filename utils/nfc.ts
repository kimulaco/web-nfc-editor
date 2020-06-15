export const readNFC = async (): Promise<TODO<any>[]> => {
  return new Promise((resolve, reject) => {
    const reader = new NDEFReader()

    const handleError = (event: any) => {
      reader.removeEventListener('error', handleError)
      reader.removeEventListener('reading', handleReading)
      reject(error)
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
