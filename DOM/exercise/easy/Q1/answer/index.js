export default function (nodeA, nodeB) {
  const mapA = new Map()
  const mapB = new Map()

  while (nodeA && nodeB) {
    if (mapA.has(nodeB)) return nodeB
    if (mapB.has(nodeA)) return nodeA

    mapA.set(nodeA, 'a')
    mapB.set(nodeB, 'b')

    nodeA = nodeA.parentNode
    nodeB = nodeB.parentNode
  }
}