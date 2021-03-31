import React, { useState, useEffect } from 'react'
import CTX from './components/Store'
import './App.css';
import axios from 'axios'

import Comments from './components/Comments'
import Attempt2 from './components/Attempt2'

function App() {

  const [commObj, updateCommObj] = useState({ loading: true })

  //this runs everytime that the loaded bool changes in the state
  let dataSet

  useEffect(() => {
    if (commObj.loading == true) {
      axios.get('https://run.mocky.io/v3/be0609d3-6a1b-4597-8af1-101221ac99c9')
        .then((res) => {
          const updated = res.data.data
          updateCommObj({ commentList: updated, loading: false, newComment: { user: { id: '', name: '' }, id: '', comment: '', replies: [] } })
          console.log(commObj)
          return

        })

        .catch((err) => {
          console.error(err);
          return ({ commentList: err })
        })
    }

  }, [commObj.loading])

  if (commObj.loading == false) {
    dataSet = commObj
    console.log(dataSet);
  }

  const handleChange = (e) => {
    e.preventDefault()

    const newState = {
      commentList: commObj.commentList,
      loading: commObj.loading,
      newComment: {
        user: {
          id: '',
          name: document.getElementById('usernameText').value
        },
        id: `comment${new Date().getTime}`,
        comment: document.getElementById('userCommentText').value,
        replies: []
      }
    }

    updateCommObj(newState)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const currentState = commObj

    currentState.commentList.unshift(commObj.newComment)
    console.log(currentState)

    updateCommObj({
      commentList: currentState.commentList,
      loading: currentState.loading,
      newComment: {
        newComment: { user: { id: '', name: '' }, id: '', comment: '', replies: [] }
      }
    })
    document.getElementById('usernameText').value = ''
    document.getElementById('userCommentText').value = ''
  }



  return (
    <CTX.Provider value={[commObj, updateCommObj]}>
      <div className='container'>
        <div>
          <form>
            <input type="text" id='usernameText' onChange={handleChange}></input>
            <input type="text" id='userCommentText' onChange={handleChange}></input>
            <button type='submit' onClick={handleSubmit}> submit</button>
          </form>
        </div>

        {!commObj.loading ? (
          <Attempt2 data={dataSet} />
        ) : (
          <p>
            loading
          </p>
        )}

      </div>
    </CTX.Provider>
  );
}

export default App;
