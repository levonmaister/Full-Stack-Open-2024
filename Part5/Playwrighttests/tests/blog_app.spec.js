const { test, expect, beforeEach, describe } = require('@playwright/test')
const {createBlog} = require ('./helper')


describe('Blog app', () => {
  beforeEach(async ({ page,request }) => {
    await page.goto('http://localhost:5173')

    await request.post('http:localhost:3003/api/testing/reset')

    //MAIN USER
        await request.post('http://localhost:3003/api/users', {
          data: {
            name: 'Levon Lopez Eknosyan',
            username: 'levonlopez04',
            password: 'KavkazMafia11!'
          }
  })

  await request.post('http://localhost:3003/api/users', {
          data: {
            name: 'Leonardo Da Vinci',
            username: 'leonardo123',
            password: 'leonardo123'
          }
})
  })
  test('Login form is shown', async ({ page }) => {
        const loginForm = await page.getByTestId('loginform')
        await expect(loginForm).toBeVisible()
  })


  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page, request }) => {

        await page.getByTestId('username').fill('levonlopez04')
        await page.getByTestId('password').fill('KavkazMafia11!')
        await page.getByRole('button', { name: 'login' }).click()
        await expect(page.getByText('Levon Lopez Eknosyan logged in')).toBeVisible()

    })

    test('fails with wrong credentials', async ({ page }) => {
      

        await page.getByTestId('username').fill('levonlopez04')
        await page.getByTestId('password').fill('wrong')
        await page.getByRole('button', { name: 'login' }).click()
    
        await expect(page.getByText('wrong credentials')).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
        await page.getByTestId('username').fill('levonlopez04')
        await page.getByTestId('password').fill('KavkazMafia11!')
        await page.getByRole('button', { name: 'login' }).click()
    })
  
    test('a new blog can be created', async ({ page }) => {

        await page.getByRole('button', {name: 'new blog'}).click()

    

        await page.getByTestId('title').fill('A new world')
        await page.getByTestId('author').fill('Austrian Painter')
        await page.getByTestId('url').fill('www.newworld.com')

        await page.getByRole('button',{name: 'create'}).click()

       await expect(page.getByText('A new world')).toBeVisible()
    })


    test('a blog can be liked', async({page})=> {


        //CREATE BLOG
        await page.getByRole('button', {name: 'new blog'}).click()
        await page.getByTestId('title').fill('A new world')
        await page.getByTestId('author').fill('Austrian Painter')
        await page.getByTestId('url').fill('www.newworld.com')
        
        await page.getByRole('button',{name: 'create'}).click()
        
        // VIEW AND LIKE BLOG
             await page.getByRole('button' , {name: 'view'}).click()
             await page.getByRole('button' , {name: 'Like'}).click()
        
        //EXPECT LIKES TO BE +1
             expect(page.getByText('likes: 10'))
        
          })

    test('Can user delete a blog that was added by the user', async({page})=>{

         //CREATE BLOG
         await page.getByRole('button', {name: 'new blog'}).click()
         await page.getByTestId('title').fill('A new world')
         await page.getByTestId('author').fill('Austrian Painter')
         await page.getByTestId('url').fill('www.newworld.com')
         
         await page.getByRole('button',{name: 'create'}).click()


         page.on('dialog', async dialog => {
                
            if (dialog.type() === 'confirm') {
              await dialog.accept()
            }
          })
        

          await page.getByRole('button', { name: 'remove' }).click()

          
          const deletedBlog = await page.getByTestId('blog')
          

        await  expect(deletedBlog).not.toBeVisible()
    })
    test('Only user who added blog can see delete button', async({page})=>{

      //CREATE BLOG from main user perspective
      await page.getByRole('button', {name: 'new blog'}).click()
      await page.getByTestId('title').fill('A new world')
      await page.getByTestId('author').fill('Austrian Painter')
      await page.getByTestId('url').fill('www.newworld.com')
      
      await page.getByRole('button',{name: 'create'}).click()


      //LOGOUT , LOGIN
      await page.getByRole('button', {name: 'logout'}).click()

      await page.getByTestId('username').fill('leonardo123')
      await page.getByTestId('password').fill('leonardo123')
      await page.getByRole('button', { name: 'login' }).click()

     const DeleteButton = await page.getByRole('button', { name: 'remove' })
      await expect(DeleteButton).not.toBeVisible()
    })
    
    test('Blogs are in the right order', async({page})=>{
      //BLOG 1


    await  createBlog(page,'t1','a1','u1')
    await  createBlog(page,'t2','a2','u2')
    await  createBlog(page,'t3','a3','u3')
      

   
    const Blog1 = await page.getByTestId('blog').filter({hasText: 't1'})
    const Blog2 = await page.getByTestId('blog').filter({hasText: 't2'})
    const Blog3 = await page.getByTestId('blog').filter({hasText: 't3'})



   await Blog1.getByRole('button', {name:'view'}).click()
   await Blog2.getByRole('button', {name:'view'}).click()
   await Blog3.getByRole('button', {name:'view'}).click()


    const LikeButtons = await page.getByRole('button', {name: 'Like'}).all()

      await Blog1.getByRole('button', {name:'Like'}).click()
      await Blog1.getByRole('button', {name:'Like'}).click()
      await Blog1.getByRole('button', {name:'Like'}).click()
      await Blog1.getByRole('button', {name:'Like'}).click()
      await Blog1.getByRole('button', {name:'Like'}).click()

      await Blog2.getByRole('button', {name:'Like'}).click()
      await Blog2.getByRole('button', {name:'Like'}).click()

      await Blog3.getByRole('button', {name:'Like'}).click()

     
      let LikeCount1, LikeCount2, LikeCount3

      const FirstBlog = await page.getByTestId('blog').first()
      const SecondBlog = await page.getByTestId('blog').nth(1)
      const ThirdBlog = await page.getByTestId('blog').last()


    if(FirstBlog.getByText('likes: 5')){
      LikeCount1 = 5
    }
    if(SecondBlog.getByText('likes: 2')){
      LikeCount2 = 2
    }
    if(ThirdBlog.getByText('likes: 1')){
      LikeCount3 = 1
    }


    await page.pause()

      
    
    let passed = false

  
      if(LikeCount1>LikeCount2 && LikeCount2>LikeCount3){
        passed = true
        console.log('Statement = true', passed)
      }

    expect(passed).toBeTruthy()
    

    })
    

  })

  

})  
