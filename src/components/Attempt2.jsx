import React, { useContext, useState, useEffect } from 'react'

import CTX from './Store'
import CommentNode from './CommentNode'

const Attempt2 = ({ data = [] }) => {

  const [commObj, updateCommObj] = useState(CTX)

  return (
    <div className={data.commentList[0].id}>
      {data.commentList.map(comm =>
        <div className='OPComment'>
          <CommentNode node={comm} test={[commObj, updateCommObj]} />
        </div>
      )}
    </div>
  )
}

export default Attempt2
