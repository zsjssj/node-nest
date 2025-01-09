//cesium的弧线段
type OptionalFixedArray = [number, number, number, number, number, number]
export const parabola = (twoPoints: OptionalFixedArray) => {
  const startPoint = [twoPoints[0], twoPoints[1], twoPoints[2]]
  const step = 10
  const heightProportion = 0.5 // 最低点和总距离的比值
  const dLon = (twoPoints[3] - startPoint[0]) / step
  const dLat = (twoPoints[4] - startPoint[1]) / step
  const deltaLon = dLon * Math.abs(111000 * Math.cos(twoPoints[1]))
  const deltaLat = dLat * 111000
  const endPoint = [0, 0, 0]
  const getHeight = (x: number): number => ((twoPoints[5] - twoPoints[2]) / step) * x + twoPoints[2]
  const heigh = Math.sqrt(deltaLon ** 2 + deltaLat ** 2) * heightProportion
  const x2 = 10000 * Math.sqrt(dLon ** 2 + dLat ** 2)
  const a = heigh / x2 ** 2
  const getY = (x: number, height: number) => height - a * x * x
  let arr: Array<number> = []
  for (let i: number = 1; i <= step; i++) {
    endPoint[0] = startPoint[0] + dLon
    endPoint[1] = startPoint[1] + dLat
    const x = x2 * ((2 * i) / step - 1)
    endPoint[2] = getHeight(i) - getY(x, heigh)
    startPoint.concat(endPoint)
    arr = [...arr, ...endPoint]
    startPoint[0] = endPoint[0]
    startPoint[1] = endPoint[1]
    startPoint[2] = endPoint[2]
  }
  return [...twoPoints.slice(0, 3), ...arr]
}
