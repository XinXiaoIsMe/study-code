import { MONTHS } from './config'
import { createTrs } from '../utils'
import { MonthDOMPool } from '../types'

const domPool: MonthDOMPool = {
  controlArea: null,
  monthNode: null
}

export function createMonthControlArea (year: number): HTMLElement {
  if (!domPool.controlArea) {
    domPool.controlArea = document.createElement('div')
    domPool.controlArea.className = 'month-control-area'
    domPool.controlArea.innerHTML = `
      <span class="month-control-btn btn-year-lt">&lt;&lt;</span>
      <span class="month-control-show">
        <span class="month-control-title">
          <span class="title-year">${ year }</span>
        </span>
      </span>
      <span class="month-control-btn btn-year-gt">&gt;&gt;</span>
    `
  } else {
    const oTitleMonth: HTMLElement = domPool.controlArea.querySelector('.title-year')!
    oTitleMonth.innerText = String(year)
  }

  return domPool.controlArea
}

export function createMonthNode (month: number): HTMLElement[] {
  if (!domPool.monthNode) {
    domPool.monthNode = createTrs(4)
    let index = 0

    domPool.monthNode.forEach(tr => {
      for (let i = 0; i < 3; i ++) {
        const oTd = document.createElement('td')
        oTd.className = 'static-month'
        oTd.setAttribute('data-month', String(index + 1))
        oTd.innerText = MONTHS[index ++]

        if (index === month) {
          oTd.className += ' current'
        }

        tr.appendChild(oTd)
      }
    })
  }

  return domPool.monthNode
}
