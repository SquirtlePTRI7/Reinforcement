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

// #EXAMPLE:
// describe('TODO api testing', () => {
//   let todoItem;
//   it('fetches Todo items - GET', () => {
//       cy.request('/users/').as('todoRequest');
//       cy.get('@todoRequest').then(todos => {
//           expect(todos.status).to.eq(200);
//           assert.isArray(todos.body, 'Todos Response is an array')
//       });
//   });
// });

// #API Tests
describe('API tests', () => {
  it('tests /users endpoint for 200 status', () => {
    cy.request({
      url: '/users',
      method: 'GET',
    })
      .then((res) => {
        expect(res.status).to.eq(200)
      })
  })

  it('updates user applicationSubmissions and currentScore by number of newAppSubmissions', () => {
    let newAppSubmissions = 1;
    let newScore = 1;

    const user = {
      username: 'test',
      applicationSubmissions: 0,
      currentScore: 0
    }

    cy.request({
      url: `/users/${user.username}`,
      method: 'PATCH',
      body: {
        newAppSubmissions,
      }
    })
      .then((res) => {
        expect(res.status).to.eq(200)
        expect(res.body.applicationSubmissions).to.eq(newAppSubmissions + user.applicationSubmissions)
        expect(res.body.currentScore).to.eq(newScore + user.currentScore)
      })
  })
})

// [
//   {
//       "_id": "63828b6bb6f6eb31b5713fda",
//       "username": "pleasework",
//       "applicationSubmissions": 0,
//       "interviews": 0,
//       "phoneScreens": 0,
//       "jobOffers": 0,
//       "currentScore": 0,
//       "__v": 0
//   }
// ]


// describe('TestComponent.cy.ts', () => {
//   it('playground', () => {
//     // cy.mount()
//   })
// })