/**
 * Icon download utility for fetching and processing SVG icons from various sources.
 * Downloads icons from Git repositories and processes them for use in the badge generator.
 */

import { exec } from 'child_process'
import { promises as fs } from 'fs'
import { join } from 'path'
import { promisify } from 'util'

const execAsync = promisify(exec)

/**
 * Configuration for an icon source repository.
 */
interface IconSource {
  /** The name identifier for the icon source */
  name: string
  /** The Git repository URL */
  url: string
  /** The path within the repository where icons are located */
  path: string
  /** The original color of the icons that should be replaced */
  color: string
}

const iconSources: IconSource[] = [
  {
    name: 'lucide',
    url: 'https://github.com/lucide-icons/lucide',
    path: 'icons',
    color: '#000000',
  },
  //   {
  //     name: 'tabler',
  //     url: 'https://github.com/tabler/tabler-icons',
  //     path: 'icons',
  //     color: '#000000'
  //   }
]

/**
 * Clones a Git repository to a temporary directory.
 * @param source - The icon source configuration
 */
async function cloneRepository(source: IconSource): Promise<void> {
  console.log(`Downloading icons from ${source.name}...`)
  await execAsync(`git clone ${source.url} tmp/${source.name}`)
}

/**
 * Processes SVG content by replacing colors.
 * @param content - The SVG file content
 * @param originalColor - The color to replace
 * @returns The processed SVG content
 */
function processSvgContent(content: string/*, originalColor: string*/): string {
  let newContent = content
  // if (originalColor === '#000000') {
  // Replace black fill
  newContent = newContent
    .replace(/fill="#000000"/g, 'fill="#FFFFFF"')
    .replace(/fill="currentColor"/g, 'fill="#FFFFFF"')
  // Replace black stroke
  newContent = newContent
    .replace(/stroke="#000000"/g, 'stroke="#FFFFFF"')
    .replace(/stroke="currentColor"/g, 'stroke="#FFFFFF"')
  //}
  return newContent
}

/**
 * Processes a single SVG file from a source.
 * @param file - The filename of the SVG
 * @param source - The icon source configuration
 */
async function processSvgFile(file: string, source: IconSource): Promise<void> {
  const filePath = join(`tmp/${source.name}/${source.path}`, file)
  const content = await fs.readFile(filePath, 'utf8')
  
  const processedContent = processSvgContent(content /*, source.color*/)
  
  // Save to icons directory
  const outputDir = join('dist/icons')
  await fs.mkdir(outputDir, { recursive: true })
  await fs.writeFile(join(outputDir, file), processedContent)
  console.log(`Processed ${file} from ${source.name}`)
}

/**
 * Cleans up temporary files for a source.
 * @param source - The icon source configuration
 */
async function cleanupSource(source: IconSource): Promise<void> {
  await execAsync(`rm -rf tmp/${source.name}`)
}

/**
 * Processes all SVG files from a source repository.
 * @param source - The icon source configuration
 */
async function processIconSource(source: IconSource): Promise<void> {
  try {
    await cloneRepository(source)
    
    const svgFiles = await fs.readdir(`tmp/${source.name}/${source.path}`)
    for (const file of svgFiles) {
      if (file.endsWith('.svg')) {
        await processSvgFile(file, source)
      }
    }
  } catch (error) {
    console.error(`Error processing ${source.name}:`, error)
  } finally {
    await cleanupSource(source)
  }
}

/**
 * Creates necessary directories for icon processing.
 */
async function createDirectories(): Promise<void> {
  await fs.mkdir('src/icons', { recursive: true })
}

/**
 * Downloads and processes icons from all configured sources.
 */
async function downloadIcons(): Promise<void> {
  try {
    await createDirectories()

    for (const source of iconSources) {
      await processIconSource(source)
    }

    console.log('All icons downloaded and processed successfully!')
  } catch (error) {
    console.error('Error downloading icons:', error)
  }
}

// Run the script
downloadIcons()
