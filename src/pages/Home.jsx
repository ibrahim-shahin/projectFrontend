import { useEffect, useState } from 'react'
import ax from 'axios'
import { useNavigate } from 'react-router-dom'

// components
import ProjectDetails from '../components/ProjectDetails'


const Home = () => {
  const [projects, setProjects] = useState(null)
  const [show, setShow] = useState(false)
  const navigate = useNavigate()
  const users = JSON.parse(localStorage.getItem('user'))



 const fetchWorkouts = async () => {
    try {
      let response = await ax.get("https://backend-nm3q.onrender.com/api/projects", {
        headers: { 'Authorization': `Bearer ${users.token}` },
      });
      setProjects(response.data)

    } catch (error) {
      localStorage.removeItem('user')

      // dispatch logout action
      navigate('/')
      window.location.reload(false);
    }
  }

  useEffect(() => {
    fetchWorkouts
    if (users) {
      fetchWorkouts()
    }
  }, [show])

  return (
    <div className='container'>
      <div className='d-flex justify-content-between my-3'>
        <h2>Projects List</h2>
        <button className='btn btn-primary' onClick={() => navigate('/newProject')}>Add a new project</button>
      </div>
      {
        (projects && Object.keys(projects).length === 0) ? <span> <strong>No Projects Yet :</strong></span> : 
        <div style={{"overflowX":"auto"}}>
        <table className='table table-striped table-hover mt-2 w-100 rounded shadow'>
          <thead>
            <tr >
              <th>Name</th>
              <th>Video duration</th>
              <th>Create Date</th>
              <th>Language</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {
              projects && projects.map((project) => (
                <ProjectDetails project={project} setShow={setShow} show={show} key={project._id} />
              ))
            }
          </tbody>
        </table>
        </div>
      }
    </div>

  )
}

export default Home