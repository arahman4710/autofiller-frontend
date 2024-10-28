import fs from 'fs'
import path from 'path'

// Get the directory from the command line arguments
const directory = process.argv[2]

if (!directory) {
  console.error('Please provide a directory as an argument.')
  process.exit(1)
}

fs.readdir(directory, (err, files) => {
  if (err) {
    console.error('Error reading the directory:', err)
    return
  }

  console.log(`Reading directory: ${directory}`)
  console.log(`Files found: ${files.length}`)
  console.log('Files list:', files)

  files.forEach((file) => {
    const filePath = path.join(directory, file)
    const extension = path.extname(file)
    console.log(`Checking file: ${file}`)

    if (file.endsWith('.d.ts') || extension === '.js') {
      console.log(`File with matching extension found: ${file}`)

      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(`Error deleting file ${filePath}:`, err)
        } else {
          console.log(`Deleted file: ${filePath}`)
        }
      })
    } else {
      console.log(`File extension mismatch: ${file}`)
    }
  })

  console.log('Finished checking files.')
})
