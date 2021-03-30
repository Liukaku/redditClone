import React, { useContext, useState, useEffect } from 'react'
import Attempt2 from './Attempt2'
import Attempt3 from './Attempt3'

const CommentNode = ({ node }) => {

  const [childVisible, setChildVisiblity] = useState(true);

  //const hasChild = node.children ? true : false;
  const hasChild = node.replies.length > 0 ? true : false;


  return (
    <li>
      <div className="" onClick={(e) => setChildVisiblity((v) => !v)}>
        <div className="">
          <li className={`card ${node.id}`}>
            <div>
              <p className='username'>{node.user.name}</p>
              <p>{node.comment}</p>
            </div>
          </li>
        </div>
        {hasChild && (
          <div className="">
            <ul className="">
              <Attempt3 data={node.replies} />
            </ul>
          </div>
        )}


      </div>

    </li>
  )
}

export default CommentNode
