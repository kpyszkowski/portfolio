/**
 *
 * @type {import('plop').PlopGenerator}
 */
const componentGenerator = {
  description: 'Generate a component',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'Enter component name:',
    },
    {
      type: 'confirm',
      name: 'isUiComponent',
      message: 'Is this a UI component?',
    },
  ],
  actions: (data) => {
    const isUiComponent = data?.isUiComponent
    const basePath = isUiComponent
      ? 'src/components/ui/{{kebabCase name}}'
      : 'src/components/{{kebabCase  name}}'

    return [
      {
        type: 'add',
        path: basePath + '/index.ts',
        templateFile: 'generators/component/index.ts.hbs',
      },
      {
        type: 'add',
        path: basePath + '/{{kebabCase name}}.tsx',
        templateFile: 'generators/component/component.tsx.hbs',
      },
      {
        type: 'add',
        path: basePath + '/{{kebabCase name}}.stories.tsx',
        templateFile: 'generators/component/component.stories.tsx.hbs',
      },
    ]
  },
}

export default componentGenerator
