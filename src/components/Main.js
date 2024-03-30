import {useState,useEffect} from 'react';
import ArticleList from './ArticleList';
import Form from './Form';
import Logout from './Logout';
import { ApiService } from './ApiService';

function Main() {
  const [articles,setArticles]=useState([]);
  const [editedArticle,setEditedArticle]=useState(null);
  const [searchQuery,setSearchQuery]=useState('');

  const onTextChange=(searchString)=>{
    setSearchQuery(searchString)   
  }
  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.body.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const editArticle=(editedArticle)=>{
    setEditedArticle(editedArticle);    
  }
  useEffect(()=>{
        ApiService.getAllArticles()
      .then(resp=>setArticles(resp))
      .catch(error=>console.log(error))
  },[])
  
  const openForm=()=>{
    setEditedArticle({title:'',body:''})
  }
  const updatedData=(article)=>{
    const new_article=articles.map(my_article=>{
      if(my_article.id==article.id){
        return article
      }
      else
        return my_article
    })
    setArticles(new_article)
  }

  const insertedArticle=(article)=>{
    const new_articles=[...articles,article]
    setArticles(new_articles)
  }

  const deleteArticle=(article)=>{
    const new_articles=articles.filter(my_article=>{
      if(my_article.id===article.id){
        return false
      }
      else 
      return true
    })
    setArticles(new_articles)
  }
  
  return (
    <div className="App">
      <div className='row'>
        <div className='col'><h1>Flask and ReactJs Course</h1></div>
        <div className='col'>
          <button className='btn btn-success' onClick={openForm}>Insert</button>
        </div>
        <div className='col'>
          <input type="text" value={searchQuery} className='form-control' placeholder='Search'
           onChange={(e)=>{onTextChange(e.target.value)}}/>
        </div>
        <div className='col'>
          <Logout/>
        </div>
      </div>
     
     <ArticleList articles={filteredArticles} editArticle={editArticle} deleteArticle={deleteArticle}/>
     {editedArticle ? <Form article={editedArticle} updatedData={updatedData} insertedArticle={insertedArticle}/> : null}
     
    </div>
  );
}

export default Main;
