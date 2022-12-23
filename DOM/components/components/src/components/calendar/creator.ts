import { TableDOMPool } from './types'

const domPool: TableDOMPool = {
  table: null
}

export function createTable (className: string): HTMLElement {
  domPool.table 
    ? (domPool.table.innerHTML = '') 
    : (domPool.table = document.createElement('table'))
  domPool.table.className = className
  return domPool.table
}
