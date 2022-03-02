import React from 'react'
// import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import * as IoIcons from 'react-icons/io'
import * as RiIcons from 'react-icons/ri'

export const NavbarData = [
    // {
    //     title: 'Employee',
    //     path: '/employee',
    //     icon: <AiIcons.AiFillHome></AiIcons.AiFillHome>,
    //     iconClosed: <RiIcons.RiArrowDownSFill></RiIcons.RiArrowDownSFill>,
    //     iconOpen: <RiIcons.RiArrowUpSFill></RiIcons.RiArrowUpSFill>,
    //     subNav: [
    //         {
    //             title: 'Add employee',
    //             path: '/employee/addemployee',
    //             icon: <IoIcons.IoIosPaper></IoIcons.IoIosPaper>,
    //         },
    //     ]
    // },
    {
        title: 'Designation',
        path: '/designation',
        icon: <AiIcons.AiFillHome></AiIcons.AiFillHome>,
    },
    {
        title: 'Roles',
        path: '/roles',
        icon: <AiIcons.AiFillHome></AiIcons.AiFillHome>,
    },
    {
        title: 'Department',
        path: '/department',
        icon: <AiIcons.AiFillHome></AiIcons.AiFillHome>,
    },
    {
        title: 'Document type',
        path: '/documenttype',
        icon: <AiIcons.AiFillHome></AiIcons.AiFillHome>,
    },
    {
        title: 'Companies',
        path: '/companies',
        icon: <AiIcons.AiFillHome></AiIcons.AiFillHome>,
    },
    {
        title: 'Add Data',
        path: '',
        icon: <AiIcons.AiFillHome></AiIcons.AiFillHome>,
        iconClosed: <RiIcons.RiArrowDownSFill></RiIcons.RiArrowDownSFill>,
        iconOpen: <RiIcons.RiArrowUpSFill></RiIcons.RiArrowUpSFill>,
        subNav: [
            {
                title: 'Countries',
                path: '/countries',
                icon: <IoIcons.IoIosPaper></IoIcons.IoIosPaper>,
            },
            {
                title: 'States',
                path: '/states',
                icon: <IoIcons.IoIosPaper></IoIcons.IoIosPaper>,
            },
            {
                title: 'Cities',
                path: '/cities',
                icon: <IoIcons.IoIosPaper></IoIcons.IoIosPaper>,
            },
        ]
    },
]