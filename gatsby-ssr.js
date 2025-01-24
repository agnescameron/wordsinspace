export { wrapPageElement } from './src/apollo/wrap-page-element';
exports.onRenderBody = ({ setHtmlAttributes }) => {
  setHtmlAttributes({ lang: "en" })
}