// import React, { useEffect, useState } from 'react'
// import { retrieveAllCoursesForAuthor } from '../../apis/courseApi'
// import { useAuth } from '../../authservice/AuthProvider'
// import { Link, useNavigate, useParams } from 'react-router-dom'
// import LinearColor from '../Loader'
// import { fetchUserDataApi, makeUserAuthor } from '../../apis/LoginApi'

// export const CourseOfAuthor = () => {
//     const [coursesForAuthor,setCoursesForAuthor]=useState([])
//     const [isLoading,setLoading]=useState(true)
//     const [isAuthor,setisAuthor]=useState('')
//     const [isUserAuthor,setUserAuthor]=useState(true)
    
//     const authContext=useAuth()
//     async function getAllCoursesForAuthor(){
        
//        const response=await retrieveAllCoursesForAuthor(authContext.token,authContext.username);
//        if(response.status===200){
//         setCoursesForAuthor(response.data);
//         setLoading(false)
//         console.log("done")
//        }else{
//         console.log("error fetching data");
//        }
//     }

//     async function checkUserForAuthor(){
//         const response=await fetchUserDataApi(authContext.token,authContext.username)
//       if(response.status===200){
//         //console.log(response.data.roles[0].name)
//        for(let i=0;i<response.data.roles.length;i++){
//         let role=response.data.roles[i]
//         if( role==="ROLE_AUTHOR"){
//             setisAuthor(response.data.roles[i])
//         }
//        }
//         //console.log(response.data);
//       }else{
//         console.log("Error loading data")
//       }
//       }
      

      
      
   
//     useEffect(()=>{
//         checkUserForAuthor()
//         if(!isAuthor.match("ROLE_AUTHOR")){
//             getAllCoursesForAuthor()
//         }else{
//             setUserAuthor(false)
//             clickedForAuthor()
//         }
        
//     },[])

//     function clickedForAuthor(){
//         makeUserAuthor()
//     }

//     const authorObject={
        
//         role:"ROLE_AUTHOR"
//     }
//     const navigate=useNavigate()
    

//     async function makeUserAuthor(){
//         const response=await makeUserAuthor(authContext.token,authorObject)
//         if(response.status===200){
//             navigate(`/welcome`)
//         }else{
//             console.log("error")
//         }
//     }
//   return (
//     <>
//      {isUserAuthor &&<div>You are not Author yet register yourself as Author<button className='rounded-lg border-black m-2' onClick={()=>clickedForAuthor()}>Register as author</button></div>}
//          <div className="bg-white">
         
        
//          {isLoading && <LinearColor/>}
//          {setCoursesForAuthor.length==0 &&<div>You haven't created course yet</div>}
//             <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
//                 <h2 className="text-2xl font-bold tracking-tight text-gray-900">Browse Courses of your interest</h2>

//                 <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
//                     {coursesForAuthor.map((course) => (
//                         <Link key={course.id} to={`/course/edit/${course.id}`} className="group relative">
//                         {/* <div key={course.id} className="group relative"> */}
                            
//                             <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
//                                 <img
//                                     src={`data:image/jpeg;base64,${course.image}`} // Set the image source using base64 data
//                                     alt={course.title}
//                                     className="h-full w-full object-cover object-center lg:h-full lg:w-full"
//                                 />
//                             </div>
                            
//                             <div className="mt-4 flex justify-between">
//                                 <div>
//                                     <h3 className="text-sm text-gray-700">
//                                         <a href={course.href}>
//                                             <span aria-hidden="true" className="absolute inset-0" />
//                                             {course.title}
//                                         </a>
//                                     </h3>
//                                 </div>
//                                 <p className="text-sm font-medium text-gray-900">{course.tags}</p>
//                             </div>
//                             <div className="mt-4"> <p className="text-sm font-medium text-gray-900">{course.tags}</p></div>
//                         {/* </div> */}
//                         </Link>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     </>
//   )
// }
import React, { useEffect, useState } from 'react'
import { retrieveAllCoursesForAuthor } from '../../apis/courseApi'
import { useAuth } from '../../authservice/AuthProvider'
import { Link, useNavigate } from 'react-router-dom'
import LinearColor from '../Loader'
import { fetchUserDataApi, makeUserAuthor } from '../../apis/LoginApi'
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';


