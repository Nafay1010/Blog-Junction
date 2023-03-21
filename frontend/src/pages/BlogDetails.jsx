import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useParams } from "react-router-dom";
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../components/Spinner'
import { getABlog, reset } from '../features/blogs/blogSlice'


const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { blogs, isLoading, isError, message } = useSelector(
    (state) => state.blogs
  )
  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate('/login')
    }

    dispatch(getABlog(id))

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className='blog-details'>
        {blogs.map((blog) => (
            <div>
                <h1>{blog.title}</h1>
                <p>{blog.body}</p>
                <div className="authors">
                <h3>By {blog.author}</h3>
                <h3>{formatDistanceToNow(new Date(blog.createdAt), { addSuffix: true })}</h3>
                </div>

            </div>
            ))}

    </div>
  )
}

export default BlogDetails