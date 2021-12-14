import { GradientBar } from "./GradiantBar"

export default function Footer() {
    return (
        <footer className="pt-10">
            <div className="container mx-auto px-6">
                <div className="mt-8 sm:mt-0 sm:w-full sm:px-8 lg:px-52 flex flex-col md:flex-row justify-between">
                    <div className="flex flex-col">
                        <span className="font-bold text-gray-300 uppercase mb-2">Content</span>
                        <span className="my-2"><a href="/" className="text-gray-300 text-md hover:text-primary-500 transition duration-300">Profile</a></span>
                        <span className="my-2"><a href="/" className="text-gray-300 text-md hover:text-primary-500 transition duration-300">Connect</a></span>
                        <span className="my-2"><a href="/" className="text-gray-300 text-md hover:text-primary-500 transition duration-300">Home</a></span>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bold text-gray-300 uppercase mt-4 md:mt-0 mb-2">Community</span>
                        <span className="my-2"><a href="/" className="text-gray-300 text-md hover:text-primary-500 transition duration-300">Twitter</a></span>
                        <span className="my-2"><a href="/" className="text-gray-300 text-md hover:text-primary-500 transition duration-300">GitHub</a></span>
                        <span className="my-2"><a href="/" className="text-gray-300 text-md hover:text-primary-500 transition duration-300">LinkedIn</a></span>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bold text-gray-300 uppercase mt-4 md:mt-0 mb-2">Contact</span>
                        <span className="my-2"><a href="/" className="text-gray-300 text-md hover:text-primary-500 transition duration-300">Ken AKA Frosty</a></span>
                        <span className="my-2"><a href="/" className="text-gray-300 text-md hover:text-primary-500 transition duration-300">Wil Gerard</a></span>
                        <span className="my-2"><a href="/" className="text-gray-300 text-md hover:text-primary-500 transition duration-300">link 1</a></span>
                    </div>
                </div>
            </div>
            <div className="container mx-auto px-6">
                <div className="mt-16 border-t-2 border-blue flex flex-col items-center">
                    <div className="sm:w-2/3 text-center py-6">
                        <p className="text-sm text-gray-500 font-bold mb-2">
                            © 2021 G2K
                        </p>
                    </div>
                </div>
            </div>
            <GradientBar />
        </footer>
        
    )
}
