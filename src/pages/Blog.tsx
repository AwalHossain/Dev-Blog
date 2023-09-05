import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import PostDetails from "../components/description/PostDetails";
import RelatedPosts from "../components/relatedPosts/RelatedPosts";
import { fetchBlog } from "../features/blog/blogSlice";

export default function Blog() {
    const { blogId } = useParams<{ blogId: string }>();
    console.log(blogId, "id");

    const dispatch = useAppDispatch();
    const { blog, error, status } = useAppSelector(state => state.blog);



    useEffect(() => {
        dispatch(fetchBlog({ blogId }))
    }, [dispatch, blogId])
    let content = null;
    if (status === "loading") {
        content = <div className="col-span-12">Loading...</div>
    }
    if (status === "idle" && blog === null) {
        content = <div className="col-span-12">No blog found</div>
    }
    if (status === "idle" && blog !== null) {

        content = (
            <section className="post-page-container">
                <PostDetails blog={blog} />
                <RelatedPosts currentId={blogId} relatedPosts={blog?.tags} />
            </section>

        )
    }


    return (
        <div>
            <div className="container mt-8">
                <Link to={"/"} className="inline-block text-gray-600 home-btn" id="lws-goHome"><i
                    className="mr-2 fa-solid fa-house"></i>Go Home</Link>
            </div>
            {
                content
            }

        </div>
    )
}
