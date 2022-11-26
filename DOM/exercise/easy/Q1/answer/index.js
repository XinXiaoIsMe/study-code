export default function (nodeA, nodeB) {
  const mapA = new Map() // 缓存nodeA的DOM链
  const mapB = new Map() // 缓存nodeB的DOM链

  while (nodeA && nodeB) {
    if (mapA.has(nodeB)) return nodeB // 查看nodeB是否在nodeA的DOM链上
    if (mapB.has(nodeA)) return nodeA // 查看nodeA是否在nodeB的DOM链上

    mapA.set(nodeA, 'a')
    mapB.set(nodeB, 'b')

    nodeA = nodeA.parentNode
    nodeB = nodeB.parentNode
  }
}