

// export default SectionList;
import React, { useEffect, useState } from 'react'
import { getAllSectionsApi, getLecturesApi } from '../../apis/courseApi'
import { useAuth } from '../../authservice/AuthProvider'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import LinearColor from '../Loader';
import { Button } from '@mui/material';
import UnstyledButtonCustom from '../ButtonComponent';
import { fetchUserDataApi } from '../../apis/LoginApi';

import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

const SectionList = () => {
  const [sections, setSections] = useState([])
  const [selectedSectionId, setSelectedSectionId] = useState(null); // State variable to track the selected section ID
  const [lectures, setLectures] = useState([]); // State variable to store lectures
  const [isLoading,setLoading]=useState(true)
  const [isAuthor,setAuthor]=useState(false)








  const authContext = useAuth()
  const courseId = useParams().id

  async function getAllSectionForCourse() {
    const response = await getAllSectionsApi(authContext.token, courseId)
    if (response.status === 200) {
      setSections(response.data)
    } else {
      console.log("error")
    }
  }

  useEffect(() => {
    getAllSectionForCourse()
  }, [])
  

  async function checkUserForAuthor() {
    const response = await fetchUserDataApi(authContext.token, authContext.username);
    if (response.status === 200) {
        for (let i = 0; i < response.data.roles.length; i++) {
          
            let role = response.data.roles[i].name;
            console.log('User role:', role);
            if (role === 'ROLE_AUTHOR') {
              console.log("inside")
                setAuthor(true);
                console.log('User is author');
                break
            }
        }
    } else {
        console.log("Error loading data");
    }
}
  
useEffect(() => {
    checkUserForAuthor();
}, []);
    
   

  // Function to toggle visibility of lectures
  const toggleLectures = async (sectionId) => {
    
    const response = await getLecturesApi(authContext.token, sectionId); // Fetch lectures for the selected section ID
    if (response.status === 200) {
      console.log(response.data)
      setLectures(response.data);
      setLoading(false)
    } else {
      console.log("error")
    }
  }

  
  const navigate=useNavigate()
  // Function to handle navigation to the add lecture page
  const handleAddLecture = (sectionId) => {
    // Redirect to the add lecture page with the sectionId parameter
    navigate(`/course/resources/${sectionId}`)
  };

  //const sectionId=useParams()

  return (
    
    <div>
      <div className='flex justify-center m-3'><h3 className='font-semibold text-3xl'>Sections</h3></div>
      {sections.map((section) => (
        <React.Fragment key={section.sectionId}>
          <Accordion onChange={(event, expanded) => expanded && toggleLectures(section.sectionId)}>
            <AccordionSummary
              expandIcon={<ArrowDownwardIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography><div className='flex-auto'><div className='mr-3'><h3 className='font-bold text-xl '>{section.name}</h3></div></div></Typography>
             {/* {isAuthor ?  <UnstyledButtonCustom component={Link} to={`/course/resources/${section.sectionId}`} name="Add Lecture"/>:null} */}
             {isAuthor && (
        <Button onClick={() => handleAddLecture(section.sectionId)} name="Add Lecture" variant='contained' color="secondary">
          Add Lecture
        </Button>
      )}
            
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {/* Section description will be displayed here in near future */}
                  <ul>
                {isLoading && <LinearColor/>}
                  {lectures.map((lecture) => (
                    // <li key={lecture.id}>
                       
                    //   <p>{lecture.name}</p>
                    //   <p>Resource Name: {lecture.resource.name}</p>
                    //   <p>Resource Size: {lecture.resource.size}</p>
                    //   <a href={lecture.resource.url} target="_blank" rel="noopener noreferrer">View Resource</a>
                    // </li>
                    <Box sx={{ height: 400, width: '100%' }}>
                    <DataGrid
                      rows={lectures.map(lecture => ({
                        id: lecture.id,
                        lectureName: lecture.name,
                        resourceName: lecture.resource.name,
                        resourceSize: lecture.resource.size,
                        resourceUrl: lecture.resource.url
                      }))}
                      columns={[
                        { field: 'id', headerName: 'ID', width: 70 },
                        { field: 'lectureName', headerName: 'Lecture Name', width: 200 },
                        { field: 'resourceName', headerName: 'Resource Name', width: 200 },
                        { field: 'resourceSize', headerName: 'Resource Size', width: 150 },
                        {
                          field: 'resourceUrl',
                          headerName: 'View Resource',
                          width: 150,
                          renderCell: params => (
                            <a href={params.value} target="_blank" rel="noopener noreferrer">
                              View Resource
                            </a>
                          )
                        }
                      ]}
                      disableColumnMenu
                      disableSelectionOnClick
                      hideFooterPagination
                      autoHeight
                      sx={{
                        '& .MuiDataGrid-root': {
                          display: 'flex',
                          justifyContent: 'center'
                        }
                      }}
                    />
                  </Box>
                  
                  
                  ))}
                </ul>
              </Typography>
            </AccordionDetails>
          </Accordion>
         
        </React.Fragment>
      ))}
    </div>
  
  )
}

export default SectionList



