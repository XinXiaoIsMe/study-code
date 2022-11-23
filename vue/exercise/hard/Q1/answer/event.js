export function bindEvent (nodes, methods) {
  nodes.forEach(node => {
    const handlerName = node.getAttribute('@click')
    if (handlerName) {
      const handler = methods[handlerName]
      node.addEventListener('click', handler.bind(this), false)
    }
  })
}