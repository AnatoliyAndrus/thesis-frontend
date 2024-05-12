import {useEffect, useState} from 'react';
import './userProfile.css';
import {useParams} from "react-router-dom";
import {getUserBasicInfo, setOrChangeAvatar} from "../../services/userService.js";
import {CircleLoader} from "react-spinners";
import {backendBaseLink} from "../../utils/constants.js";

const UserProfile = ({ currentUser }) => {
    const {userId} = useParams()
    const [selectedFile, setSelectedFile] = useState(null);

    const [user, setUser] = useState(null)
    const [isCurrentUser, setIsCurrentUser] = useState(false)
    const [isLoaded, setLoaded] = useState(false)

    useEffect(
        ()=>{
            if(currentUser&&currentUser.userId===userId) {
                setIsCurrentUser(true)
                setUser(currentUser)
                setLoaded(true)
            }else{
                getUserBasicInfo(userId)
                    .then(res=>{
                        setUser(res.data)
                        setLoaded(true)
                    })
            }
        },
        []
    )

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleUpload = () => {
        setOrChangeAvatar(selectedFile, userId)
            .then(()=>location.reload())
    };

    return (
        <>
        {
            isLoaded?
                (
                    <div className="user-profile">
                        <div className="profile-avatar-container">
                            <img src={`${backendBaseLink}/users/${userId}/avatar`} alt="Avatar" className="profile-avatar" />
                            {isCurrentUser&&
                                (<>
                                    <input type="file" onChange={handleFileChange} accept="image/*" required/>
                                    <button onClick={handleUpload} disabled={!selectedFile}>Upload</button>
                                </>)}
                        </div>
                        <div className="user-details">
                            <h2>User Profile</h2>
                            {isCurrentUser&&<p><strong>Email:</strong> {user.email}</p>}
                            <p><strong>Nickname:</strong> {user.nickname}</p>
                            <p><strong>Registered Date:</strong> {new Date(user.registeredDate).toLocaleString()}</p>
                            <p><strong>User ID:</strong> {userId}</p>
                        </div>
                    </div>
                ):
                (
                    <CircleLoader/>
                )
        }
        </>
    );
};

export default UserProfile;
