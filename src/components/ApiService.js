export class ApiService{

  static getAllArticles(){
  //  return fetch("http://127.0.0.1:5000/get",{
  //     'methods':'GET',
  //     headers:{
  //       'Content-Type':'application/json'
  //     }
  //   }).then(resp=>resp.json())
  return this.fetchDataWithToken("http://127.0.0.1:5000/get")
  .then(resp=>resp)
  }
  
  static Login(body){
    return fetch(`http://127.0.0.1:5000/token`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(body)
      }).then((resp)=>{
        if(resp.status===200)
          return resp.json()
        else alert("Something went wrong")
      })    
  }

    static UpdateArticle(id,body){
        // return fetch(`http://127.0.0.1:5000/update/${id}/`,{
        //     method:'PUT',
        //     headers:{
        //       'Content-Type':'application/json'
        //     },
        //     body:JSON.stringify(body)
        //   }).then((resp)=>resp.json())
        return this.fetchDataWithToken(`http://127.0.0.1:5000/update/${id}/`,'PUT',body)
        .then((resp)=>resp)

    }
    static InsertArticle(body){
      // return fetch(`http://127.0.0.1:5000/add`,{
      //     method:'POST',
      //     headers:{
      //       'Content-Type':'application/json'
      //     },
      //     body:JSON.stringify(body)
      //   }).then((resp)=>resp.json())
      return this.fetchDataWithToken(`http://127.0.0.1:5000/add`,'POST',body)
      .then((resp)=>resp)
  }
  static DeleteArticle(id){
    // return fetch(`http://127.0.0.1:5000/delete/${id}`,{
    //     'method':'DELETE',
    //     headers:{
    //       'Content-Type':'application/json'
    //     },        
    //   })
    //   .catch(error=>console.log(error))
    return this.fetchDataWithToken(`http://127.0.0.1:5000/delete/${id}`,'DELETE')
      .catch(error=>console.log(error))
}
static fetchDataWithToken=async (url,method='GET',body=null)=>{
  const token=sessionStorage.getItem('token');
  console.log(token);
  const headers={
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
  const options = {
    method,
    headers,
    body: body ? JSON.stringify(body) : null
};
const response = await fetch(url, options);
return response.json();
}

}