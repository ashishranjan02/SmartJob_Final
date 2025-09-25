import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PublicRouter from './routes/PublicRoutes';
import Home from '../page/public/Home';
import Companies from '../page/public/Companies';
import Career from '../page/public/FeaturedCompanies';
import Employ from "../page/public/Auth/EmployLogin.jsx";
import Services from '../page/public/Services';
import Job from "../page/public/Job";
import Contact from "../page/public/Contact";
import About from "../page/public/About";
import Candidate from "../page/public/Auth/CandidateLogin.jsx";
import CandidateRegister from "../page/public/Auth/CandidateRegister.jsx";
import ProfilePage from "../page/public/ProfilePage";
const routers = createBrowserRouter([
    {
        path: "/",
        element: <PublicRouter />,
        children: [
            {
                path: "",
                index: true,
                element: <Home />
            },
            {
                path: "/job",
                element: <Job />
            },
            {
                path: "/companies",
                element: <Companies />
            },
            {
                path: "/service",
                element: <Services />
            },
            {
                path: "/career",
                element: <Career />
            },
            {
                path: "/login",
                element: <Employ />
            },
            {
                path: "/candidate-login",
                element: <Candidate />
            },
            {
                path: "/services",
                element: <Services />
            },
            {
                path: "/contact",
                element: <Contact />
            },
            {
                path: "/about",
                element: <About />
            },
            {
                path: "/candidate-register",
                element: <CandidateRegister />
            },
            {
                path: "/profile",
                element: <ProfilePage />
            }
        ],
    },

]);

export default function MainRouter() {
    return <RouterProvider router={routers} />;
}