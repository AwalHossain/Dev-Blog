import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { BlogProps, fetchBlogs } from "../../features/blogs/blogsSlice";
import PostGridItem from "./PostGridItem";


export default function Posts() {
    const dispatch = useAppDispatch();
    const { blogs, status } = useAppSelector(state => state.blogs)
    const { filter, sort } = useAppSelector(state => state.filter);

    useEffect(() => {
        dispatch(fetchBlogs({ filter, sort }))
    }, [dispatch, filter, sort])
    let content = null;
    if (status === "loading") {
        content = <div className="col-span-12">Loading...</div>
    }
    if (status === "idle" && blogs.length === 0) {
        content = <div className="col-span-12">No blogs found</div>
    }
    if (status === "idle" && blogs.length > 0) {
        content = blogs?.map((blog: BlogProps) => <PostGridItem key={blog.id} blogs={blog} />)
    }

    if (status === "failed") {
        content = <div className="col-span-12">Failed to fetch blogs</div>
    }
    return (
        <main className="post-container" id="lws-postContainer">
            {content}
        </main>
    )
}
