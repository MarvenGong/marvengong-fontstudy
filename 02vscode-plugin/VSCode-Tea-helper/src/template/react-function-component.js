const reactFunctionComponentTemp = (name) => {
  return `import React, { useState, useEffect } from 'react';
import './style.less';
interface Iprops {
  name?: string;
};
const ${name} = (props: Iprops) => {
  const { name } = props;
  const [data, setData] = useState<any>();
  useEffect(() => {
    // todo something when componentDidMount
    return () => {
      // todo something when componentWillUnmount
    };
  });
  return (
    <div className="${name}-wraper">{name}</div>
  );
}
export default ${name};
`;
}
module.exports = reactFunctionComponentTemp;