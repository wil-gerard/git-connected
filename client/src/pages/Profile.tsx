import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import twitterLogo from "../images/twitter.svg";
import googleLogo from "../images/google.svg";
import facebookLogo from "../images/facebook.svg";

let username = "Bob"

export default function Profile() {
    return (
        <>
            <Navbar />
            <div className="flex-col px-6 md:ml-14 lg:ml-56 container mx-auto text-gray">

                <div className="mb-6">
                    <h1 className="flex items-center text-2xl mb-4 font-bold">Hi, {username}!</h1>
                    <img className="flex h-40 w-40 rounded-full ring-2 ring-gray mb-4" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="g2k logo" />
                </div>

                <div className="mb-6">
                    <h2 className="font-bold text-lg mb-2">About</h2>
                    <textarea name="" id="" className="form-textarea text-black w-80" placeholder="All about you..." />
                </div>

                <div className="mb-12">
                    <h2 className="font-bold text-lg mb-2">Connect Socials</h2>
                    <div>
                        <img src={twitterLogo} className="mb-4" alt="twitter logo" />
                        <img src={googleLogo} className="mb-4" alt="google logo" />
                        <img src={facebookLogo} className="mb-4" alt="facebook logo" />
                    </div>
                </div>

            </div>
            <Footer />
        </>
    )
}
