export function bindEvent (nodes, methods) {
  nodes.forEach(node => {
    const handlerName = node.getAttribute('@click')
    const handler = methods[handlerName]
    node.addEventListener('click', handler.bind(this), false)
  })
}