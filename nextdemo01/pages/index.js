import axios from 'axios';
import { useState, useEffect } from 'react';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
function getList() {
  return new Promise((resolve, reject) =>{        
    axios.post('https://marven-dcfe1b.service.tcloudbase.com/site-cms-data', {      
      // param: JSON.stringify(),    
        "key":"0146-static-marven-dcfe1b",
        "api":"fetchAll",
        "params":{
          "collectionName":"tcb-ext-cms-users"
      }
    }).then(res => {
      resolve(res.data);
    }).catch(err =>{
      reject(err.data);
    });
  })
}
const HomePage = result => {
  console.log(result.data);
  return(
    <div>
      <h2>用户列表</h2>
      <table>
        {result.data.map(item => {
          return <tr>
            <td>{item.userName}</td>
          </tr>
        })}
      </table> 
    </div>
  )
};
HomePage.getInitialProps = async () => {
  const resp = await getList();
  // 返回组件的props
  return resp.result;
};
export default HomePage;