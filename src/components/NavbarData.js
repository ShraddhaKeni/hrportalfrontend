import React from 'react'
// import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import * as IoIcons from 'react-icons/io'
import * as RiIcons from 'react-icons/ri'

export const NavbarData = [
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
        title: 'Test',
        path: '/test',
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
    {
        title: 'Level types',
        path: '/leveltype',
        icon: <AiIcons.AiFillHome></AiIcons.AiFillHome>,
    },
    {
        title: 'Users',
        path: '/users',
        icon: <AiIcons.AiFillHome></AiIcons.AiFillHome>,
    },
    {
        title: 'Address',
        path: '/viewAddress',
        icon: <AiIcons.AiFillHome></AiIcons.AiFillHome>,
    },
    {
        title: 'Employees',
        path: '/employees',
        icon: <AiIcons.AiFillHome></AiIcons.AiFillHome>,
    },
    {
        title: 'Salary',
        path: '/salary',
        icon: <AiIcons.AiFillHome></AiIcons.AiFillHome>,
    },
    {
        title: 'Reporting',
        path: '/reporting',
        icon: <AiIcons.AiFillHome></AiIcons.AiFillHome>,
    },
    {
        title: 'Jobs',
        path: '/viewJobs',
        icon: <AiIcons.AiFillHome></AiIcons.AiFillHome>,
    },
    {
        title: 'User Documents',
        path: '/userDocuments',
        icon: <AiIcons.AiFillHome></AiIcons.AiFillHome>,
    },
    {
        title: 'Job Applicants',
        path: '/viewApplicants',
        icon: <AiIcons.AiFillHome></AiIcons.AiFillHome>,
    },
    {
        title: 'Applicantion Track',
        path: '/viewApplicationTrack',
        icon: <AiIcons.AiFillHome></AiIcons.AiFillHome>,
    },
]