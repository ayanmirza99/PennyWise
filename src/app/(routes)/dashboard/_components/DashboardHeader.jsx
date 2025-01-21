import { UserButton } from '@clerk/nextjs'
import { Menu } from 'lucide-react'
import React from 'react'

const DashboardHeader = ({ expand, setExpand, mobileScreen }) => {
    return (
        <section className='w-full flex p-5 items-center justify-between border-b shadow-md'>
            <div className='flex items-center gap-4 z-40 text-xl lg:text-3xl text-primary font-bold'>
                {mobileScreen && (<Menu onClick={() => {
                    setExpand(!expand)
                }} />)}
                <div className='flex justify-center items-center'>

                    <h1>Logo</h1>
                    <h1>PennyWise</h1>
                </div>
            </div>
            <div>
                <UserButton afterSignOutURL = "/"/>
            </div>
        </section>
    )
}

export default DashboardHeader