import React, { useState, useEffect } from 'react';
import './style.less';
interface IHelloWorldProps {
  name?: string;
}
const HelloWorld = (props: IHelloWorldProps) => {
  const { name } = props;
  const [data, setData] = useState<any>();
  useEffect(() => {
    // todo something when componentDidMount
    return () => {
      // todo something when componentWillUnmount
    };
  }, []);
  return (
    <div className="hello-world-wraper">{name}</div>
  );
};
export default HelloWorld;
