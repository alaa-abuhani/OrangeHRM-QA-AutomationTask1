class EmpTable {
  //fetch data from table (first row) to match data of employee added
  elements = {
    emp_id: () =>
      cy.get(".oxd-table-card > .oxd-table-row > :nth-child(2) > div"),
    first_middle_name: () =>
      cy.get(".oxd-table-card > .oxd-table-row > :nth-child(3) > div"),
    last_name: () =>
      cy.get(".oxd-table-card > .oxd-table-row > :nth-child(4) > div"),
    job_title: () =>
      cy.get(".oxd-table-card > .oxd-table-row > :nth-child(5) > div"),
    emp_status: () =>
      cy.get(".oxd-table-card > .oxd-table-row > :nth-child(6) > div"),
    sub_unit: () =>
      cy.get(".oxd-table-card > .oxd-table-row > :nth-child(7) > div"),
    supervisor: () =>
      cy.get(".oxd-table-card > .oxd-table-row > :nth-child(8) > div"),
    //PIM filter Id Search
    id: () => cy.get(":nth-child(2) > .oxd-input"),
    //PIM search button
    searchBtn: () => cy.get(".oxd-form-actions > .oxd-button--secondary"),
  };

  checkSearchById(user: any, supervisor: any) {
    this.elements.id().type(user.id);
    this.elements.searchBtn().click({
      force: true,
    });
    this.elements.emp_id().should("contain", user.id);
    this.elements
      .first_middle_name()
      .should("contain", user.firstName + " " + user.middleName);
    this.elements.last_name().should("contain", user.lastName);
    this.elements.job_title().should("contain", user.jobTitle);
    this.elements.emp_status().should("contain", user.empStatus);
    this.elements.sub_unit().should("contain", user.subUnit);
    this.elements.supervisor().should("contain", supervisor.firstName);
  }
}
export default EmpTable;
