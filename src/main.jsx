import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'aos/dist/aos.css';
import { RouterProvider } from 'react-router'
import { router } from './Router/Router'
import AOS from 'aos';

AOS.init();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='max-w-7xl mx-auto font-urbanist '>
      <RouterProvider router={router}/>
    </div>
  </StrictMode>,
)
