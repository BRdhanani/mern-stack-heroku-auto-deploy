import React from 'react';
import axios from 'axios';
import './App.css';

class App extends React.Component {
  state = {
    title: '',
    body: '',
    posts: []
  }

  componentDidMount = () => {
    this.getPosts();
  }

  getPosts = () => {
    axios.get('/blog')
    .then((res) => {
      const data = res.data;
      this.setState({ posts: data });
      console.log('Data fetched');
    })
    .catch(() => {
      console.log('Error fetching data');
    })
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = (event) => {
    const { title, body } = this.state;

    event.preventDefault();

    let payload = {
      title,
      body
    }

    axios({
      url: '/blog/add',
      method: 'POST',
      data: payload
    })
    .then(() => {
      console.log('Data sent');
      this.setState({
        title: '',
        body: ''
      });
      this.getPosts();
    })
    .catch((error) => {
      console.log('error');
    })
  }

  handleDelete = (data) => {
    axios({
      url: `/blog/delete/${data._id}`,
      method: 'DELETE'
    })
    .then(() => {
      console.log('Data deleted');
      this.getPosts();
    })
    .catch((error) => {
      console.log('error');
    })
  }

  displayPost = (posts) => {
    if(!posts.length) return null;

    return posts.map((data, index) => (
      <div key={index}>
        <button className="delete-button" onClick={() => this.handleDelete(data)}>Delete</button>
        <div className="blogpost">
          <h3>{data.title}</h3>
          <p>{data.body}</p>
        </div>
      </div>
    ));
  }
  render() {
    const { title, body, posts } = this.state;
    return (
      <div className="app">
        <form onSubmit={this.handleSubmit}>
          <div className="form-input">
            <input type="text" placeholder="Enter Title" name="title" value={title} onChange={this.handleChange} required/>
          </div>
          <div className="form-input">
            <textarea name="body" placeholder="Enter Description" value={body} onChange={this.handleChange} required></textarea>
          </div>
          <button>Submit</button>
        </form>
        <div className="posts">
          {this.displayPost(posts)}
        </div>
      </div>
    );
  }
}

export default App;