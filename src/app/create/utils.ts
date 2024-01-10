import convert from 'heic-convert'

export const transformFileToBlobUrl = async (file: File | any) => {
  if (file) {
    if (file.type.includes('heic') || file.type.includes('heif')) {
      const arrayBuffer = await file.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)

      const result = await convert({
        buffer,
        format: 'JPEG',
        quality: 1
      })

      const converted = new Blob([result], { type: 'image/jpeg' })

      return URL.createObjectURL(converted)
    } else {
      return URL.createObjectURL(file)
    }
  } else {
    return ''
  }
}
