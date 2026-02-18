import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Dashboard from './Pages/Dashboard'
import Upload from './Pages/Upload'
import Balltracking from './Components/Analysing/Balltracking'
import { useState } from 'react'
import UltraEdge from './Components/Analysing/UltraEdge'
import PitchMap from './Components/Analysing/PitchMap'
import Login from './Pages/Login'
import {Toaster} from 'react-hot-toast'

const App = () => {

  const [videoUrl, setVideoUrl] = useState(null);

  return (
    <div className="bg-zinc-950 min-h-screen w-full ">
      <Toaster />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/upload' element={<Upload onVideoSelect={setVideoUrl}/>} />
          <Route path='/dashboard' element={<Dashboard  videoUrl={videoUrl}/>} />
          <Route path='/balltracking' element={<Balltracking  videoUrl={videoUrl}/>} />
          <Route path='/ultraedge' element={<UltraEdge  videoUrl={videoUrl}/>} />
          <Route path='/pitchmap' element={<PitchMap  videoUrl={videoUrl}/>} />
          
          

        </Routes>
    
    </div>
  )
}

export default App

