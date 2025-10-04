import { useRef, useState, type FC } from "react";
import { Link } from "react-router-dom";
import logo from '../assets/Netflix-LOGO.png'
import profilePic from '../assets/profile.jpg'
import { Bell, ChevronRight, Menu, Search, X } from "lucide-react";

const NavBar: FC = () => {
    const [isSearchActive, setIsSearchActive] = useState<boolean>(false)
    const [open, setOpen] = useState<boolean>(false)
    const [searchQuery, setSearchQuery] = useState<string>('')
    const mainInputRef = useRef<HTMLInputElement>(null)
    const mobileInputRef = useRef<HTMLInputElement>(null)

    const toggleSearch = (type: string) => {
        if (type === 'mobile') {
            mobileInputRef.current?.focus()
        } else {
            mainInputRef.current?.focus()
        }

        setIsSearchActive(prev => !prev)
    }


    const handleSearch = (event: React.KeyboardEvent) => {

    }
    const toggleMenu = () => setOpen(prev => !prev)
    const closeMenu = () => setOpen(false)
    return (
        <header className="fixed top-0 left-0 right-0 flex flex-col px-5 md:px-10 transition-all duration-300 ease-in-out text-white">
            <div className="flex items-center py-4 justify-between">
                <div className="flex gap-x-6 md:gap-x-8 items-center">
                    <Link to="/">
                        <img src={logo} alt="Logo" className="w-28" />
                    </Link>
                    <nav className=" hidden text-sm lg:flex space-x-4">
                        <Link to="/" className="hover:text-gray-300">Home</Link>
                        <Link to="/" className="hover:text-gray-300">TV Shows</Link>
                        <Link to="/" className="hover:text-gray-300">Movies</Link>
                        <Link to="/" className="hover:text-gray-300">New & Popular</Link>
                        <Link to="/myList" className="hover:text-gray-300">My List</Link>
                        <Link to="/" className="hover:text-gray-300">Browse By Languages</Link>
                    </nav>
                </div>

                <div className="flex items-center space-x-4">
                    <div className={`hidden md:flex relative items-center transition-all duration-300 ${isSearchActive ? 'w-72 p-2' : 'w-auto'}`}>
                        <button className={`${isSearchActive ? 'absolute left-0' : ''}`}
                            aria-label="Toggle Search"
                            onClick={(e) => {
                                e.stopPropagation()
                                toggleSearch('main')
                            }}
                        >
                            {
                                !isSearchActive && <Search size={20} color="white" />
                            }
                        </button>
                        <input

                            ref={mainInputRef}
                            type="text"
                            placeholder="Search"
                            aria-label="Search"
                            className={`absolute left-10 bg-black bg-opacity-75 text-white rounded-md border
                           border-transparent focus:outline-none transition-all duration-300 ${isSearchActive ? 'w-60 p-2 border-white opacity-100' : 'w-0 p-0 opacity-0'
                                }`}

                            onChange={(e) => {
                                setSearchQuery(e.target.value)
                            }}
                            onKeyDown={handleSearch}
                        />

                    </div>
                    <Bell size={20} color='white' />
                    <img src={profilePic} alt="profile picture" className="w-8 h-8 rounded-full cursor-pointer" />
                    <ChevronRight size={20} color="white" />
                    <button
                        onClick={toggleMenu}
                        className="lg:hidden ml-4 focus:outline-none"
                        aria-label="hamburger-menu"
                    >
                        <Menu size={24} color="white" />
                    </button>

                </div>
            </div>
            {/*  Mobile */}

            <div className={`fixed top-0 left-0  w-full h-full bg-black bg-opacity-95 p-8 flex flex-col gap-4 transition-all
                z-40 ${open ? 'translate-y-0' : 'translate-y-full'} lg:hidden`}>
                <button
                    onClick={closeMenu}
                    className="self-end">
                    <X size={24} color='white' />
                </button>
                <nav className="flex flex-col space-y-2 mt-4">
                    <div className={`relative flex transition-all duration-300 ${isSearchActive ? '' : 'w-auto'}`}>
                        <button className={`flex items-center justify-center ${isSearchActive ? 'absolute left-0' : ''}`}
                            aria-label="Toggle Search"
                            onClick={(e) => {
                                e.stopPropagation()
                                toggleSearch('mobile')
                            }}
                        >
                            {
                                !isSearchActive && <Search size={20} color="white" />
                            }
                        </button>
                        <input
                            ref={mobileInputRef}
                            type="text"
                            placeholder="Search"
                            aria-label="Search"
                            className={`bg-black bg-opacity-75 text-white rounded-md border
                           border-transparent focus:outline-none transition-all duration-300 ${isSearchActive ? 'w-60 p-2 border-white opacity-100' : 'w-0 p-0 opacity-0'
                                }`}

                            onChange={(e) => {
                                setSearchQuery(e.target.value)
                            }}
                            onKeyDown={handleSearch}
                        />
                    </div>
                    <Link to="/" className="hover:text-gray-300">Home</Link>
                    <Link to="/" className="hover:text-gray-300">TV Shows</Link>
                    <Link to="/" className="hover:text-gray-300">Movies</Link>
                    <Link to="/" className="hover:text-gray-300">New & Popular</Link>
                    <Link to="/myList" className="hover:text-gray-300">My List</Link>
                    <Link to="/" className="hover:text-gray-300">Browse By Languages</Link>
                </nav>
            </div>
        </header >
    )
}

export default NavBar