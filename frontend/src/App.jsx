import { Route, Routes } from 'react-router';

import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import NoteDetailPage from './pages/NoteDetailPage';



import  "./index.css"

const App = () => {
  return (
    <>
      <div data-theme='forest'>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>
        {/* <button className='btn'>Button</button>
        <button className='btn btn-neutral'>Neutral</button>
        <button className='btn btn-primary'>Primary</button>
        <button className='btn btn-secondary'>Secondary</button>
        <button className='btn btn-accent'>Accent</button>
        <button className='btn btn-ghost'>Ghost</button>
        <button className='btn btn-link'>Link</button> */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/note/:id" element={<NoteDetailPage />} />
        </Routes>
      </div>
    </>
    
  )
}

export default App