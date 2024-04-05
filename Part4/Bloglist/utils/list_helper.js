const dummy = (blogs) => {
    return 1
  }
  

const totalLikes = (blogs) => {
    const likeslist = blogs.map(blog => blog.likes)
    const sum = likeslist.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    return sum
}

  module.exports = {
    dummy,
    totalLikes
  }