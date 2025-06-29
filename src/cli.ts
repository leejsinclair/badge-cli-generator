/**
 * CLI module for the badge generator application.
 * Provides an interactive command-line interface for creating customized badges.
 */

import { input, select } from '@inquirer/prompts'
import { BadgeGenerator } from './badge-generator'
import * as fs from 'fs/promises'
import { BadgeConfig, ColorName, colors } from './createBadge/createBadgeTypes'

/**
 * Prompts the user for badge configuration through an interactive CLI.
 * @returns A promise that resolves to the user's configuration choices.
 */
async function promptForConfig(): Promise<{
  text: string
  icon: string
  color: ColorName
  output: string
  size: string
}> {
  /**
   * Retrieves available SVG icons from the icons directory.
   * @returns A promise that resolves to an array of SVG filenames.
   */
  const getIcons = async () => {
    const iconsDir = './dist/icons'
    try {
      const files = await fs.readdir(iconsDir)
      return files.filter((file: string) => file.endsWith('.svg'))
    } catch (error) {
      console.error('Error reading icons directory:', error)
      return ['star.svg'] // Fallback to star if directory not found
    }
  }

  const icons = await getIcons()
  const answers = {
    text: await input({
      message: 'Enter the badge text:',
      required: true,
      validate: (input: string) => input.trim().length > 0,
    }),
    icon: (await select({
      message: 'Choose an SVG icon:',
      choices: icons,
      default: 'star.svg',
    })) as string,
    color: (await select({
      message: 'Choose a color:',
      choices: Object.keys(colors),
      default: 'primary',
    })) as ColorName,
    output: await input({
      message: 'Enter the output filename (without extension):',
      default: 'badge',
      validate: (input: string) => input.trim().length > 0,
    }),
    size: await input({
      message: 'Enter the badge size (optional):',
      default: '200',
      validate: (input: string) => !input || !isNaN(Number(input)),
    }),
  }

  return answers
}

/**
 * Main CLI function that orchestrates the badge generation process.
 * Prompts the user for configuration, creates the badge, and handles errors.
 */
export async function cli() {
  try {
    const answers = await promptForConfig()
    const config: BadgeConfig = {
      text: answers.text,
      color: answers.color,
      icon: answers.icon,
      output: `${answers.output}.png`,
      size: answers.size ? parseInt(answers.size) : undefined,
    }

    console.log('\nGenerating badge...')
    const badgeGenerator = new BadgeGenerator()
    await badgeGenerator.createBadge(config)
    console.log(`Badge generated successfully: ${config.output}`)
  } catch (error) {
    console.error(
      'Error generating badge:',
      error instanceof Error ? error.message : 'An unknown error occurred'
    )
  }
}
