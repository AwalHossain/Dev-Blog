import Posts from "../posts/Posts";
import Sidebar from "../sidebar/Sidebar";

export default function Main() {
    return (
        <section className="wrapper">
            <Sidebar />
            <Posts />
        </section>
    )
}
