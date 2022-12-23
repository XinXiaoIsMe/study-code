import {
  update as dateUpdate,
  render as dateRender
} from './date/render'

import {
  update as yearUpdate,
  render as yearRender
} from './year/render'

import {
  update as monthUpdate,
  render as monthRender
} from './month/render'

import {
  DateInfo,
  DateMsg,
  ALLOWED_FLAGS
} from './types'

let currentFlag: ALLOWED_FLAGS = ALLOWED_FLAGS.DATE

export function getFlag (): ALLOWED_FLAGS {
  return currentFlag
}

export function setFlag (value: ALLOWED_FLAGS, { year, month }: DateMsg, container: HTMLElement): void {
  currentFlag = value
  switch (value) {
    case ALLOWED_FLAGS.YEAR:
      yearRender(container, year)
      break
    case ALLOWED_FLAGS.MONTH:
      monthRender(container, year, month)
      break
    case ALLOWED_FLAGS.DATE:
      dateRender(container, [year, month])
      break
    default:
      break
  }
}

export function reactive (_dateInfo: DateInfo): DateMsg {
  const dateInfo = Object.defineProperties({}, {
    year: {
      get (): number {
        return _dateInfo[0]
      },
      set (newValue: any): void {
        _dateInfo[0] = newValue
        update(_dateInfo[0], _dateInfo[1])
      }
    },
    month: {
      get (): number {
        return _dateInfo[1]
      },
      set (newValue: any): void {
        _dateInfo[1] = newValue
        update(_dateInfo[0], _dateInfo[1])
      }
    }
  })

  return dateInfo as DateMsg
}

function update (year: number, month: number): void {
  switch (currentFlag) {
    case ALLOWED_FLAGS.YEAR:
      yearUpdate(year)
      break
    case ALLOWED_FLAGS.MONTH:
      monthUpdate(year)
      break
    case ALLOWED_FLAGS.DATE:
      dateUpdate(year, month)
      break
  }
}
