import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import GoalItem from '../components/GoalItem'
import Spinner from '../components/Spinner'
import { getBlog, reset } from '../features/blogs/blogSlice'

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

    dispatch(getBlog())

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
        <h1>Welcome {user && user.name}</h1>
        <p>My Blogs</p>
      </section>


      <section className='content'>
        {blogs.length > 0 ? (
          <div className='goals-dashboard'>
            {blogs.map((blog) => (
              <GoalItem key={blog._id} blog={blog} getonly={'no'}/>
            ))}
          </div>
        ) : (
          <h3>You have not set any blogs</h3>
        )}
      </section>
    </div>
  )
}

export default Dashboard
