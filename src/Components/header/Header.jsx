import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { CiMenuFries } from "react-icons/ci";
import './header.css'
const Header = () => {
    const [showDrop, setShowDrop] = useState(false)
    const [showDrops, setShowDrops] = useState(false)
    const [showmenu, setShowmenu] = useState(false)


    const showDropMenu = () => {
        setShowDrop(!showDrop)
        setShowDrops(false)

    }
    const showMenu = () => {
        setShowmenu(!showmenu)
      

    }
    const showDropMenus = () => {
        setShowDrops(!showDrops)
        setShowDrop(false)
    }
    const onHeader = () => {
        setShowDrops(false)
        setShowDrop(false)

    }
    return (
        <div className='w-full'>
            <header className='w-full flex items-center justify-between px-2 py-4 bg-[#FDF6ED]'>
                <div className='logo'>
                    <h3 className='md:text-3xl  italic text-[#ff4500] font-bold'>Daily <span className='text-slate-700'>Games</span></h3>
                </div>
                <div className={`navbar  ${showmenu ? 'show':''}    `}>
                    <nav className='p-1'>
                        <ul className='flex items-center gap-5 justify-center'>
                            <li className='relative nav-links' onClick={showDropMenu}  ><Link>Buy Now</Link>
                                <div className={`${showDrop ? "flex" : "hidden"} drops  rounded-lg `}>
                                    <ul>
                                        <li className='text-sm nav-linkss'><Link>Fortune 5</Link></li>
                                        <li className='text-sm nav-linkss'><Link>Super 6</Link></li>
                                    </ul>
                                </div>
                            </li>
                            <li onMouseEnter={onHeader} className='nav-links'><Link>How To Play</Link></li>
                            <li className='draws-drop nav-links relative' onClick={showDropMenus}><Link>Draws</Link>
                                <div className={`${showDrops ? "flex" : "hidden"} drops rounded-lg `}>
                                    <ul>
                                        <li className='text-sm nav-linkss'><Link>Fortune 5</Link></li>
                                        <li className='text-sm nav-linkss'><Link>Super 6</Link></li>
                                    </ul>
                                </div></li>
                            <li onMouseEnter={onHeader} className='nav-links'><Link>Promotions</Link></li>
                            <li onMouseEnter={onHeader} className='nav-links'><Link>FAQs</Link></li>
                        </ul>
                    </nav>
                </div>

                <div className='lefts'>
                    <ul className='flex items-center gap-5 justify-center'>
                        <li className='font-bold hidden md:block text-orange-700'><Link>Translate</Link></li>
                        <li className='font-bold text-orange-700'><Link>Login</Link></li>
                        <li><Link className='button-cta'>Create Account</Link></li>
                        <li onClick={showMenu}><Link className='text-2xl hidden menus font-extrabold'><CiMenuFries/></Link></li>

                    </ul>
                </div>

            </header>
        </div>
    )
}

export default Header