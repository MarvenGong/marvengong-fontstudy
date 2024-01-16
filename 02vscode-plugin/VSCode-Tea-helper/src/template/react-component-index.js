const reactComponentIndexTemp = (name) => {
  return `import ${name} from './${name}';
export default ${name};
`;
}
module.exports = reactComponentIndexTemp;