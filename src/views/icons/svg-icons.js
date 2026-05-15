// 使用 Vite 的 import.meta.glob 替代 require.context
// 注意：路径中的 '../../icons/svg' 可以根据你实际的文件位置进行调整
const modules = import.meta.glob('../../icons/svg/*.svg')

// 提取文件路径并获取图标名称
const svgIcons = Object.keys(modules).map(i => {
  // i 的格式通常是 "../../icons/svg/xxx.svg"
  // 使用正则提取出文件名（不含路径和扩展名）
  const match = i.match(/\/([^/]+)\.svg$/)
  return match ? match[1] : ''
}).filter(Boolean) // 过滤掉可能的空值

console.log(svgIcons)

export default svgIcons