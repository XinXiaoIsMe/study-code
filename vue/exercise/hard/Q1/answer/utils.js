export const reg_var = /\{\{(.*?)\}\}/

export function shouldRender (node) {
  return reg_var.test(node.textContent)
}

export function shouldBindEvent (node) {
  return !!node.getAttribute('@click')
}

export const nodeTypes = {
  shouldRender,
  shouldBindEvent
}
