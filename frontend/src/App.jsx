import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './pages/PageNotFound';
import { useSelector, useDispatch } from 'react-redux';
import { authRoutes, publicRoutes } from './routes';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const JWTtoken = useSelector((state) => state.auth.JWTtoken);

  return (
    <Router>
      <Routes>
        { publicRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={Component} />
        )) }
        <Route element={<ProtectedRoute />}>
          { authRoutes.map(({ path, Component }) => (
            <Route key={path} path={path} element={Component} />
          )) }
        </Route>
        <Route path='*' element = {<PageNotFound />} />
      </Routes>
    </Router>
  )
}

export default App;
