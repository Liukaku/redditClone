import React, { useContext, useState, useEffect } from 'react'
import axios from 'axios'
import CTX from '../components/Store'

const Comments = () => {

  const [comments, updateComments] = useState(CTX)

  const [commObj, updateCommObj] = useState({ loaded: false, commentList: [] })

  //this runs everytime that the loaded bool changes in the state
  useEffect(() => {
    axios.get('https://run.mocky.io/v3/be0609d3-6a1b-4597-8af1-101221ac99c9')
      .then((res) => {
        console.log(res.data.data)
        const updated = res.data.data
        updateCommObj({ loaded: true, commentList: updated })
        updateComments({ loaded: true, commentList: updated })
        console.log(commObj.commentList)
      })
      .catch((err) => {
        console.error(err);
      })
  }, [commObj.loaded])

  /*
    {commObj.commentList.map(comm => <div className='taskListWrapper'>
    <div className='taskName'>
      <p key={comm[0]} id={comm[0]} className='Task'>
        {comm[1]}
      </p>
    </div>
    <div className='assignedTo'>
      <p key={comm[0] + 1} id={comm[0]} className='Task'>
        {comm[2]}
      </p>
    </div>
  </div>
  )}
  */

  const renderComments = () => {
    commObj.commentList.map(comm => <div className='taskListWrapper'>
      <div className='taskName'>
        <p key={comm[0].id}>
          {comm}
        </p>
      </div>
    </div>
    )
  }

  return (
    <div>
      {commObj.commentList.map(comm =>
        <div className='commentWrapper'>
          <div className='OPComment'>
            <p key={comm.id} id='comment' className='Task'>
              {comm.comment}
            </p>
            {!comm.replies ? (
              comm.replies.map(rep =>
                <div>
                  {rep.comment}
                </div>)
            ) : (<p>reply now</p>)}
          </div>
        </div>
      )}
      <p>aaa</p>
    </div>
  )
}

export default Comments
