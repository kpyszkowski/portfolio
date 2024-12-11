/**
 *
 * @type {import('plop').PlopGenerator}
 */
const hookGenerator = {
  description: 'Generate a hook',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'Enter hook name (without the "use" term):',
    },
  ],
  actions: [
    {
      type: 'add',
      path: 'src/hooks/use-{{kebabCase name}}.ts',
      templateFile: 'generators/hook/hook.ts.hbs',
    },
  ],
}

export default hookGenerator
