import {useSelector} from "react-redux";
import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import Dashboard from "./pages/Dashboard.jsx";
import Itinerary from "./pages/Itinerary.jsx";
import Login from "./pages/Login";
import People from "./pages/People.jsx";
import Trash from "./pages/Trash.jsx";
import TripDetails from "./pages/TripDetails.jsx";
import Trips from "./pages/Trips.jsx";

function Layout(){
  const {user} = useSelector((state)=> state.auth);

  const location = useLocation()
  
  return user ? (
    <div className='w-full h-screen flex flex-col md:flex-row'>
      <div className='w-1/5 h-screen bg-white sticky top-0 hidden md:block'>
        {/* <Sidebar/> */}
      </div>

      {/*<MobileSidebar/>*/}

      <div className="flex-1 overflow-y-auto">
        {/* <Navbar/> */}
        <div className="p=4 2xl:px-10">
          <Outlet/>
        </div>
      </div>
    </div>
  ): (
    <Navigate to ="/log-in" state={{from: location}} replace/>
  )
}

/*Might have to either create a new route for checklist or attach checklist and itinerary to trips*/
function App() {
  return (
    <main className="w-full min-h-screen bg-[#f3f4f6]">
      <Routes>
        <Route element={<Layout/>}>
          <Route path='/' element={<Navigate to='/dashboard'/>}/>
          <Route path='/dashboard' element={<Dashboard />}/>
          <Route path='/trips' element={<Trips />}/>
          <Route path='/completed/:staus' element={<Trips />}/>
          <Route path='/itinerary' element={<Itinerary />}/>
          <Route path='/people' element={<People />}/>
          <Route path='/trashed' element={<Trash />}/>
          <Route path='/trip/:id' element={<TripDetails />}/>
        </Route>
        <Route path='/log-in' element={<Login />}/>
      </Routes>

      <Toaster richColors />
    </main>
  );
}

export default App
