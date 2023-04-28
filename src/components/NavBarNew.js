import React,{useState} from 'react'
//import { motion } from "framer-motion"
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { NavbarData } from "./NavbarData";
import { IconContext } from "react-icons/lib";

const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "-100%" },
  }
const NavBarNew = () => {
    

   
    const [isOpen, setIsOpen] = useState(false)
    
      return (
        <nav
          animate={isOpen ? "open" : "closed"}
          variants={variants}
        >
          <FaIcons.FaBars onClick={() => setIsOpen(isOpen => !isOpen)} />
          <div>
            item
          </div>
        </nav>
      )
    
}

export default NavBarNew