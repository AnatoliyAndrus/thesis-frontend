import {useState} from 'react';
import './comment.css'
import {IoMdChatboxes, IoMdHeart, IoMdHeartEmpty} from "react-icons/io";
import {createComment, toggleLike} from "../../../services/commentService.js";
import {Link, useNavigate} from "react-router-dom";

const Comment = ({commentData}) => {
    const navigate = useNavigate()
    const [replyContent, setReplyContent] = useState('');
    const [showReplyInput, setShowReplyInput] = useState(false);

    const [data, setData] = useState(commentData)

    const handleReplyChange = (e) => {
        setReplyContent(e.target.value);
    };

    const handleReplySubmit = (e) => {
        e.preventDefault();

        createComment(replyContent, data.postId, data.commentId)
            .then(
                ()=>{
                    location.reload()
                }
            )

        setReplyContent('');
    };

    const handleLikeClick = () => {
        toggleLike(data.commentId)
            .then(res=>{
                setData(val=>{return {...val, isLiked:res.isLiked, likes:res.isLiked?val.likes+1:val.likes-1}})
            }).catch(e=>{
                if(e.response.status===403){
                    navigate("/login")
                }
        })
    };

    return (
        <div className="comment">
            <div className="comment-header">
                <Link to={`/profiles/${data.authorUserId}`} className="author">{data.authorNickname}</Link>
                <div className="date">{new Date(data.commentedDate).toLocaleString()}</div>
            </div>
            <div className="comment-content">
                <p>{data.content}</p>
            </div>
            <div className="comment-actions">
                <div className="likes">
                    {
                        data.isLiked? (<IoMdHeart onClick={handleLikeClick} className="comment-like-button"/>):
                            (<IoMdHeartEmpty onClick={handleLikeClick} className="comment-like-button"/>)
                    }
                    <span style={{fontFamily:"Arial"}}>{data.likes}</span>
                </div>
                <IoMdChatboxes className="reply-button" onClick={() => setShowReplyInput(!showReplyInput)}></IoMdChatboxes>
            </div>
            {showReplyInput && (
                <form onSubmit={handleReplySubmit} className="reply-form">
                    <textarea
                        value={replyContent}
                        onChange={handleReplyChange}
                        placeholder="Write your reply..."
                        required
                    />
                    <button type="submit">Submit</button>
                </form>
            )}
            {commentData.replies.length > 0 && (
                <div className="comment-replies">
                    {commentData.replies.map((reply) => (
                        <div key={reply.commentId}>
                            <Comment commentData={reply}/>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Comment;
