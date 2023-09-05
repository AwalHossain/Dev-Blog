import { Link } from "react-router-dom";

export interface Related {
    id: 0,
    title: "",
    description: "",
    image: "",
    tags: [],
    likes: 0,
    isSaved: false,
    createdAt: "",
};

type RelatedPostItemProps = {
    tag: Related
}


export default function RelatedPostItem({ tag }: RelatedPostItemProps) {
    const { tags, image, title, createdAt, id } = tag

    return (
        <div key={id} className="card">
            <Link to={`/post/${id}`}>
                <img src={image}
                    className="card-image" alt="" />
            </Link>
            <div className="p-4">
                <a href="post.html" className="text-lg post-title lws-RelatedPostTitle">
                    {title}
                </a>
                <div className="mb-0 tags">
                    {/* <span>#python,</span> <span>#tech,</span> <span>#git</span> */}
                    {tags.map((tag: string) => <span>#{tag},</span>)}
                </div>
                <p>{createdAt}</p>
            </div>
        </div>
    )
}
