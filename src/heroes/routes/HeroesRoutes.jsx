import { Navigate, Route, Routes } from 'react-router-dom'

import { DcPage, HeroPage, MarvelPage, SearchHeroPage } from '../pages'
import { Navbar } from '../../partials'

export const HeroesRoutes = () => {
  return (
    <>
      <Navbar />

        <div className='container'>
            <Routes>
                <Route path="marvel"  element={<MarvelPage />} />  
                <Route path="dc"  element={<DcPage />} />

                <Route path="search"  element={<SearchHeroPage />} />
                <Route path="hero/:id"  element={<HeroPage />} />

                <Route path="/" element={<Navigate to="/marvel" /> } /> 
            </Routes> 
        </div>
    </>
  )
}
