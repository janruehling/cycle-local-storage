describe('On the login page', function () {
  describe('Given the user opens the page', function () {
    describe('when the browser finishes loding', function () {
      before(function (client, done) {
        done()
      })

      after(function (client, done) {
        client.end(function () {
          done()
        })
      })

      afterEach(function (client, done) {
        done()
      })

      beforeEach(function (client, done) {
        done()
      })
      it('then it should have username and password inputs and a button', function (client) {
        const login = client.page.login()

        login.navigate()

        login.waitForElementVisible('@usernameInput', 1000)

        login.expect.element('@usernameInput').to.be.an('input', 'Testing if #username is an input')
        login.expect.element('@usernameInput').to.have.attribute('type').which.matches(/^email/, 'Testing if #username is an email input')

        login.expect.element('@passwordInput').to.be.an('input', 'Testing if #password is an input')
        login.expect.element('@passwordInput').to.have.attribute('type').which.matches(/^password/, 'Testing if #password is a password input')

        login.expect.element('@submitButton').to.be.a('button', 'Testing if #submit is a button')
      })
    })
  })
  describe('Given the user wants to login', function () {
    describe('when the user enters the correct credentials', function () {
      before(function (client, done) {
        done()
      })

      after(function (client, done) {
        client.end(function () {
          done()
        })
      })

      afterEach(function (client, done) {
        done()
      })

      beforeEach(function (client, done) {
        done()
      })
      it('then he should be redirected to the dashboard', function (client) {
        const login = client.page.login()

        login.navigate()

        login.waitForElementVisible('@usernameInput')
        login.setValue('@usernameInput', 'jason@zipwire.com')

        login.waitForElementVisible('@passwordInput')
        login.setValue('@passwordInput', 'Happy19')

        login.waitForElementVisible('@submitButton')
        login.click('@submitButton')

        login.waitForElementVisible('body')

        login.assert.urlContains('dash')
      })
    })
  })
})
