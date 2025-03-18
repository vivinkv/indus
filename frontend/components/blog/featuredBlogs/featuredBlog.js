import React, { useState } from 'react'
import FeaturedSingle from './featuredSingle'
import FeaturedList from './featuredList'

function FeaturedBlog({ data }) {
  const [blog, setBlog] =useState(0)
  const handleBlog = (id) => {
    setBlog(id)
  }
const selectedBlog = data[blog]
  return (
    <section className='list-sec mt-[100px] md:mt-[140px] pb-[35px]'>
                <div className='container relative'>
                    <div className=" flex justify-between">
                        <FeaturedSingle blog={selectedBlog} />
                        <FeaturedList data={data} onBlogClick={handleBlog} blog={blog}/>
                    </div>
                    </div>
                    </section>
  )
}

export default FeaturedBlog