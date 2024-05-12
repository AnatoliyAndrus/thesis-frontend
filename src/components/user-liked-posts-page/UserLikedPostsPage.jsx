/**
 * page of posts liked by user
 * should be accessible only for this exact user
 */
import {useEffect, useState} from "react";
import {isAuthenticated} from "../../services/authService.js";
import {useNavigate, useParams} from "react-router-dom";
import {getLikedPosts} from "../../services/postService.js";
import {CircleLoader} from "react-spinners";
import Post from "../post/Post.jsx";

export default function UserLikedPostsPage(){
    const navigate = useNavigate()
    const {userId} = useParams()
    console.log(userId)

    const [posts, setPosts] = useState(null)
    const [isLoaded, setLoaded] = useState(false)
    const [exists, setExists] = useState(false)

    useEffect(()=>{
        //not authenticated user has no right to access liked-posts
        if(!isAuthenticated()) navigate("/login")

        getLikedPosts(userId)
            .then(res=>{
                console.log("liked", res.data)
                setPosts(res.data)
                setLoaded(true)
                setExists(true)
            }).catch(()=>setLoaded(true))
    },[])

    return (
        <>
            {isLoaded?
                exists?
                    (posts.map(post=>(<Post key={post.postId} postData={post}/>)))
                    :
                    (<h2>{"Sorry, we can't display queried posts"}</h2>)
                :(<CircleLoader/>)}
        </>
    )
}