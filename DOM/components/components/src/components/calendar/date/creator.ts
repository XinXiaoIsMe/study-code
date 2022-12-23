import { WEEK_DAYS } from './config'
import { 
  getLastMonthRestDays,
  getMonthDayCount,
  getNextMonthRestDays,
  getFormatDate
} from './utils'
import { getDateInfo, createTrs } from '../utils'
import { DateDOMPool } from '../types'

const domPool: DateDOMPool = {
  weekdays: null,
  controlArea: null
}

export function createWeekDaysNode (): HTMLElement {
  if (!domPool.weekdays) {
    domPool.weekdays = document.createElement('tr')
    domPool.weekdays.className = 'week-day'
    domPool.weekdays.innerHTML = WEEK_DAYS.map(item => `<th>${ item }</th>`).join('')
  }

  return domPool.weekdays
}

export function createDateNode (year: number, month: number): HTMLElement[] {
  const lastMonthRestDays: number[] = getLastMonthRestDays(year, month)
  const currentMonthDayCount: number = getMonthDayCount(year, month)
  const nextMonthRestDays: number[] = getNextMonthRestDays(year, month)
  const dateTrArr: HTMLElement[] = createTrs(6)
  const lastMonthRestDaysTD: HTMLElement[] = createRestDaysTD(lastMonthRestDays)
  const nextMonthRestDaysTD: HTMLElement[] = createRestDaysTD(nextMonthRestDays)
  const currentMonthDaysTD: HTMLElement[] = createCurrentDaysTD(currentMonthDayCount, year, month)
  const tdArr: HTMLElement[] = [
    ...lastMonthRestDaysTD,
    ...currentMonthDaysTD,
    ...nextMonthRestDaysTD
  ]
  let index = 0

  dateTrArr.forEach(tr => {
    for (let i = 0; i < 7; i ++) {
      tr.appendChild(tdArr[index])
      index ++
    }
  })

  return dateTrArr
}

function createRestDaysTD (restDays: number[]): HTMLElement[] {
  return restDays.map(item => {
    const oTd: HTMLElement = document.createElement('td')
    oTd.className = 'day rest-day'
    oTd.textContent = String(item)
    return oTd
  })
}

function createCurrentDaysTD (currentMonthDayCount: number, year: number, month: number): HTMLElement[] {
  const tdArr: HTMLElement[] = []

  const [
    currentYear,
    currentMonth,
    currentDate
  ] = getDateInfo()

  for (let i = 1; i <= currentMonthDayCount; i ++) {
    const oTd: HTMLElement = document.createElement('td')

    if (currentYear === year && currentMonth === month && currentDate === i) {
      oTd.className = 'day current-day current'
    } else {
      oTd.className = 'day current-day'
    }
    oTd.textContent = String(i)
    oTd.setAttribute('data-date', getFormatDate(year, month, i))
    tdArr.push(oTd)
  }

  return tdArr
}

export function createControlArea (year: number, month: number): HTMLElement {
  if (!domPool.controlArea) {
    domPool.controlArea = document.createElement('div')
    domPool.controlArea.className = 'control-area'
    domPool.controlArea.innerHTML = `
      <span class="control-btn btn-year-lt">&lt;&lt;</span>
      <span class="control-btn btn-month-lt">&lt;</span>
      <span class="control-show">
        <span class="control-title">
          <span class="title-year">${ year }</span>年
        </span>
        <span class="control-title">
          <span class="title-month">${ month }</span>月
        </span>
      </span>
      <span class="control-btn btn-month-gt">&gt;</span>
      <span class="control-btn btn-year-gt">&gt;&gt;</span>
    `
  } else {
    const oYearSpan: HTMLElement = domPool.controlArea.querySelector('.title-year')!
    const oMonthSpan: HTMLElement = domPool.controlArea.querySelector('.title-month')!
    oYearSpan.innerText = String(year)
    oMonthSpan.innerText = String(month)
  }

  return domPool.controlArea!
}
