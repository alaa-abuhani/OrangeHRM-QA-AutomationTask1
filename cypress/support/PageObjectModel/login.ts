class LoginPage {
    elements = {
        userName: () => cy.getByCy('Username'), // support/commands.ts
        password: () => cy.getByCy('Password'),
        loginBtn: () => cy.get('button'),
        headerTitle: () => cy.get('.oxd-topbar-header-title'),
       
    }

    login(userName: string, password: string) {
        this.elements.userName().type(userName);
        this.elements.password().type(password);
        this.elements.loginBtn().click();
        this.elements.headerTitle().should('contain', 'Dashboard');
    }

}
export default LoginPage;