import React, { FC } from 'react';
import './style.css';
interface IHelloWordProps {
  name?: string;
};
const HelloWord: FC<IHelloWordProps> = (props: IHelloWordProps) => {
  return (
    <div data-v-lnp247ug className="hello-word-wraper">hello world</div>
  );
};
export default HelloWord;
