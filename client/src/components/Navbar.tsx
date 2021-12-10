import logo from "../../images/logo.svg";

export default function Navbar() {
    return (
        <>
            <div className="bg-gradient-to-r from-green via-blue to-red p-0.5"></div>
            <nav className="flex items-center justify-between flex-wrap bg-blue-darkest p-6 lg:p-10 border-blue-darker">
                <div className="flex items-center flex-shrink-0 mr-6">
                    <img class="fill-current h-8 w-8 mr-4" src={logo} alt="logo" />
                </div>
                <div className="flex items-center w-auto text-base font-semibold text-gray flex-grow">
                    <div className="flex items-center ">
                        <a href="/profile" className="inline-block mr-6 hover:text-blue-darker text-blue">Profile</a>
                        <a href="/profile" className="inline-block mr-6 hover:text-blue-darker">Connect</a>
                        <a href="/profile" className="inline-block mr-6 hover:text-blue-darker">Settings</a>
                    </div>
                </div>
            </nav>
        </>
    )
}