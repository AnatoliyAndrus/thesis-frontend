/**
 * page for displaying one post with its comments
 */
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getPost} from "../../services/postService.js";
import {CircleLoader} from "react-spinners";
import Post from "../post/Post.jsx";
import Comment from "./Comment/Comment.jsx";
import "./postPage.css";
import {createComment} from "../../services/commentService.js";

export default function PostPage(){

    const {postId} = useParams()

    const [postData, setPostData] = useState(null)

    const [isLoaded, setLoaded] = useState(false)
    const [exists, setExists] = useState(false)

    function loadPostData(){
        getPost(postId)
            .then(res=>{
                setPostData(res.data)
                setLoaded(true)
                setExists(true)
            }).catch(e => setLoaded(true))
    }

    useEffect(()=>loadPostData(), [])

    const [replyContent, setReplyContent] = useState('');

    const handleReplyChange = (e) => {
        setReplyContent(e.target.value);
    };

    const handlePostCommentSubmit = (e) => {
        e.preventDefault();

        createComment(replyContent, postId, null)
            .then(
                ()=>{
                    location.reload()
                }
            )

    };

    return (
        <>
            {
                isLoaded?
                    (
                        exists?
                            (
                                <>
                                    <Post postData={postData}/>
                                    <form onSubmit={handlePostCommentSubmit} className="post-comment-form">
                                        <textarea
                                            value={replyContent}
                                            onChange={handleReplyChange}
                                            placeholder="Write your comment..."
                                            required
                                        />
                                        <button type="submit">Submit</button>
                                    </form>
                                    {postData.comments.map(comment=>
                                        (
                                            <div key={comment.commentId}>
                                                <Comment commentData={comment}/>
                                            </div>
                                        )
                                    )}
                                </>
                            )
                            :
                            (
                                <h2>Unable to load post you are looking for</h2>
                            )
                    )
                    :
                    (
                        <CircleLoader/>
                    )
            }
        </>
    )
}