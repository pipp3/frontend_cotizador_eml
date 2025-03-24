import { Outlet } from "react-router-dom";
import TransitionLoader from '../components/TransitionLoader';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Layout() {
  return (
    <>
      <TransitionLoader />
      <div className="flex flex-col min-h-screen">
        <Header />
        
        <main className="container mx-auto p-4 mt-4 max-w-6xl flex-grow">
          <div className="bg-white p-4 rounded-md shadow-md">
            <Outlet />
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  )
}
