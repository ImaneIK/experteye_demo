import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import VehicleManagment from "./pages/Vehicle_management";

function App() {
  // State to toggle sidebar visibility for mobile view
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Toggle sidebar function
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <div className="max-w-[100vw] h-[100vh] bg-gray-50 flex  ">
        {/* responsive sidebar */}
        <div
          className={`h-[100vh] transition-all duration-300  flex flex-col justify-between bg-blue-600 text-gray-200  ${
            isSidebarOpen ? "block w-[60vw] fixed z-50 " : "opacity-0 w-0 "
          } md:w-[40vh] md:fixed md:z-50 rounded-r-2xl md:opacity-100`}
        >
          <div>
            <button
              onClick={toggleSidebar}
              className="p-4 text-white-600 md:hidden focus:outline-none"
            >
              {isSidebarOpen ? "Close Sidebar" : "Open Sidebar"}
            </button>
            <h1 className="mt-10 ml-10 text-3xl font-bold">experteye</h1>

            <nav>
              <ul className="mt-20 ">
                <li className="relative flex cursor-pointer space-x-2 rounded-md py-4 px-10 text-gray-200 hover:bg-blue-600">
                  <Link to="/">Dashboard</Link>
                </li>

                <li className="relative flex cursor-pointer space-x-2 rounded-md py-4 px-10 text-gray-200 hover:bg-blue-600">
                  <Link to="/vehicles">Vehicle management</Link>
                </li>
              </ul>
            </nav>
          </div>

          <div className="my-6 mt-auto ml-10 flex cursor-pointer">
            <div>
              <img
                alt=""
                className="h-12 w-12 rounded-full"
                src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              />
            </div>
            <div className="ml-3">
              <p className="font-medium">Imane Khayati</p>
              <p className="text-sm text-gray-300"></p>
            </div>
          </div>
        </div>

        
        
        {/* content */}
        <div className="md:ml-[45vh]">
          {/* toggle button for mobile view */}
          <button
            onClick={toggleSidebar}
            className="p-4 text-blue-600 md:hidden focus:outline-none"
          >
            {isSidebarOpen ? "Close Sidebar" : "Open Sidebar"}
          </button>
          <Routes>
            <Route path="/" element={<Dashboard />} />{" "}
            <Route path="/vehicles" element={<VehicleManagment />} />{" "}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
