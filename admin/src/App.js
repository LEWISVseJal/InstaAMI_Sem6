import "./App.css"
import { useSelector } from 'react-redux';
import Auth from "./pages/Auth/Auth";
import Home from "./pages/home/Home";
import User from "./pages/user/user";
import Admin from "./pages/admin/admin";
import Post from "./pages/post/post";
import Settings from "./pages/setting/setting";
import {Routes,Route,Navigate} from 'react-router-dom'
import Analytics from "./pages/analytics/Analytics";

function App() {
  const user =useSelector((state) => state.authReducer.authData)
  return (
    <div className="App">
      <Routes>
        <Route
          path='/'
          element={user ? <Navigate to="home" /> : <Navigate to='auth' />}
        />
        <Route
          path='/home'
          element={user ? <Home /> : <Navigate to='../auth' />}
        />
        <Route
          path='/auth'
          element={user ? <Navigate to='../home' /> : <Auth />}
        />
        <Route
          path='/user'
          element={user ? <User /> : <Navigate to='../auth' />}
        />
        <Route
          path='/admin'
          element={user ? <Admin /> : <Navigate to='../auth' />}
        />
        <Route
          path='/post'
          element={user ? <Post /> : <Navigate to='../auth' />}
        />
        <Route
          path='/setting'
          element={user ? <Settings /> : <Navigate to='../auth' />}
        />
        <Route
          path='/analytics'
          element={user ? <Analytics /> : <Navigate to='../auth' />}
        />
      </Routes>
    </div>
  );
}

export default App;
