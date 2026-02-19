import { useState } from 'react'
import Navbar from './components/Navbar'
import LoginPage from './components/HomeProduct'
import Home from './pages/Home'
import Manager from './pages/Manager'
import { Routes, Route } from 'react-router-dom'

function App() {
  const [searchBar, setSearchBar] = useState('')

  return (
    <>
    <div className="relative min-h-screen min-w-screen bg-gray-100 font-sans overflow-hidden">
      <div className="min-h-screen min-w-screen bg-gray-200 font-sans">

        <Navbar search={searchBar} setSearch={setSearchBar}/>

        <main className="container mx-auto p-4 md:p-4">
          
          <Routes>
            <Route path='/' element={<Home search={searchBar} />} />
            <Route path='/manager' element={<Manager/>} />
          </Routes>

        </main>
      </div>
    </div>
    </>
  )
}

export default App
