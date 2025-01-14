import React from 'react'
import HomeBanner from '../componants/HomeBanner'
import ProjectList from '../componants/ProjectList'
import DevsProfiles from '../componants/DevsProfiles'

const Home = () => {
  return (
    <div className='flex flex-col justify-center w-full'>
      <HomeBanner />
      <ProjectList/>
      <DevsProfiles/>
    </div>
  )
}

export default Home
