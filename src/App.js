import React from 'react';
import Header from './components/common/Header'
import {Content} from "./components/Content";

function App() {
  return (
      <React.Fragment>
        <Header/>
        <main className="main">
            <Content/>
        </main>
      </React.Fragment>
  );
};

export default App;
