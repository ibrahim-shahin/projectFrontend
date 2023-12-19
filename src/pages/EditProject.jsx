import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import ax from 'axios'

const EditProject = () => {

  const [data, setData] = useState([])
  const navigate = useNavigate()
  const idd = useParams()
  const baseUrl = `https://backend-nm3q.onrender.com/api/projects/${idd.idd}`
  const users = JSON.parse(localStorage.getItem('user'))
  const [videoInformation, setVideoInformation] = useState("");

  const UpdataSubtitle = async () => {
    try {
      let response = await ax.patch(baseUrl, { updatedFields: videoInformation }, {
        headers: { 'Authorization': `Bearer ${users.token}` },
      });

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await ax.get(baseUrl, {
          headers: { 'Authorization': `Bearer ${users.token}` },
        });
        setData(response.data)
        setVideoInformation(response.data.subtitle)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

  const burnProject = async () => {
    try {
      let response = await ax.get(`https://backend-nm3q.onrender.com/api/projects/burn/${idd.idd}`, {
        headers: { 'Authorization': `Bearer ${users.token}` },
      })

      const videoUrl = `https://backend-nm3q.onrender.com/uploads/${response.data}`

      // Create a download link
      const downloadLink = document.createElement('a');
      downloadLink.href = videoUrl;

      // Set the filename for the download (you can use the 'download' attribute for some browsers)
      downloadLink.download = 'example.mp4';

      // Append the link to the document
      document.body.appendChild(downloadLink);

      // Trigger the click event on the link to initiate the download
      downloadLink.click();

      // Remove the link from the document
      document.body.removeChild(downloadLink);

    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className="container mt-5">
      <div className="row">

        < video className="col-md-6 h-100" src={`https://backend-nm3q.onrender.com/uploads/${data.title}`} type="video/webm" controls />

        <div className="col-md-6">
          {/* Editable Text Area */}
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Video Information</h5>
              <textarea
                rows={15}
                className="form-control"
                value={videoInformation}
                onChange={(e) => setVideoInformation(e.target.value)}
              />
            </div>
          </div>
          <div className='d-flex justify-content-evenly m-3 '>
            <button onClick={UpdataSubtitle} className='btn btn-primary'>Save Changes</button>
            <button onClick={burnProject} className='btn btn-primary'>Burn</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProject;