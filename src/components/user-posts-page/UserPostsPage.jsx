import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getPostsAuthoredBy} from "../../services/postService.js";
import Post from "../post/Post.jsx";
import {CircleLoader} from "react-spinners";

export default function UserPostsPage(){
    const {userId} = useParams()
    const [posts, setPosts] = useState(null)
    const [isLoaded, setLoaded] = useState(false)
    const [exists, setExists] = useState(false)

    useEffect(()=>{
        getPostsAuthoredBy(userId)
            .then(res=>{
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