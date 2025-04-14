export function toGlobalId(type: string, id?: string | null) {
    if (!id) return ''
    return Buffer.from(`${type}:${id}`).toString('base64')
  }