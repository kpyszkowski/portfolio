import componentGenerator from './generators/component/generator.mjs'
import hookGenerator from './generators/hook/generator.mjs'

/**
 *
 * @type {import('plop').NodePlopAPI}
 */
function plopFile(plop) {
  plop.setGenerator('component', componentGenerator)
  plop.setGenerator('hook', hookGenerator)
}
export default plopFile
