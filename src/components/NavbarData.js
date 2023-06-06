import React from 'react'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import * as BsIcons from 'react-icons/bs'
import * as IoIcons from 'react-icons/io'
import * as RiIcons from 'react-icons/ri'
import * as ImIcons from 'react-icons/im'
import * as HiIcons from 'react-icons/hi'
import * as SiIcons from 'react-icons/si'
import * as MdIcons from 'react-icons/md'
import { checkAccess, checkCookies } from '../pages/Helper/Auth'

const NavbarData = [
    {
        title: 'Designation',
        path: '/designation',
        icon: <BsIcons.BsPersonFill></BsIcons.BsPersonFill>,
    },
    {
        title: 'Roles',
        path: '/roles',
        icon: <ImIcons.ImBriefcase></ImIcons.ImBriefcase>,
    },
    {
        title: 'Department',
        path: '/department',
        icon: <RiIcons.RiBuilding2Fill></RiIcons.RiBuilding2Fill>,
    },
    {
        title: 'Document type',
        path: '/documenttype',
        icon: <AiIcons.AiFillHome></AiIcons.AiFillHome>,
    },
    {
        title: 'Companies',
        path: '/companies',
        icon: <FaIcons.FaBuilding></FaIcons.FaBuilding>,
    },
    {
        title: 'Add Data',
        path: '#',
        icon: <AiIcons.AiOutlineDoubleRight></AiIcons.AiOutlineDoubleRight>,
        iconClosed: <RiIcons.RiArrowDownSFill></RiIcons.RiArrowDownSFill>,
        iconOpen: <RiIcons.RiArrowUpSFill></RiIcons.RiArrowUpSFill>,
        subNav: [
            {
                title: 'Countries',
                path: '/Countrystatecity',
                icon: <AiIcons.AiFillForward></AiIcons.AiFillForward>,
            },
            {
                title: 'States',
                path: '/states',
                icon: <AiIcons.AiFillForward></AiIcons.AiFillForward>,
            },
            {
                title: 'Cities',
                path: '/cities',
                icon: <AiIcons.AiFillForward></AiIcons.AiFillForward>,
            },
        ]
    },
    {
        title: 'Level types',
        path: '/leveltype',
        icon: <SiIcons.SiDiagramsdotnet></SiIcons.SiDiagramsdotnet>,
    },
    {
        title: 'Users',
        path: '/users',
        icon: <ImIcons.ImUser></ImIcons.ImUser>,
    },
    {
        title: 'Address',
        path: '/viewAddress',
        icon: <AiIcons.AiFillHome></AiIcons.AiFillHome>,
    },
    {
        title: 'Employees',
        path: '/employees',
        icon: <HiIcons.HiOutlineUserGroup></HiIcons.HiOutlineUserGroup>,
    },
    {
        title: 'Salary',
        path: '/salary',
        icon: <AiIcons.AiFillHome></AiIcons.AiFillHome>,
    },
    {
        title: 'Reporting',
        path: '/reporting',
        icon: <IoIcons.IoIosContacts></IoIcons.IoIosContacts>,
    },
    {
        title: 'Job Openings',
        path: '/viewJobs',
        icon: <MdIcons.MdOutlineScreenSearchDesktop></MdIcons.MdOutlineScreenSearchDesktop>,
    },
    {
        title: 'User Documents',
        path: '/userDocuments',
        icon: <AiIcons.AiFillHome></AiIcons.AiFillHome>,
    },
    {
        title: 'Job Applicants',
        path: '/viewApplicants',
        icon: <BsIcons.BsPeopleFill></BsIcons.BsPeopleFill>,
    },
    {
        title: 'Application Track',
        path: '/viewApplicationTrack',
        icon: <AiIcons.AiFillHome></AiIcons.AiFillHome>,
    },
    {
        title: 'Off Board',
        path: '/offboard',
        icon: <AiIcons.AiFillHome></AiIcons.AiFillHome>,
    },
    {
        title: 'HR Support',
        path: '/hrsupport',
        icon: <AiIcons.AiFillHome></AiIcons.AiFillHome>,
    },
]


export default NavbarData