import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import GoalItem from '../components/GoalItem'
import Spinner from '../components/Spinner'
import { getAllBlogs, reset } from '../features/blogs/blogSlice'

function Dashboard() {
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

    dispatch(getAllBlogs())

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div>
      <section className='heading'>
        <h1>All Blogs</h1>
      </section>
      <section className='content'>
        {blogs.length > 0 ? (
          <div className='goals-allBlogs'>
            {blogs.map((blog) => (
              <GoalItem key={blog._id} blog={blog} getonly={'yes'}/>
            ))}
          </div>
        ) : (
          <h3>No Blogs Available</h3>
        )}
      </section>
    </div>
  )
}

export default Dashboard
