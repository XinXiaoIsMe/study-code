import './index.scss'
import { DateInfo } from '../types'
import {
  createDateNode,
  createWeekDaysNode,
  createControlArea
} from './creator'

export function render (container: HTMLElement, dateInfo: DateInfo) {
  const [year, month] = dateInfo
  const oTable: HTMLElement = document.createElement('table')
  const oTHead: HTMLElement = document.createElement('thead')
  const oTBody: HTMLElement = document.createElement('tbody')
  const weekDayNode: HTMLElement = createWeekDaysNode()

  container.innerHTML = ''
  oTable.className = 'calendar-table'
  oTBody.className = 'calendar-body'

  const dateTrs: HTMLElement[] = createDateNode(year, month)
  const oControlArea = createControlArea(year, month)

  dateTrs.forEach(tr => {
    oTBody.appendChild(tr)
  })

  oTHead.appendChild(weekDayNode)
  oTable.appendChild(oTHead)
  oTable.appendChild(oTBody)
  container.appendChild(oControlArea)
  container.appendChild(oTable)
}

export function update (year: number, month: number): void {
  const oTBody: HTMLElement = document.querySelector('.calendar-body')!
  const oTitleYear: HTMLElement = document.querySelector('.title-year')!
  const oTitleMonth: HTMLElement = document.querySelector('.title-month')!
  const dateTrs: HTMLElement[] = createDateNode(year, month)

  oTBody.innerHTML = ''
  oTitleYear.innerText = String(year)
  oTitleMonth.innerText = String(month)

  dateTrs.forEach(tr => {
    oTBody.appendChild(tr)
  })
}
