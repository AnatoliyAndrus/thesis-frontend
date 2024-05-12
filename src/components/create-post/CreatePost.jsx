import {useEffect, useState} from 'react';
import './createPost.css';
import Select from "react-select";
import {CircleLoader} from "react-spinners";
import {fetchAllTags} from "../../services/tagService.js";
import{createPost} from "../../services/postService.js";
import {useNavigate} from "react-router-dom";

const CreatePost = () => {
    const navigate = useNavigate()

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const [allTags, setAllTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);

    const [isLoaded, setLoaded] = useState(false)

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        createPost({title, content, tags:selectedTags.map(tag=>tag.tagId)})
            .then(
                res => navigate("/home")
            )
    };

    //getting all tags from server
    useEffect(
        () => {
            async function setData() {
                const tags = await fetchAllTags()
                setAllTags(tags)
                setLoaded(true)
            }
            setData()
        },
        []
    )

    return (
        <>
            {isLoaded?
                (
                    <div className="create-post">

                        <h2>Create New Post</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="title">Title:</label>
                                <input
                                    type="text"
                                    id="title"
                                    value={title}
                                    onChange={handleTitleChange}
                                    placeholder="Enter title"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="content">Content:</label>
                                <textarea
                                    id="content"
                                    value={content}
                                    onChange={handleContentChange}
                                    placeholder="Enter content"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <Select
                                    isMulti
                                    name="Tags"
                                    options={allTags.map(tag => ({value: tag.tagId, label: tag.name}))}
                                    onChange={setSelectedTags}
                                />
                            </div>
                            <button type="submit">Create Post</button>
                        </form>
                    </div>

                ):
                (
                    <CircleLoader/>
                )}
        </>
    );
};

export default CreatePost;
