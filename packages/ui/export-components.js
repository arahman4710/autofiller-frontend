import fs from 'fs'
import path from 'path'

// Define the directory to scan for component files
const componentsDir = path.join(__dirname, 'src', 'components')

// Define the assets directory to scan for component files
const assetsDir = path.join(__dirname, 'src', 'assets')

// Define the package.json file path
const packageJsonPath = path.join(__dirname, 'package.json')

// Read the package.json file
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'))

// Ensure an "exports" field exists in package.json
if (!packageJson.exports) {
  packageJson.exports = {}
}

// Static imports to include
const staticImports = {
  './globals.css': './src/globals.css',
  './tailwind.config': './tailwind.config.ts',
  './utils': './src/utils/index.ts',
  './utils/cn': './src/utils/cn.ts',
}

// Scan the components directory for files
const componentFiles = fs.readdirSync(componentsDir)
const assetFiles = fs.readdirSync(assetsDir)

// Temporary storage for dynamic mappings
const dynamicMappings = {}

// Map component files to exports
componentFiles.forEach((file) => {
  const extname = path.extname(file)
  if (extname === '.tsx' || extname === '.ts') {
    // Ensure only .tsx or .ts files are considered
    const componentName = path.basename(file, extname)
    const exportPath = `./${componentName}`
    const componentPath = `./src/components/${componentName}${extname}`
    dynamicMappings[exportPath] = componentPath
  }
})

assetFiles.forEach((file) => {
  const extname = path.extname(file)
  if (extname === '.tsx' || extname === '.ts') {
    // Ensure only .tsx or .ts files are considered
    const componentName = path.basename(file, extname)
    const exportPath = `./${componentName}`
    const componentPath = `./src/assets/${componentName}${extname}`
    dynamicMappings[exportPath] = componentPath
  }
})

const sortedDynamicMappings = Object.keys(dynamicMappings)
  .sort()
  .reduce((result, key) => {
    result[key] = dynamicMappings[key]
    return result
  }, {})

// Merge sorted dynamic mappings with static imports
packageJson.exports = Object.assign(sortedDynamicMappings, staticImports)

// Write the updated package.json back to the file system
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2), 'utf-8')

console.log('✳️ Components successfully mapped to exports in package.json')
