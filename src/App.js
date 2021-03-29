import React, { useState, useMemo } from 'react'
import CTX from './components/Store'
import './App.css';

import Comments from './components/Comments'

function App() {

  const [comments, updateComments] = useState({ loaded: false, commentList: {} })

  console.log(comments)

  return (
    <CTX.Provider value={[comments, updateComments]}>
      <Comments />
    </CTX.Provider>
  );
}

export default App;
