import React from 'react';
import Form from './components/form';
import Comment from './components/comment';
import { Api } from './api';
import './App.css';

const App = () => {
  const [comments, setComments] = React.useState([]);
  const [newComment, setNewComment] = React.useState(null);
  const [fetchNewComment, setFetchNewComment] = React.useState(false);
  const webSocket = React.useRef(null);
  
  const fetchComments = async () => {
    const data = await Api.get('/getComments');
    // Can also sort by time instead to be extra safe
    data.sort((a,b) => {return b.id - a.id})

    setComments(data);
  }

  React.useEffect(() => {    
    fetchComments();
  }, [])

  React.useEffect(() => {
    webSocket.current = new WebSocket("ws://localhost:3001/websocket");
    webSocket.current.onmessage = event => {
      setNewComment(JSON.parse(event.data))
      setFetchNewComment(true);
    }

    return () => webSocket.current.close();
  }, [])
  
  React.useEffect(() => {
    if (!comments.some(comment => comment.id === newComment?.id) && fetchNewComment) {
      fetchComments();
      setFetchNewComment(false);
    }
}, [newComment, comments, fetchNewComment])


  return (
    <div className="App">
    <div className="container">
    <Form webSocket={webSocket.current}/>
      {comments.map(comment => {
        return <Comment comment={comment} key={comment.id}/>
      })}
    </div>
    </div>
  );
}

export default App;
