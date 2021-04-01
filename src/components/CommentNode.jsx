import React, { useContext, useState, useEffect } from 'react'
import Attempt2 from './Attempt2'
import Attempt3 from './Attempt3'
import CTX from './Store'

const CommentNode = ({ node, test, updateTest }) => {

  const [commObj, updateCommObj] = useState(CTX)
  const [childVisible, setChildVisiblity] = useState(true);

  //const hasChild = node.children ? true : false;
  const hasChild = node.replies.length > 0 ? true : false;

  const toggleHide = (e) => {
    e.preventDefault()
    const getId = 'replyTo' + e.target.parentNode.parentNode.classList[1]
    document.getElementById(getId).classList.toggle('goodbye')
  }


  const handleChange = (e) => {
    e.preventDefault()

    const newState = {
      commentList: commObj.commentList,
      loading: commObj.loading,
      newComment: {
        user: {
          id: '',
          name: document.getElementById('replyName').value
        },
        id: `comment${new Date().getTime}`,
        comment: document.getElementById('replyText').value,
        replies: []
      }
    }

  }


  const whichOne = ([value, paren]) => {
    console.log(value)
    console.log(paren)

    if (value.map(unga => { return unga.id }).indexOf(paren) == '-1') {
      const arr = paren.split('-')
      const fin = `${arr[0]}-${arr[1]}`
      console.log(value)
      const hereWeGoAgain = value.map(unga => { return unga.id }).indexOf(fin)
      console.log(hereWeGoAgain)

      whichOne([value[hereWeGoAgain].replies, hereWeGoAgain])
    }
    else return value.map(unga => { return unga.id }).indexOf(paren)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const aaa = test
    const parentID = e.target.parentNode.parentNode.parentNode.classList[1]
    console.log(parentID)



    const newState = {
      commentList: aaa.commentList,
      loading: aaa.loading,
      newComment: {
        user: {
          id: '',
          name: e.target.parentNode[0].value
        },
        id: `comment${new Date().getTime}`,
        comment: e.target.parentNode[1].value,
        replies: []
      }
    }
    console.log(whichOne(aaa.commentList))
    aaa.commentList[whichOne([aaa.commentList, parentID])].replies.unshift(newState.newComment)
    console.log(newState)
    updateCommObj(newState)
  }



  return (
    <ul className={`commentGroup ${node.id}`} id={`commentGroup${node.id}`} >
      <div className={node.id + 'card'} onClick={(e) => setChildVisiblity((v) => !v)}>
        <li className={`card ${node.id}`}>
          <div onClick={(e) => setChildVisiblity((v) => !v)} className={'commentCard'}>
            <p onClick={(e) => setChildVisiblity((v) => !v)} className='username' >{node.user.name}</p>
            <p onClick={(e) => setChildVisiblity((v) => !v)} className='theComment'>{node.comment}</p>
            <h5 onClick={(e) => toggleHide(e)}>reply</h5>
            <form id={`replyTo${node.id}`} className='goodbye'>
              <input type="text" placeholder='username' onChange={handleChange} name="" id="replyName" />
              <input type="text" placeholder='comment' onChange={handleChange} name="" id="replyText" />
              <button type="submit" onClick={handleSubmit}>Submit</button>
            </form>
          </div>
        </li>
        {hasChild && childVisible && (
          <div
            className={node.id} onClick={(e) => setChildVisiblity((v) => !v)}
            className={`attempt3 ${childVisible ? "active" : ""
              }`}>
            <Attempt3 data={node.replies} test={test} />
          </div>
        )}


      </div>

    </ul>
  )
}

export default CommentNode
