import { Outlet } from "react-router-dom";
import SideBar from "../../Components/SideBar";
import TopBar from "../../Components/TopBar";

export default function Home() {
    return (
        <div className="dash">
            <header className="topbar-container" >
                <TopBar />
            </header>
            <section className="section">
                <aside className="sidebar-container">
                    <SideBar />
                </aside>
                <main className="main">
                    <Outlet />
                </main>
            </section>
        </div>
    )
}
