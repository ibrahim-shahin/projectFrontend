import { Link , useNavigate } from 'react-router-dom'

const Navbar = () => {
 
  const navigate = useNavigate()
  const users = JSON.parse(localStorage.getItem('user'))

  const handleClick = () => {
    localStorage.removeItem('user')

    // dispatch logout action
    navigate('/')
    window.location.reload(false); 
  }
  
  return (
    <header>
      <div className="navbar navbar-light bg-light justify-content-between px-2">
        <Link to="/" className="navbar-brand">
          <h1>SubtitleForge</h1>
        </Link>
        <nav className=''>
          {users && (
            <div>
              <span className='mx-3'>{users.email}</span>
              <button className='btn btn-danger' onClick={handleClick}>Log out</button>
            </div>
          )}
          {!users && (
            <div>
              <Link className='btn btn-primary mx-3' to="/login">Login</Link>
              <Link className='btn btn-primary' to="/signup">Signup</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navbar