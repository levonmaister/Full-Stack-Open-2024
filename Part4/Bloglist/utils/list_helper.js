const dummy = (blogs) => {
    return 1
  }
  

const totalLikes = (blogs) => {
    const likeslist = blogs.map(blog => blog.likes)
    const sum = likeslist.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    return sum
}


const favoriteBlog = (blogs) => {
  let blogObject = blogs[0]
  blogs.forEach( (blog) => {
    if(blogObject.likes<blog.likes){
      blogObject = blog
    }

  })

  return blogObject

}

  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
  }