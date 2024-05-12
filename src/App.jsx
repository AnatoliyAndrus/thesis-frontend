import './App.css'
import {useEffect, useState} from "react";
import InfinitePostsScroller from "./components/infinite-posts-scroller/InfinitePostsScroller.jsx";
import {Routes, Route, Link, BrowserRouter} from "react-router-dom"
import RegisterForm from "./components/register-form/RegisterForm.jsx";
import LoginForm from "./components/login-form/LoginForm.jsx";
import PostPage from "./components/post-page/PostPage.jsx";
import UserProfile from "./components/user-profile/UserProfile";
import UserPostsPage from "./components/user-posts-page/UserPostsPage.jsx";
import NoMatch from "./components/no-match/NoMatch";
import * as authService from "./services/authService.js"
import {CircleLoader} from "react-spinners";
import {backendBaseLink} from "./utils/constants.js";
import CreatePost from "./components/create-post/CreatePost";
import {IoHome} from "react-icons/io5";
import UserLikedPostsPage from "./components/user-liked-posts-page/UserLikedPostsPage.jsx"


export default function App() {

    const [currentUser, setCurrentUser] = useState(null)
    const [isAuthenticated, setAuthenticated] = useState(false)

    const [isDropMenuOpen, setDropMenuOpen] = useState(false)

    const [isLoaded, setLoaded] = useState(false)

    function handleLogout(){
        authService.deleteToken()
        location.reload()
    }

    //useEffect for setting initial data
    useEffect(
        () => {
            if(authService.isAuthenticated()){
                authService
                    .getCurrentUserInfo()
                    .then(res=>{
                        console.log(res.data)
                        setCurrentUser(res.data)
                        setAuthenticated(true)
                        setLoaded(true)
                    })
                    .catch(reason => {
                        console.log(reason, "reason")
                        authService.deleteToken()
                        setLoaded(true)
                    })
            } else {
                setLoaded(true)
            }
        },
        []
    )

    return (
        <>
            {
                isLoaded?
                    (<BrowserRouter>
                        <nav className="navbar">
                                <Link to="/home" className="home-icon"><IoHome/></Link>
                            {isAuthenticated ? (<Link to="/create-post" className="nav-links">Create post</Link>):("")}
                            <div className="nav-items">
                                {isAuthenticated ? (
                                    <div className="avatar-menu">
                                        <div className="avatar" onClick={() => setDropMenuOpen(val => !val)}>
                                            <img src={`${backendBaseLink}/users/${currentUser.userId}/avatar`} alt="Avatar" />
                                        </div>
                                        {isDropMenuOpen && (
                                            <div className="menu">
                                                <ul>
                                                    <li><Link to={`/profiles/${currentUser.userId}`} className="menu-item">Profile</Link></li>
                                                    <li><Link to={`/profiles/${currentUser.userId}/posts`} className="menu-item">Your posts</Link></li>
                                                    <li><Link to={`/profiles/${currentUser.userId}/liked-posts`} className="menu-item">Your liked posts</Link></li>
                                                    <li className="menu-item" onClick={handleLogout}>Logout</li>
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <>
                                        <Link to="login" className="nav-links">Log in</Link>
                                        <Link to="register" className="nav-links">Register</Link>
                                    </>
                                )}
                            </div>
                        </nav>

                        <Routes>
                            <Route index element={<InfinitePostsScroller/>}></Route>
                            <Route path="home" element={<InfinitePostsScroller/>}></Route>
                            <Route path="register" element={<RegisterForm/>}></Route>
                            <Route path="login" element={<LoginForm/>}></Route>
                            <Route path="create-post" element={<CreatePost/>}></Route>
                            <Route path="posts/:postId" element={<PostPage/>}></Route>
                            <Route path="profiles/:userId/liked-posts" element={<UserLikedPostsPage/>}></Route>
                            <Route path="profiles/:userId/posts" element={<UserPostsPage/>}></Route>
                            <Route path="profiles/:userId" element={<UserProfile currentUser={currentUser}/>}>
                            </Route>
                            <Route path="*" element={<NoMatch/>}></Route>
                        </Routes>

                    </BrowserRouter>)
                    :
                    (<CircleLoader/>)
            }
        </>
    )
}