// import TodoList from './components/TodoList'

// it('contains the correct number of todos', () => {
//   const todos = [
//     { text: 'Buy milk', id: 1 },
//     { text: 'Learn Component Testing', id: 2 },
//   ]

//   cy.mount(<TodoList todos={todos} />)
//   // the component starts running like a mini web app
//   cy.get('[data-testid="todos"]').should('have.length', todos.length)
// })

// #API Tests
it('tests /users endpoint for 200 status', () => {
  cy.request({
    url: 'https://localhost:3000/users',
    method: 'GET',
  })
    .then((res) => {
      expect(res.status).to.eq(200)
    })
    // .its('status')
    // .should('deep.contain', {
    //   title: 'Write REST API',
    //   completed: false,
    // })
})

// describe('TestComponent.cy.ts', () => {
//   it('playground', () => {
//     // cy.mount()
//   })
// })