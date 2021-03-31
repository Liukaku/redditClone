import React, { useContext, useState, useEffect } from 'react'
import axios from 'axios'
import CTX from '../components/Store'

const Comments = () => {

  const [comments, updateComments] = useState(CTX)

  const [commObj, updateCommObj] = useState({ loaded: false, commentList: [] })

  let commArr = []

  //this runs everytime that the loaded bool changes in the state
  useEffect(() => {
    axios.get('https://run.mocky.io/v3/be0609d3-6a1b-4597-8af1-101221ac99c9')
      .then((res) => {
        console.log(res.data.data)
        const updated = res.data.data
        updateCommObj({ loaded: true, commentList: updated })
        updateComments({ loaded: true, commentList: updated })

        //renderComments()
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

  /*
      {commObj.commentList.map(comm =>
        <div className='commentWrapper'>
          <div className='OPComment'>
            <p key={comm.id} id='comment' className='Task'>
              {comm.comment}
            </p>
            {!comm.replies.comment ? (
              comm.replies.map(rep =>
                <div>
                  {rep.comment}
                </div>)
            ) : (
              <div>
                Reply Now
              </div>
            )}
          </div>
        </div>
      )}
  */

  const isObject = (val) => {
    if (val == null) {
      return false
    }
    if (typeof val == "object") {
      return true
    } else {
      return
    }
  }

  const objProps = (obj) => {

    for (let val in obj) {
      if (isObject(obj[val])) {
        objProps(obj[val])
      }
      if (val == "comment") {
        console.log(obj[val]);
        return (<p> {obj[val]}</p>)
      } else {
        //console.log("not a comment");
      }
    }
  }

  const renderComments = () => {
    for (let i = 0; i < commObj.commentList.length; i++) {
      console.log(objProps(commObj.commentList[i].replies));
    }
  }

  //console.log(objProps())


  return (
    <div>
      {commObj.commentList.map(comm =>
        <div className='commentWrapper'>
          <div className='OPComment'>
            <p key={comm.id} id='comment' className='Task'>
              {comm.comment}
            </p>
            {renderComments()}
          </div>
        </div>
      )}

      <p>aaa</p>
    </div>
  )
}

export default Comments
