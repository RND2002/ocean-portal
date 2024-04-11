
import React, { useEffect, useState } from "react"
import { retrieveAllCourses } from "../../apis/courseApi"
import { useAuth } from "../../authservice/AuthProvider"
import { Link, useParams } from "react-router-dom";
import LinearColor from "../Loader";
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

export default function UserDashboard() {
    const [courses, setCourses] = useState([]);
    const authContext = useAuth();
    const [isLoading,setLoading]=useState(true)

    

    async function getAllCourses() {
        try {
            const response = await retrieveAllCourses(authContext.token);
            setCourses(response.data);
            setLoading(false)
        } catch (error) {
            console.log(error);
        }
    }
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

      const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
      setExpanded(!expanded);
    };
    
    

    useEffect(() => {
        getAllCourses();
    }, []);

    return (
        
        <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8'>
        
        {isLoading && <LinearColor />}
        <center><h3 className='text-3xl font-semibold'> Courses</h3></center>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 h-auto shadow-lg">
            {courses.map((course) => (
                <Card sx={{ maxWidth: 345, height: '100%' }}>
                    <CardHeader
                        // avatar={
                        //     <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        //         R
                        //     </Avatar>
                        // }
                        // action={
                        //     <IconButton aria-label="settings">
                        //         <MoreVertIcon />
                        //     </IconButton>
                        // }
                        title= <h3 className="font-semibold text-xl">{course.title}</h3>
                        subheader=""
                    />
                    <Link key={course.id} to={`/sections/${course.id}`} className="group relative">
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
                            <Typography paragraph>Description:</Typography>
                            {course.description}
                        </CardContent>
                    </Collapse>
                </Card>
            ))}
        </div>
    </div>
    )
}
