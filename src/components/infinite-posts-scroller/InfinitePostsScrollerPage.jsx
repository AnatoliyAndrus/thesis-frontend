import InfiniteScroll from "react-infinite-scroll-component";
import {CircleLoader} from "react-spinners";
import {useEffect, useState} from "react";
import Select from "react-select";
import "./infinitePostsScrollerPage.css"
import {fetchAllTags} from "../../services/tagService.js"
import {fetchPostsByFilters} from "../../services/postService.js";
import Post from "../post/Post.jsx";


export default function InfinitePostsScrollerPage() {

    const [isLoaded, setLoaded] = useState(false)

    const size = 10
    const [posts, setPosts] = useState([])
    const [hasMorePosts, setHasMorePosts] = useState(true)

    const [page, setPage] = useState(0);
    const [allTags, setAllTags] = useState([]);

    const [authorId, setAuthorId] = useState("");
    const [minDate, setMinDate] = useState("");
    const [maxDate, setMaxDate] = useState("");
    const [title, setTitle] = useState("");

    const [selectedTags, setSelectedTags] = useState([]);

    useEffect(
        () => {
            async function setData() {
                const tags = await fetchAllTags()
                setAllTags(tags)
                const fetchedPosts = await fetchPostsByFilters({page, size})
                setPosts(fetchedPosts.data.content);
                if (fetchedPosts.data.last) setHasMorePosts(false)
                setLoaded(true)
            }

            setData()
        },
        []
    )


    const handleApplyFilters = () => {
        setPage(0)
        setHasMorePosts(true)
        fetchPostsByFilters(
            {
                authorId, minDate, maxDate, title, tagIds: selectedTags.map(tag => tag.value), page: 0, size,
            }
        ).then(res => {
            setPosts(res.data.content)
            if (res.data.last) setHasMorePosts(false)
        })
    };

    const getNextData = () => {
        fetchPostsByFilters(
            {authorId, minDate, maxDate, title, tagIds: selectedTags, page: page + 1, size}
        ).then(res => {
            if (res.data.last) setHasMorePosts(false)
            setPosts(posts => posts.concat(res.data.content))
        })
        setPage(prev => prev + 1)
    };


    return (
        <>
            {isLoaded ? (
                <>
                    <div>
                        <div className="input-holder">
                            <div>
                                <label htmlFor="author">Author</label>
                                <input
                                    name="author"
                                    type="text"
                                    placeholder="Author userID"
                                    value={authorId}
                                    onChange={e => setAuthorId(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="title">Title</label>
                                <input
                                    name="title"
                                    type="text"
                                    placeholder="Title"
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="From">From</label>
                                <input
                                    name="from"
                                    type="datetime-local"
                                    placeholder="Min Date"
                                    value={minDate}
                                    onChange={e => setMinDate(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="to">To</label>
                                <input
                                    name="to"
                                    type="datetime-local"
                                    placeholder="Max Date"
                                    value={maxDate}
                                    onChange={e => setMaxDate(e.target.value)}
                                />
                            </div>
                        </div>
                            <Select
                                isMulti
                                name="Tags"
                                options={allTags.map(tag => ({value: tag.tagId, label: tag.name}))}
                                onChange={setSelectedTags}
                            />
                        <button className="filter-button" onClick={handleApplyFilters}>Apply Filters</button>
                    </div>
                    <InfiniteScroll
                        next={getNextData}
                        hasMore={hasMorePosts}
                        loader={<CircleLoader/>}
                        dataLength={posts.length}
                        endMessage={<h3>No more posts found</h3>}
                    >
                        {posts.map(post => <Post key={post.postId} postData={post}></Post>)}
                    </InfiniteScroll>
                </>
            ) : (
                <CircleLoader/>
            )}
        </>
    );
}