import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import twitterLogo from "../../images/twitter.svg";
import googleLogo from "../../images/google.svg";
import facebookLogo from "../../images/facebook.svg";

let username = "Bob"

export default function Profile() {
    return (
        <>
            <Navbar />
            <div className="flex-col ml-14">
                <div className="flex items-center text-2xl mb-4 font-bold">Hi, {username}!</div>
                <img className="flex h-40 w-40 rounded-full ring-2 ring-gray mb-4" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
                <div className="px-6 py-4">
                    <div className="font-bold text-lg mb-2">About</div>

                </div>
            </div>
            <Footer />
        </>
    )
}
