import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'


describe('Blogformtests', ()=>{

    test('check event handler is called with correct props' , async () =>{

    const createBlog1 = vi.fn()

    const user = userEvent.setup()


    const {container} = render(<BlogForm createBlog={createBlog1} />)

    const newBlog = screen.getByText('new blog')

    await userEvent.click(newBlog)

    const author = screen.getByPlaceholderText('write author here')
    
    const title = screen.getByPlaceholderText('write title here')

    const url = screen.getByPlaceholderText('write url here')
    


    const sendButton = screen.getByText('create')


    await userEvent.type(author, 'Levon')
    await  userEvent.type(title, 'Kustkompani äventyr i syndalen')
    await userEvent.type(url, 'www.syndalen.com')

   await userEvent.click(sendButton)

    console.log('MOCK CALLS: ',createBlog1.mock.calls)

    expect(createBlog1.mock.calls).toHaveLength(1)

    expect(createBlog1.mock.calls[0][0]).toEqual({
        author: 'Levon',
        title: 'Kustkompani äventyr i syndalen',
        url: 'www.syndalen.com'
    })

    })

}) 

    