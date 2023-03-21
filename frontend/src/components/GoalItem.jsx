import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deleteBlog } from '../features/blogs/blogSlice'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import {Link} from 'react-router-dom'

function GoalItem({ blog, getonly }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleDelete = (id) =>{
    navigate('/')
    dispatch(deleteBlog(id))
  }
  
  if(getonly === 'no'){
    return (
    <div className='goal-dashboard'>
      <div>{formatDistanceToNow(new Date(blog.createdAt), { addSuffix: true })}</div>
      <h2>{blog.title}</h2>
      <button onClick={() => handleDelete(blog._id)} className='close'>
        X
      </button>
      <p>By {blog.author}</p>
    </div>
    )
  }
  else
  {

  }
  return (
    <Link to={`/blogs/${blog._id}`}>
    <div className='goal-getBlog'>
      <div>{formatDistanceToNow(new Date(blog.createdAt), { addSuffix: true })}</div>
      <h2>{blog.title}</h2>
      <p>By {blog.author}</p>
    </div>
    </Link>
  )
}

export default GoalItem
