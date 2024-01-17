// import convert from 'heic-convert/browser'
import * as Sentry from '@sentry/nextjs'

export function transformCloudinaryURL(
    url: string | undefined,
    configs: { width: number; height: number }
  ): string | null {
    if (!url) return null
    const [path, slug] = url.split('/upload/')
    return path
      .concat('/upload/')
      .concat(`h_${configs.height},c_scale/`)
      .concat(slug)
  }

  export const safeParse = (str: string) => {
    try {
      return JSON.parse(str)
    } catch (e) {
      Sentry.captureException(e)
      return null
    }
  }
  

// export const transformFileToBlobUrl = async (file: File | any) => {
//   if (file) {
//     if (file.type.includes('heic') || file.type.includes('heif')) {
//       const arrayBuffer = await file.arrayBuffer()
//       const buffer = Buffer.from(arrayBuffer)

//       const result = await convert({
//         buffer,
//         format: 'JPEG',
//         quality: 1
//       })

//       const converted = new Blob([result], { type: 'image/jpeg' })

//       return URL.createObjectURL(converted)
//     } else {
//       return URL.createObjectURL(file)
//     }
//   } else {
//     return ''
//   }
// }
