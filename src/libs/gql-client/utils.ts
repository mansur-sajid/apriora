export function toGlobalId(type: string, id?: string | null) {
    if (!id) return ''
    return Buffer.from(`${type}:${id}`).toString('base64')
  }

  export function fromGlobalId(globalId?: string | null) {
    if (!globalId) return ''
    return Buffer.from(globalId, 'base64').toString('ascii').split(':')?.[1]
  }