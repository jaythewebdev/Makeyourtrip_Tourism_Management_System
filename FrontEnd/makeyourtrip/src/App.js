import logo from "./logo.svg";
import "./App.css";
import LandingPage from "./Components/LandingPage/LandingPage";
import Login from "./Components/Login/Login";
import Maps from "./Maps/Maps";
import TourDestinationForm from "./Components/dummy";
import SearchPage from "./Components/SearchPage/SearchPage";
import ProductList from "./Components/SearchAndFilters";
import OnlySearch from "./Components/OnlySearch";
import TourPage from "./Components/TourPage/TourPage";
import BookingPage from "./Components/BookingPage/BookingPage";
import OTPVerification from "./Components/OTPVerification/OTPVerification";
import ProfilePage from "./Components/BasicCard/ProfilePage/ProfilePage";
import BookingTable from "./Components/BasicCard/Tables/BookingTable";
import { BrowserRouter } from "react-router-dom";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import BookingConfirm from "./Components/BookingConfirmPage/BookingConfirm";
import TourPackage from "./Components/Package/TourPackage";
import AgentProfilePage from "./Components/BasicCard/ProfilePage/AgentProfile";
import AdminProfilePage from "./Components/BasicCard/ProfilePage/AdminProfile";
import AgentProfile from "./Components/BasicCard/ProfilePage/AgentProfile";
import ApproveAgent from "./Components/ApproveAgents/ApproveAgents";
import AdminGallery from "./Components/AdminGallery/AdminGallery";
import Contact from "./Components/Contact/Contact";
import FeedBackForm from "./Components/Feedback/Feedback";
import AgentImageUpload from "./Components/AgentImageUpload/AgentImageUpload";
import { ToastContainer } from "react-toastify";
import ProtectedRoutes from "./Components/ProtectedRoutes/ProtectedRoutes";
import Page404 from "./Components/PageNotFound/Page404";
import AgentDestination from "./Components/AgentDestination/AgentDestination";
import TripPackage from "./Components/Package/TripPackage";
import TravellerDetails from "./Components/AdminUsers/AdminUsers";
import AgentTours from "./Components/AgentTours/AgentTours";
import AdminUploadedImages from "./Components/AdminUploadedImages/AdminUploadedImages";

function App() {
  return (
    <div>
      <BrowserRouter>
        <ToastContainer />

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/searchPage" element={<SearchPage />} />
          <Route path="/about" element={<Contact />} />
          <Route path="/tourpage" element={<TourPage />} />
          <Route path="/page404" element={<Page404/>}/>

          <Route element={<ProtectedRoutes allowedRoles={["Traveller"]} />}>
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/tourpage/bookingpage" element={<BookingPage />} />
            <Route
              path="/tourpage/bookingpage/ticket"
              element={<BookingConfirm />}
            />
            <Route path="/Feedback" element={<FeedBackForm />} />
          </Route>

          <Route element={<ProtectedRoutes allowedRoles={["Admin"]} />}>
            <Route path="/AdminProfile" element={<AdminProfilePage />} />
            <Route path="/ApproveAgents" element={<ApproveAgent />} />
            <Route path="/AdminGallery" element={<AdminGallery />} />
            <Route path="/TravellerDetails" element={<TravellerDetails />} />
            <Route path="/AdminUploadedImages" element={<AdminUploadedImages />} />         
          </Route>

          <Route element={<ProtectedRoutes allowedRoles={["TravelAgent"]} />}>
            <Route path="/AddTours" element={<TripPackage />} />
            <Route path="/AgentProfile" element={<AgentProfile />} />
            <Route path="/AgentImageUpload" element={<AgentImageUpload />} />
            <Route path="/AgentDestination" element={<AgentDestination />} />
            <Route path="/AgentTours" element={<AgentTours/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
