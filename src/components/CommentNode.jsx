import React, { useContext, useState, useEffect } from 'react'
import CommentChain from './CommentChain'
import CTX from './Store'

const CommentNode = ({ node, test, updateTest }) => {

  const [commObj, updateCommObj] = useState(CTX)
  const [childVisible, setChildVisiblity] = useState(true);

  //const hasChild = node.children ? true : false;
  const hasChild = node.replies.length > 0 ? true : false;






  return (
    <ul className={`commentGroup ${node.id}`} id={`commentGroup${node.id}`} >
      <div className={node.id + 'card'} onClick={(e) => setChildVisiblity((v) => !v)}>
        <li className={`card ${node.id}`}>
          <div onClick={(e) => setChildVisiblity((v) => !v)} className={'commentCard'}>
            <p onClick={(e) => setChildVisiblity((v) => !v)} className='username' >{node.user.name}</p>
            <p onClick={(e) => setChildVisiblity((v) => !v)} className='theComment'>{node.comment}</p>
          </div>
        </li>
        {hasChild && childVisible && (
          <div
            className={node.id} onClick={(e) => setChildVisiblity((v) => !v)}
            className={`attempt3 ${childVisible ? "active" : ""
              }`}>
            <CommentChain data={node.replies} test={test} />
          </div>
        )}


      </div>

    </ul>
  )
}

export default CommentNode
