import { exec } from 'child_process';
import { promises as fs } from 'fs';
import { join } from 'path';
import { promisify } from 'util';

const execAsync = promisify(exec);

interface IconSource {
  name: string;
  url: string;
  path: string;
  color: string;
}

const iconSources: IconSource[] = [
  {
    name: 'lucide',
    url: 'https://github.com/lucide-icons/lucide',
    path: 'icons',
    color: '#000000'
  },
  //   {
  //     name: 'tabler',
  //     url: 'https://github.com/tabler/tabler-icons',
  //     path: 'icons',
  //     color: '#000000'
  //   }
];

async function downloadIcons() {
  try {
    // Create icons directory if it doesn't exist
    await fs.mkdir('src/icons', { recursive: true });

    for (const source of iconSources) {
      console.log(`Downloading icons from ${source.name}...`);

      // Clone repository
      await execAsync(`git clone ${source.url} tmp/${source.name}`);

      // Get list of SVG files
      try {
        const svgFiles = await fs.readdir(`tmp/${source.name}/${source.path}`);
        for (const file of svgFiles) {
          if (file.endsWith('.svg')) {
            const filePath = join(`tmp/${source.name}/${source.path}`, file);
            const content = await fs.readFile(filePath, 'utf8');

            // Convert black color to white
            let newContent = content;
            if (source.color === '#000000') {
              // Replace black fill
              newContent = newContent.replace(/fill="#000000"/g, 'fill="#FFFFFF"').replace(/fill="currentColor"/g, 'fill="#FFFFFF"');
              // Replace black stroke
              newContent = newContent.replace(/stroke="#000000"/g, 'stroke="#FFFFFF"').replace(/stroke="currentColor"/g, 'stroke="#FFFFFF"');
            }

            // Save to icons directory
            const outputDir = join('dist/icons');
            await fs.mkdir(outputDir, { recursive: true });
            await fs.writeFile(join(outputDir, file), newContent);
            console.log(`Processed ${file} from ${source.name}`);
          }
        }
      } catch (error) {
        console.error(`Error processing ${source.name}:`, error);
        continue;
      }

      // Clean up
      await execAsync(`rm -rf tmp/${source.name}`);
    }

    console.log('All icons downloaded and processed successfully!');
  } catch (error) {
    console.error('Error downloading icons:', error);
  }
}

// Run the script
downloadIcons();
