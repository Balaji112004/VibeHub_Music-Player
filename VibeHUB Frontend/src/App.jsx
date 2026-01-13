import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Liked from "./components/Liked";
import Song from "./components/Song"
import Login from "./components/Login";
import Signup from "./components/Signup";
function App() {

  return (
    <BrowserRouter>
      <Routes>

        {/* Layout Route */}
        <Route path="/" element={<Nav />}>
          
          {/* Default page under Nav */}
          <Route index element={<Home />} />

          {/* Other pages */}
          <Route path="songs" element={<Song />}/>
          <Route path="liked" element={<Liked />} />
          <Route path="login" element={<Login/>} />
          <Route path="signup" element={<Signup/>}/>
          
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