const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

export const CourseOfAuthor = () => {
    const [coursesForAuthor, setCoursesForAuthor] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [isAuthor, setIsAuthor] = useState(false)
    const [isUserAuthor, setUserAuthor] = useState(false)

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
      setExpanded(!expanded);
    };
    
    const authContext = useAuth()
    
    async function getAllCoursesForAuthor() {
        const response = await retrieveAllCoursesForAuthor(authContext.token, authContext.username);
        if (response.status === 200) {
            //console.log(response.data)
            setCoursesForAuthor(response.data);
            setLoading(false);
            
        } else {
            console.log("error fetching data");
        }
    }

    async function checkUserForAuthor() {
        const response = await fetchUserDataApi(authContext.token, authContext.username);
        console.log(response.data)
        if (response.status === 200) {
            for (let i = 0; i < response.data.roles.length; i++) {
                let role = response.data.roles[i].name;
                if (role === "ROLE_AUTHOR") {
                    setIsAuthor(true);
                    setUserAuthor(true)
                }
            }
        } else {
            console.log("Error loading data");
        }
    }
      
    useEffect(() => {
        checkUserForAuthor();
    }, []); // Dependency array should be empty to run once when component mounts

    useEffect(() => {
        if (isAuthor===true) {
            setUserAuthor(true)
            getAllCoursesForAuthor();
            
        } 
    }, [isAuthor]); // Dependency array should include isAuthor

    const authorObject = {
        role: "ROLE_AUTHOR"
    };

    const navigate = useNavigate();

    async function clickedForAuthor() {
        const response = await makeUserAuthor(authContext.token,authContext.username, authorObject);
       // console.log(response.data)
        if (response.status === 200) {
            setUserAuthor(true)
            setLoading(false)
            getAllCoursesForAuthor()
            navigate(`/courses/author/all`);
        } else {
            console.log("error");
        }
    }

    
        
        return (
        
        <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8'>
    
    {isLoading && <LinearColor />}
    {!isUserAuthor && 
        <div className='font-semibold text-2xl'>You are not an Author yet. Register yourself as an Author 😊😊
          <div className='sm:mx-auto sm:w-full sm:max-w-sm m-6'>
        <button onClick={clickedForAuthor} class="group relative h-12 w-48 overflow-hidden rounded-lg bg-white text-lg shadow" type="submit">
    <div class="absolute inset-0 w-3 bg-blue-400 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
    <span class="relative text-black group-hover:text-white">Register As Author</span>
  </button>
        </div>
            {/* <button className='rounded-lg bg-blue border-black m-2' onClick={clickedForAuthor}>Register as author</button> */}
        </div>
    }
    <center><h3 className='text-3xl font-semibold'>Your Curated Courses</h3></center>
    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 h-auto shadow-lg">
        {coursesForAuthor.map((course) => (
            <Card sx={{ maxWidth: 345, height: '100%' }}>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                            R
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={course.title}
                    subheader="September 14, 2016"
                />
                <Link key={course.id} to={`/course/edit/${course.id}`} className="group relative">
                    <CardMedia
                        component="img"
                        image={`data:image/jpeg;base64,${course.image}`}
                        alt="Paella dish"
                        style={{
                            // Add your custom CSS styles here
                            borderRadius: '8px',
                            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                            width: '100%',
                            height: 'auto',
                            objectFit: 'cover',
                            maxHeight: '150px' // Ensure the image covers the container
                        }}
                    />
                </Link>
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {course.description}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing style={{right:10, zIndex: 100 }}>
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                        <ShareIcon />
                    </IconButton>
                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph>Description</Typography>
                        {course.description}
                    </CardContent>
                </Collapse>
            </Card>
        ))}
    </div>
</div>

            
    );
}
