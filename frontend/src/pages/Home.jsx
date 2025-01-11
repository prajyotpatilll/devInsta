import React from 'react'
import HomeBanner from '../componants/HomeBanner'
import ProjectList from '../componants/ProjectList'
import DevsProfiles from '../componants/DevsProfiles'

const Home = () => {
  return (
    <div >
      <HomeBanner />
      <ProjectList/>
      <DevsProfiles/>
    </div>
  )
}

export default Home
