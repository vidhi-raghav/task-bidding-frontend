import logo from "./logo.svg";
import "./App.css";
import JobForm from "./components/JobForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RecentJobPostings from "./components/RecentJobPostings";
import BidForm from "./components/BidForm";
import TopJobs from "./components/TopJobs";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/add-job" Component={JobForm} exact />
          <Route path="/recent-jobs" Component={RecentJobPostings} exact />
          <Route path="/place-bid" Component={BidForm} exact />
          <Route path="/jobs/top-active" Component={TopJobs} exact />

        
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
