import Link from 'next/link';

export default function Footer() {
    return (
        <div className=" py-2 mt-10 flex items-center justify-center shadow-lg">
            <div className="container mx-auto px-8">
                <div className="w-full flex flex-col md:flex-row py-6">
                    <div className="flex-1 mb-6 text-gray-600 text-sm text-center md:text-left">
                        <a href="/" className="text-gray-500 no-underline hover:underline">© 2024 Media App</a>
                    </div>
                    <div className="flex-1 text-gray-700 text-center md:text-right">
                        <a href="https://github.com/manyports" target="_blank" className="text-gray-500 no-underline hover:underline">Made with love by Yera</a>
                    </div>
                </div>
            </div>
        </div>
    );
}