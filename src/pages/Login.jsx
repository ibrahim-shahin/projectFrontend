import { useState } from "react"
import ax from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setError(null)

      const response = await ax.post('https://backend-nm3q.onrender.com/api/user/login', { email, password })

      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(response.data))

      // update the auth context
      navigate('/')
      window.location.reload(false);
      // dispatch({type: 'LOGIN', payload: json})

    } catch (error) {
      setError(error.response.data.error)
    }

  }

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Log In</h3>

      <label class="form-label">Email address:</label>
      <input
        type="email"
        className="form-control mb-2"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <label class="form-label">Password:</label>
      <input
        type="password"
        className="form-control mb-2"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />

      <button className='btn btn-primary my-3 px-5 mx-auto'>Log in</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default Login