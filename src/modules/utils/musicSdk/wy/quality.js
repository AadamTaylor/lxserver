import { sizeFormate } from '../../index'

const getSize = (info) => {
  const size = info?.size
  return size == null || size === 0 || size === '0' ? null : sizeFormate(Number(size))
}

const addQuality = (types, _types, type, size, isPlatformQuality = false) => {
  if (_types[type]) return
  const qualityInfo = { size }
  if (isPlatformQuality && size == null) qualityInfo.isPlatformQuality = true
  types.push({ type, ...qualityInfo })
  _types[type] = qualityInfo
}

export const buildQualitys = (item = {}, privilege = {}) => {
  const types = []
  const _types = {}

  const maxbr = Number(privilege?.maxbr || item.privilege?.maxbr || 0)
  if (maxbr >= 128000 || item.l) addQuality(types, _types, '128k', getSize(item.l))
  if (maxbr >= 320000 || item.h) addQuality(types, _types, '320k', getSize(item.h))
  if (maxbr >= 999000 || item.sq) addQuality(types, _types, 'flac', getSize(item.sq))

  const hiresSize = getSize(item.hr)
  addQuality(types, _types, 'flac24bit', hiresSize, true)
  addQuality(types, _types, 'hires', hiresSize, true)
  addQuality(types, _types, 'atmos', getSize(item.jyEffect || item.sky), true)
  addQuality(types, _types, 'master', getSize(item.jm || item.jymaster), true)

  return { types, _types }
}
