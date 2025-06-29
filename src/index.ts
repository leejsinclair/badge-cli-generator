import { cli } from './cli'

async function main() {
  try {
    await cli()
  } catch (error) {
    console.error('Error:', error instanceof Error ? error.message : 'An unknown error occurred')
  }
}

main()
