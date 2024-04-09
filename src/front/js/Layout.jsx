import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import injectContext from "./store/appContext.js";
// Import custom component
import ScrollToTop from "./component/scrollToTop.js";
import { BackendURL } from "./component/BackendURL.jsx";
import { MyNavbar } from "./component/Navbar.jsx";
import { Footer } from "./component/Footer.jsx";
// Import custom pages
import { ConfirmationSignUp } from "./pages/ConfirmationSignUp.jsx";
import { InvalidToken } from "./pages/InvalidToken.jsx";
import { CreateClass } from "./pages/CreateClass.jsx";
import { SessionEnd } from "./pages/SessionEnd.jsx";
import Homepage from "./pages/Homepage.jsx";
import TrainerProfile from "./pages/TrainerProfile.jsx";
import { AddTrainerSpecialization } from "./pages/AddTrainerSpecialization.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import Signup from "./pages/Signup.jsx";
import { Cart } from "./pages/Cart.jsx";
import { TrainerClasses } from "./pages/TrainerClasses.jsx";
import { UserClasses } from "./pages/UserClasses.jsx";
import TrainerHomepage from "./component/TrainerHomepage.jsx";
import SignupUser from "./component/SignupUser.jsx";
import SignupTrainer from "./component/SignupTrainer.jsx";


// Create your first component
const Layout = () => {
    // The basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";
    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <MyNavbar />
                    <Routes>
                        <Route element={<CreateClass />} path="/trainers/:trainerId/create/class" />
                        <Route element={<ConfirmationSignUp />} path="/confirmation" />
                        <Route element={<SessionEnd />} path="/end/session" />
                        <Route element={<InvalidToken />} path="/invalid" />
                        <Route element={<Homepage />} path='/' />
                        <Route element={<AddTrainerSpecialization />} path='/trainer/:trainerId/add/specialization' />
                        <Route element={<TrainerProfile />} path='/trainer/:id/profile' />
                        <Route element={<UserProfile />} path='/user/:id/profile' />
                        <Route element={<Signup />} path='/signup' />
                        <Route element={<SignupUser />} path='/signupUser' />
                        <Route element={<SignupTrainer />} path='/signupTrainer' />
                        <Route element={<Cart />} path='/cart' />
                        <Route element={<TrainerClasses />} path='/trainer/:id/classes' />
                        <Route element={<UserClasses />} path='/user/:id/classes' />
                        <Route element={<TrainerHomepage />} path='/trainer/homepage' />
                        <Route element={<h1>Not found!</h1>} path="*" />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
