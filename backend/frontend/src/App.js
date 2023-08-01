import "./App.css";
import Login from "./screens/login/login";
import Register from "./screens/Register/Register";
import "./bootstrap.min (1).css"
import "./bootstrap.min.css"
import Home from "./components/HomePage/Home.js";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import MyList from "./components/ViewLists/ListsPage.js";
import Element from "./components/ListElement/listele";
import Protected from "./components/protected/Protected";
import Roadmap from "./components/roadmap/roadmap";
import Footer from "./components/footer/footer";
import Problems from "./components/Problems/problems";
import Landing from "./components/Landing/landing";
import Profile from "./components/profile/profile";
import Notfound from "./components/Notfound/Notfound";
// import Problems from "./components/allproblems/problems";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <main>
          <div className="App">
            <header className="App-header"></header>
          </div>
          <Routes>
            {/* <Route path="/home" element={<div>fjrnbfenfie</div>}></Route> */}
            {/* <Route exact path='/login' element={<Login />}></Route> */}
            <Route exact path="/" element={<Landing />}></Route>
            <Route exact path="/problems" element={<Problems />}></Route>
            <Route exact path="/home" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route exact path="/profile" element={<Profile />}></Route>
            <Route exact path="/register" element={<Register />}></Route>
            <Route exact path="/mylists" element={<Protected component={MyList} />}></Route>
            <Route exact path="/roadmap" element={<Roadmap></Roadmap>}></Route>
            <Route path='*' element={<Notfound></Notfound>}></Route>
          </Routes>
        </main>
      </BrowserRouter>
      <Footer />
    </>
  );
}
