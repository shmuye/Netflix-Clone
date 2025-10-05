import type { FC } from "react"
import Home from "./pages/Home"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Watch from "./pages/Watch"
import MyList from "./pages/MyList"
import Search from "./pages/Search"
import NotFound from "./pages/NotFound"
import NavBar from "./components/NavBar"
import { MovieProvider } from "./context/MovieContext"

const App: FC = () => {
  return (
    <MovieProvider>
      <Router>
        <MainContent />
      </Router>
    </MovieProvider>

  )
}

export default App

const MainContent: FC = () => (
  <>
    <NavBar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/watch" element={<Watch />} />
      <Route path="/myList" element={<MyList />} />
      <Route path="/search" element={<Search />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </>
)