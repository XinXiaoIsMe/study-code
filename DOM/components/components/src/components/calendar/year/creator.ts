import {
  createDecadeYears,
  getStartAndEndYear
} from './utils'
import { YearDOMPool } from '../types'
import { createTrs, getDateInfo } from '../utils'

const domPool: YearDOMPool = {
  controlArea: null
}

export function createYearControlArea (year: number): HTMLElement {
  const [ startYear, endYear ] = getStartAndEndYear(year)

  if (!domPool.controlArea) {
    domPool.controlArea = document.createElement('div')
    domPool.controlArea.className = 'year-control-area'
    domPool.controlArea.innerHTML = `
      <span class="year-control-btn btn-year-lt">&lt;&lt;</span>
      <span class="year-control-show">
        <span class="year-control-title">
          <span class="start-year">${ startYear }</span>
          -
          <span class="end-year">${ endYear }</span>
        </span>
      </span>
      <span class="year-control-btn btn-year-gt">&gt;&gt;</span>
    `
  } else {
    const oStartYearSpan: HTMLElement = domPool.controlArea.querySelector('.start-year')!
    const oEndYearSpan: HTMLElement = domPool.controlArea.querySelector('.end-year')!

    oStartYearSpan.innerText = String(startYear)
    oEndYearSpan.innerText = String(endYear)
  }

  return domPool.controlArea
}

export function createYearTd (year: number): HTMLElement[] {
  const decadeYearArr: number[] = createDecadeYears(year)
  const currentYear: number = getDateInfo()[0]
  const tdArr: HTMLElement[] = []

  decadeYearArr.forEach(_year => {
    const oTd: HTMLElement = document.createElement('td')
    oTd.className = 'year decade-year'

    if (_year === currentYear) {
      oTd.className += ' current'
    }

    oTd.innerText = String(_year)
    oTd.setAttribute('data-year', String(_year))
    tdArr.push(oTd)
  })

  return tdArr
}

export function createYearNode (year: number): HTMLElement[] {
  const yearTrs: HTMLElement[] = createTrs(3)
  const yearTds: HTMLElement[] = createYearTd(year)

  let index = 0

  yearTrs.forEach(tr => {
    for (let i = 0; i < 4 && yearTds[index]; i ++) {
      tr.appendChild(yearTds[index])
      index ++
    }
  })

  return yearTrs
}
