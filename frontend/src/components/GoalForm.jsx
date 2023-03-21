import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createBlog } from '../features/blogs/blogSlice'

function GoalForm() {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  const dispatch = useDispatch()

  const onSubmit = (e) => {
    e.preventDefault()

    dispatch(createBlog({ title, body }))
    setTitle('')
    setBody('')
    navigate('/')
  }

  return (
    <section className='form'>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='title'>Blog Title</label>
          <input
            type='title'
            name='title'
            id='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='body'>Blog Body</label>
          <textarea
            type='body'
            name='body'
            id='body'
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <button className='btn btn-block' type='submit'>
            Add Blog
          </button>
        </div>
      </form>
    </section>
  )
}

export default GoalForm
