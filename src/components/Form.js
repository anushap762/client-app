import React, { useEffect, useState } from 'react'
import { ApiService } from './ApiService'

function Form(props) {
    const [title,setTitle]=useState('')
    const [body,setBody]=useState('')

    useEffect(()=>{
      setTitle(props.article.title)
      setBody(props.article.body)
    },[props.article])
    const updateArticle=()=>{
        ApiService.UpdateArticle(props.article.id,{title,body})
        .then(resp=>props.updatedData(resp))
        .catch(error=>console.log(error))
    }
    const insertArticle=()=>{
      ApiService.InsertArticle({title,body})
      .then(resp=>props.insertedArticle(resp))
      .catch(error=>console.log(error))
    }
  return (
    <div>
      {props.article ? (
        <div className='md-3'>
            <label htmlFor='title' className='form-label'>Title</label>
            <input type='text' className='form-control' 
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            placeholder='plz enter your title here'/>
           
            <label htmlFor='body' className='form-label'>Description</label>
           <textarea className='form-control' placeholder='Enter your description' rows="5"
           value={body} 
           onChange={(e)=>setBody(e.target.value)}/>
           {
            props.article.id?
            <button className='btn btn-success' onClick={updateArticle} >Save</button>:
            <button className='btn btn-success' onClick={insertArticle} >Publish</button>
           }
           
        </div>
      ):null}
    </div>
  )
}

export default Form
