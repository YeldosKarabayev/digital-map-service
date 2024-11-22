import { Outlet } from "react-router"
import Header from "./Header"

const DashLayout = () => {
  return (
    <>
        <Header />
        <div className="white-800">
            <Outlet />
        </div>
    </>
  )
}

export default DashLayout