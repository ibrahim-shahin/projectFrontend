import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import ax from 'axios'
const Signup = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repassword, setRepassword] = useState('')

  const [error, setError] = useState(null)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setError(null)

      if (password != repassword) {
        setError("Passwords doesn't match")
        return
      }

      //send the email and passowrd to server
      const response = await ax.post('https://backend-nm3q.onrender.com/api/user/signup', { name, email, password })
      console.log("here")
      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(response.data))

      // update the auth context
      navigate('/')
      window.location.reload(false);
      // dispatch({type: 'LOGIN', payload: json})

      // update loading state

    } catch (error) {
      setError(error.response.data.error)
    }

  }

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>
      <label class="form-label">Name:</label>
      <input
      className="form-control mb-2"
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <label class="form-label">Email address:</label>
      <input
      className="form-control mb-2"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <label class="form-label">Password:</label>
      <input
      className="form-control mb-2"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <label class="form-label">Re-Enter Password:</label>
      <input
      className="form-control mb-2"
        type="password"
        onChange={(e) => setRepassword(e.target.value)}
        value={repassword}
      />
      <button className='btn btn-primary my-3 px-5'>Sign up</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default Signup