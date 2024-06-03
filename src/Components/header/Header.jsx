import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { CiMenuFries } from "react-icons/ci";
import './header.css'
const Header = () => {
    const [showDrop, setShowDrop] = useState(false)
    const [showDrops, setShowDrops] = useState(false)
    const [showmenu, setShowmenu] = useState(false)
    const token = sessionStorage.getItem('token')

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
                <Link to="/" className='logo'>
                    <h3 className='md:text-3xl  italic text-[#ff4500] font-bold'>Jackpot <span className='text-slate-700'>Lamp</span></h3>
                </Link>
                <div className={`navbar  ${showmenu ? 'show' : ''}    `}>
                    <nav className='p-1'>
                        <ul className='flex items-center gap-5 justify-center'>
                            <li className='relative nav-links' onClick={showDropMenu}  ><Link to={'/Games'}>Buy Now ⬇️</Link>
                                {/* <div className={`${showDrop ? "flex" : "hidden"} drops  rounded-lg `}>
                                    <ul>
                                        <li className='text-sm nav-linkss'><Link>Fortune 5</Link>  </li>
                                        <li className='text-sm nav-linkss'><Link>Super 6</Link></li>
                                    </ul>
                                </div> */}
                            </li>
                            <li onMouseEnter={onHeader} className='nav-links'><Link to={'/How-To-Play'}>How To Play</Link></li>
                            <li className='draws-drop nav-links relative' onClick={showDropMenus}><Link to={'/Draws'}>Draws ⬇️ </Link>
                                {/* <div className={`${showDrops ? "flex" : "hidden"} drops rounded-lg `}>
                                    <ul>
                                        <li className='text-sm nav-linkss'><Link>Fortune 5</Link></li>
                                        <li className='text-sm nav-linkss'><Link>Super 6</Link></li>
                                    </ul>
                                </div> */}
                                </li>
                            <li onMouseEnter={onHeader} className='nav-links'><Link>Promotions</Link></li>
                            <li onMouseEnter={onHeader} className='nav-links'><Link to={'/FAQs'}>FAQs</Link></li>
                        </ul>
                    </nav>
                </div>

                <div className='lefts'>
                    <ul className='flex items-center gap-5 justify-center'>
                        <li className='font-bold hidden md:block text-orange-700'><Link to={'/Cart'}><i class="ri-shopping-cart-2-fill"></i></Link></li>
                        <li className='font-bold text-orange-700'> {token ? (<Link onClick={() => {
                            sessionStorage.clear();
                             window.location.reload();
                        }} >Logout</Link>) : (<Link to={'/login'}>Login</Link>)} </li>
                        <li><Link to="/Register" className='button-cta'>{token ? (<Link to={'/Profile'}>Profile</Link>) : (<Link to={'/Register'}>Create Account</Link>)}</Link></li>
                        <li onClick={showMenu}><Link className='text-2xl hidden menus font-extrabold'><CiMenuFries /></Link></li>

                    </ul>
                </div>

            </header>
        </div>
    )
}

export default Header