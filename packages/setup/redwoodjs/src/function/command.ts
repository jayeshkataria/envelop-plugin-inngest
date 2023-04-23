import type Yargs from 'yargs';

interface BaseOptions {
  cwd: string | undefined;
}

export interface ForceOptions extends BaseOptions {
  force: boolean;
}

export interface SetupInngestFunctionOptions extends ForceOptions {
  name: string;
  eventName?: string;
  type: 'background' | 'scheduled' | 'delayed' | 'step';
  graphql: boolean;
}

export const description = 'Set up an Inngest function';

export const builder = (yargs: Yargs.Argv) => {
  return yargs
    .epilogue(
      `Note: To launch the Inngest dev server, from the terminal run: 
    
  npx inngest-cli@latest dev -u http://localhost:8911/inngest    
  `,
    )
    .positional('name', { type: 'string', description: 'Name of the function to setup' })
    .option('eventName', {
      aliases: ['e', 'event'],
      default: undefined,
      description: 'Name of the event to trigger the function. Defaults to the function name.',
      type: 'string',
    })
    .option('graphql', {
      aliases: ['g', 'graphql', 'gql'],
      default: false,
      description: 'Build event name from your web side GraphQL operations',
      type: 'boolean',
    })
    .option('type', {
      alias: 't',
      type: 'string',
      choices: ['background', 'scheduled', 'delayed', 'step'],
      description: 'Type of Inngest function to setup',
    })
    .option('force', {
      alias: 'f',
      default: false,
      description: 'Overwrite existing files',
      type: 'boolean',
    });
};

export const handler = async (options: any) => {
  const { handler } = await import('./handler');
  return handler(options);
};
