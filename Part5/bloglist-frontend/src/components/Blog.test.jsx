import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'


describe('Blog tests', ()=>{

    let container

    beforeEach(() => {

        const user1 = {
            id: 'testid123'
        }
    
        const Blog1 = {
            title: 'humour',
            author: 'Component testing is done with react-testing-library',
            url: 'haha.com',
            likes: 3,
            user: 'testid123'
        }
    
         container = render(<Blog blog={Blog1} user={user1} />).container

        
      })




test('renders only author & title', () => {

    const viewButton = container.querySelector('#hidebutton')

expect(viewButton).toHaveStyle('display: none')
})


test('after clicking the button, url & likes are dispalyed', async () => {
    const user3 = userEvent.setup()
    const button = screen.getByText('view')
    await user3.click(button)

    const div = container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })



  



}) 



test('clicking the button calls event handler twice', async () => {
   

    const user1 = {
        id: 'testid123'
    }

    const Blog1 = {
        title: 'humour',
        author: 'Component testing is done with react-testing-library',
        url: 'haha.com',
        likes: 3,
        user: 'testid123'
    }
    const mockHandler = vi.fn()

     const {container} = render(<Blog blog={Blog1} user={user1} LikesHandler={mockHandler}/>)

    const user = userEvent.setup()
//CLICK VIEW BUTTON TO FIND LIKES
    const viewbutton = screen.getByText('view')


    await user.click(viewbutton)

    const Likebutton = screen.getByText('Like')
 


    await user.click(Likebutton)

    await user.click(Likebutton)


    expect(mockHandler.mock.calls).toHaveLength(2)
  })