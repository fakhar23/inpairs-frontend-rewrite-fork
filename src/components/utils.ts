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