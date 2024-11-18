import { useRoutes } from "react-router-dom";
import Themeroutes from "./routes/Router";

import React from 'react';
import AAPLChart from './views/AAPLChart';
// import StockChart from './views/StockChart';
import TempChart from './views/TempChart';

const App = () => {
  const routing = useRoutes(Themeroutes);
  
    return (
        <div>
          <div className="dark">{routing}</div>
          <div>
            <h1>AAPL Stock Chart</h1>
            <AAPLChart />
          </div>
          <div>
            <h1>Temp Chart</h1>
            <TempChart />
          </div>
        </div>
    );
};

export default App;



// import React, {useEffect, useState} from 'react';
// import axios from 'axios';

// function App() {
//    const [hello, setHello] = useState('')

//     useEffect(() => {
//         axios.get('/api/hello')
//         .then(response => setHello(response.data))
//         .catch(error => console.log(error))
//     }, []);

//     return (
//         <div>
//             백엔드에서 가져온 데이터입니다 : {hello}
//         </div>
//     );
// }

// export default App;