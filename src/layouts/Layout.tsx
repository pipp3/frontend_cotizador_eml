import { Outlet } from "react-router-dom";
import TransitionLoader from '../components/TransitionLoader';

export default function Layout() {
  return (
    <>
      <TransitionLoader />
      <div>
        <header className="bg-gray-800 text-white p-4">
          <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold">Listador de Productos</h1>
          </div>
         
        </header>
        <main className="conatiner mx-auto p-4 mt-4 max-w-6xl">
          <div className="bg-white p-4 rounded-md shadow-md">
              <Outlet />
          </div>
          
        </main>
      </div>
    </>
  )
}
