
import { useEffect, useState } from "react";
import { BlogProps } from "../../features/blog/blogSlice";
import axios from "../../features/utils/axios";

export default function PostDetails({ blog }: { blog: BlogProps }) {
    let { title, tags, image, createdAt, description, isSaved, id, likes } = blog;
    const [like, setLike] = useState(0);
    const [saved, setSaved] = useState(false)

    useEffect(() => {
        setSaved(isSaved)
    }, [isSaved])

    useEffect(() => {
        setLike(likes)
    }, [likes])


    const handleLike = async (likes: number) => {
        setLike(pre => pre + 1)
        await axios.patch(`/blogs/${id}`, {
            likes: likes + 1
        })

    }

    const handleSave = async () => {
        setSaved(pre => !pre)
        await axios.patch(`/blogs/${id}`, {
            isSaved: !saved
        })
    }

    return (
        <main className="post">
            <img src={image}
                alt="githum" className="w-full rounded-md" id="lws-megaThumb" />
            <div>
                <h1 className="mt-6 text-2xl post-title" id="lws-singleTitle">
                    {title}
                </h1>
                <div className="tags" id="lws-singleTags">
                    {/* <span>#python,</span> <span>#tech,</span> <span>#git</span> */}
                    {tags?.map((tag, index) => (
                        <span key={index}>#{tag},</span>
                    ))}
                </div>
                <div className="btn-group">
                    {/* <!-- handle like on button click --> */}
                    <button className="like-btn" id="lws-singleLinks">
                        <i onClick={() => handleLike(likes)} className="fa-regular fa-thumbs-up">{like}</i>
                    </button>
                    <button className="active save-btn" id="lws-singleSavedBtn">
                        {
                            saved ? (
                                <span onClick={handleSave} className="lws-badge"> Saved </span>
                            ) : (

                                <i onClick={handleSave} className="fa-regular fa-bookmark"></i>
                            )
                        }
                    </button>
                </div>
                <div className="mt-6">
                    <p>
                        {description}
                    </p>
                </div>
            </div>
        </main>
    )
}
