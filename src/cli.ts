import { input, select } from '@inquirer/prompts';
import { BadgeGenerator } from './badge-generator';
import * as fs from 'fs/promises';
import { BadgeConfig } from './createBadge/createBadgeTypes';

async function promptForConfig(): Promise<{
    text: string;
    icon: string;
    color: string;
    output: string;
    size: string;
}> {
    const getIcons = async () => {
        const iconsDir = './dist/icons';
        try {
            const files = await fs.readdir(iconsDir);
            return files.filter((file: string) => file.endsWith('.svg'));
        } catch (error) {
            console.error('Error reading icons directory:', error);
            return ['star.svg']; // Fallback to star if directory not found
        }
    }

    const icons = await getIcons();
    const answers = {
        text: await input({
            message: 'Enter the badge text:',
            required: true,
            validate: (input: string) => input.trim().length > 0
        }),
        icon: await select({
            message: 'Choose an SVG icon:',
            choices: icons,
            default: 'star.svg'
        }) as string,
        color: await select({
            message: 'Choose a color:',
            choices: Object.keys(BadgeGenerator.colors),
            default: 'primary'
        }) as string,
        output: await input({
            message: 'Enter the output filename (without extension):',
            default: 'badge',
            validate: (input: string) => input.trim().length > 0
        }),
        size: await input({
            message: 'Enter the badge size (optional):',
            default: '200',
            validate: (input: string) => !input || !isNaN(Number(input))
        })
    }

    return answers;
}

export async function cli() {
    try {
        const answers = await promptForConfig();
        const config: BadgeConfig = {
            text: answers.text,
            color: answers.color,
            icon: answers.icon,
            output: `${answers.output}.png`,
            size: answers.size ? parseInt(answers.size) : undefined
        };

        console.log('\nGenerating badge...');
        const badgeGenerator = new BadgeGenerator();
        await badgeGenerator.createBadge(config);
        console.log(`Badge generated successfully: ${config.output}`);
    } catch (error) {
        console.error('Error generating badge:', error instanceof Error ? error.message : 'An unknown error occurred');
    }
}
