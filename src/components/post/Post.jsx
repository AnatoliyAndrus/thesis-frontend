import {useState} from 'react';
import './post.css';
import {IoMdHeart, IoMdHeartEmpty, IoMdChatboxes} from "react-icons/io";
import {Link, useNavigate} from "react-router-dom";
import * as postService from "../../services/postService.js"
import {isAuthenticated} from "../../services/authService.js";

const Post = ({ postData }) => {
    const navigate = useNavigate()

    const { postId, title, content, postedDate, authorNickname, authorUserId, tags} = postData;

    const [likes, setLikes] = useState(postData.likes)
    const [isLiked, setLiked] = useState(postData.isLiked)

    const handleLikeClick = () => {
        postService
            .toggleLike(postId)
            .then(res=>{
                setLiked(res.isLiked)
                setLikes(val=>res.isLiked?val+1:val-1)
            })
    };

    return (
        <div className="post">
            <div className="post-header">
                <Link to={`/profiles/${authorUserId}`} className="author">{authorNickname}</Link>
                <div className="date">{new Date(postedDate).toLocaleDateString()}</div>
            </div>
            <div className="post-content">
                <h2>{title}</h2>
                <p>{content}</p>
            </div>
            <div className="post-footer">
                <div className="likes">
                    {
                        isLiked? (<IoMdHeart onClick={handleLikeClick} className="like-button"/>):
                            (<IoMdHeartEmpty onClick={handleLikeClick} className="like-button"/>)
                    }
                    <span style={{fontFamily:"Arial"}}>{likes}</span>
                </div>

                {
                    tags.map(tag=><div key={tag.tagId} style={{backgroundColor:"#524094", color:"white", alignSelf:"center",padding:"5px 10px", borderRadius:"10px"}}>{tag.name}</div>)
                }

                <Link to={`/posts/${postId}`}>
                    <IoMdChatboxes className="comment-button"></IoMdChatboxes>
                </Link>
            </div>
        </div>
    );
};

export default Post;
