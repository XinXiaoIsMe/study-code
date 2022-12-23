import './index.scss'
import {
  createYearControlArea,
  createYearNode
} from './creator'
import { getStartAndEndYear } from './utils'

export function render (container: HTMLElement, year: number): void {
  container.innerHTML = ''
  const oTable = document.createElement('table')
  oTable.className = 'year-calendar-table'

  const controlArea = createYearControlArea(year)
  const yearNode = createYearNode(year)

  yearNode.forEach(tr => oTable.appendChild(tr))

  container.appendChild(controlArea)
  container.appendChild(oTable)
}

export function update (year: number): void {
  const oTable: HTMLElement = document.querySelector('.year-calendar-table')!
  const oStartYear: HTMLElement = document.querySelector('.start-year')!
  const oEndYear: HTMLElement = document.querySelector('.end-year')!
  const yearNode = createYearNode(year)
  const [ startYear, endYear ] = getStartAndEndYear(year)
  
  oTable.innerHTML = ''
  oStartYear.innerText = String(startYear)
  oEndYear.innerText = String(endYear)
  yearNode.forEach(tr => oTable.appendChild(tr))
}
