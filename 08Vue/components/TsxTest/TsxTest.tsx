import React, { useState, useEffect } from 'react';
import './style.less';
interface ITsxTestProps {
  name: string;
}
const TsxTest = (props: ITsxTestProps) => {
  const { name } = props;
  const [data, setData] = useState<any>();
  useEffect(() => {
    // todo something when componentDidMount
    return () => {
      // todo something when componentWillUnmount
    };
  }, []);
  return (
    <div className="tsx-test-wraper">
      <Button htmlType="button" type="primary">
      primary按钮
      </Button>
    </div>
  );
};
export default TsxTest;
