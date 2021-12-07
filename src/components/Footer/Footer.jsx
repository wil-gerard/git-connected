export default function Footer() {
    return (
        <footer className="text-blue pt-1 border-b-2 border-blue pt-6">
            <div className="container mx-auto px-6">
                <div className="mt-8 sm:mt-0 sm:w-full sm:px-8 lg:px-52 flex flex-col md:flex-row justify-between">
                    <div class="flex flex-col">
                        <span class="font-bold text-gray uppercase mb-2">Content</span>
                        <span class="my-2"><a href="#" class="text-gray text-md hover:text-blue-darker">Profile</a></span>
                        <span class="my-2"><a href="#" class="text-gray text-md hover:text-blue-darker">Connect</a></span>
                        <span class="my-2"><a href="#" class="text-gray text-md hover:text-blue-darker">Settings</a></span>
                    </div>
                    <div class="flex flex-col">
                        <span class="font-bold text-gray uppercase mt-4 md:mt-0 mb-2">Community</span>
                        <span class="my-2"><a href="#" class="text-gray text-md hover:text-blue-darker">Twitter</a></span>
                        <span class="my-2"><a href="#" class="text-gray text-md hover:text-blue-darker">GitHub</a></span>
                        <span class="my-2"><a href="#" class="text-gray text-md hover:text-blue-darker">LinkedIn</a></span>
                    </div>
                    <div class="flex flex-col">
                        <span class="font-bold text-gray uppercase mt-4 md:mt-0 mb-2">Contact</span>
                        <span class="my-2"><a href="#" class="text-gray text-md hover:text-blue-darker">Ken AKA Frosty</a></span>
                        <span class="my-2"><a href="#" class="text-gray text-md hover:text-blue-darker">Wil Gerard</a></span>
                        <span class="my-2"><a href="#" class="text-gray text-md hover:text-blue-darker">link 1</a></span>
                    </div>
                </div>
            </div>
            <div class="container mx-auto px-6">
                <div class="mt-16 border-t-2 border-blue flex flex-col items-center">
                    <div class="sm:w-2/3 text-center py-6">
                        <p class="text-sm text-blue font-bold mb-2">
                            © 2021 G2K
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}
