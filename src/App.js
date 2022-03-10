import React from 'react';
import Form from './components/form';
import Comment from './components/comment';
import { Api } from './api';
import './App.css';

const App = () => {
  const [comments, setComments] = React.useState([]);
  
  React.useEffect(() => {
    const fetchComments = async () => {
      const data = await Api.get('/getComments');

      console.log(data);
      setComments(data);
      return data;
    }
    
    fetchComments();
  }, [])

  return (
    <div className="App">
      <Form/>
      {comments.map(comment => {
        return <Comment comment={comment} key={comment.id}/>
      })}
    </div>
  );
}

export default App;
