const test_a2 = [5, 4, 2, 6, -18, 3, 5]
const test_a3 = test_a2.sort((a, b) => a - b)

const arr = ['.ply', '.gs', '.ksplat'] as const
arr.some(item2 => 'item.name'.endsWith(item2))
