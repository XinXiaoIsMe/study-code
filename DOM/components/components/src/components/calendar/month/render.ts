import './index.scss'
import {
  createMonthControlArea,
  createMonthNode
} from './creator'
import { createTable } from '../creator'

export function render (container: HTMLElement, year: number, month: number): void {
  container.innerHTML = ''

  const oTable = createTable('month-calendar-table')
  const oControlArea = createMonthControlArea(year)
  const monthNode = createMonthNode(month)

  monthNode.forEach(tr => oTable.appendChild(tr))
  container.appendChild(oControlArea)
  container.appendChild(oTable)
}

export function update (year: number): void {
  const oYear: HTMLElement = document.querySelector('.title-year')!
  oYear.innerText = String(year)
}
