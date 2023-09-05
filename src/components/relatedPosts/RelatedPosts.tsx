import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchTags } from "../../features/tags/tagsSlice";
import RelatedPostItem, { Related } from "./RelatedPostItem";

export interface TagsProps {
    relatedPosts: string[],
    currentId: string | undefined
}

export default function RelatedPosts({ currentId, relatedPosts }: TagsProps) {

    const dispatch = useAppDispatch();
    const { tags, status, error } = useAppSelector((state) => state.tags)

    useEffect(() => {
        dispatch(fetchTags({ relatedPosts, currentId }))

    }, [dispatch, relatedPosts, currentId]
    )


    let content = null;

    if (status === 'idle' && tags.length >= 0) {
        content = tags.map((tag: Related) =>
            <RelatedPostItem tag={tag} />
        )
    }
    if (status === 'loading') {
        content = <p className="text-center">Loading...</p>
    }
    if (status === 'failed') {
        content = <p className="text-center">{error}</p>
    }
    if (tags.length === 0) {

        content = <p className="text-center">No related posts found</p>
    }




    return (
        <aside>
            <h4 className="mb-4 text-xl font-medium" id="lws-relatedPosts">Related Posts</h4>
            <div className="space-y-4 related-post-container">
                {/* <!-- related post  --> */}
                {/* <!-- related post ends --> */}
                {content}
            </div>
        </aside>
    )
}
