import { GradientBar } from "./GradiantBar"

export default function Footer() {
    return (
        <footer className="pt-10">
            <div className="container mx-auto px-6">
                <div className="mt-8 mb-16 sm:mt-0 sm:w-full sm:px-8 lg:px-52 flex flex-col md:flex-row justify-between">
                    <div className="flex flex-col">
                        <span className="font-bold text-gray-300 uppercase mb-2">Content</span>
                        <span className="my-2"><a href="/" className="text-gray-300 text-md hover:text-primary-500 transition duration-300">Profiles</a></span>
                        <span className="my-2"><a href="/featured" className="text-gray-300 text-md hover:text-primary-500 transition duration-300">Featured Profile</a></span>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bold text-gray-300 uppercase mt-4 md:mt-0 mb-2">100devs</span>
                        <span className="my-2"><a href="https://leonnoel.com/100devs/" target="_blank" rel="noreferrer noopener" className="text-gray-300 text-md hover:text-primary-500 transition duration-300">Info</a></span>
                        <span className="my-2"><a href="https://leonnoel.com/discord" target="_blank" rel="noreferrer noopener" className="text-gray-300 text-md hover:text-primary-500 transition duration-300">Discord</a></span>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bold text-gray-300 uppercase mt-4 md:mt-0 mb-2">Contact</span>
                        <span className="my-2"><a href="https://github.com/wil-gerard/GitConnected" target="_blank" rel="noreferrer noopener" className="text-gray-300 text-md hover:text-primary-500 transition duration-300">Project Repo</a></span>
                        <span className="my-2"><a href="https://www.wilgerard.com/" target="_blank" rel="noreferrer noopener" className="text-gray-300 text-md hover:text-primary-500 transition duration-300">Lead Developer</a></span>
                    </div>
                </div>
            </div>
            <GradientBar />
        </footer>
    )
}
