import React, { useContext, useState, useEffect } from 'react'

import CTX from './Store'
import CommentNode from './CommentNode'

const Attempt3 = ({ data = [], test }) => {

  const [commObj, updateCommObj] = useState(CTX)
  const [childVisible, setChildVisiblity] = useState(true);

  return (
    <div className='replyWrapper' >
      {data.map(comm =>
        <ul className='reply' key={`rep${comm.id}`} id={`ul${comm.id}`}>
          <CommentNode node={comm} test={test} />
        </ul>
      )}
    </div>
  )
}

export default Attempt3
