import { Outlet, useLoaderData } from "react-router-dom";
import TransitionLoader from '../components/TransitionLoader';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { AuthResponse } from "../types/users";

export default function Layout() {
  const auth = useLoaderData() as AuthResponse;
  
  //console.log("Auth en Layout desde loader:", auth);
  
  return (
    <>
      <TransitionLoader />
      <div className="flex flex-col min-h-screen">
        <Header />
        
        <main className="container mx-auto p-4 mt-4 max-w-6xl flex-grow">
          <div className="bg-white rounded-md shadow-md">
            <Outlet context={auth} />
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  )
}
