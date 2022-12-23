import { DateInfo } from './types'

export function getDateInfo (timeStamp?: number | undefined): DateInfo {
  const date = timeStamp ? new Date(timeStamp) : new Date()

  return [
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate()
  ]
}

export function createTrs (count: number) {
  const trArr: HTMLElement[] = []
  for (let i = 0; i < count; i ++) {
    trArr.push(document.createElement('tr'))
  }
  return trArr
}
