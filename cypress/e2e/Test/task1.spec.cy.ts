import LoginPage from "../../support/PageObjectModel/login";
import PIM from "../../support/PageObjectModel/PIM";
const loginObj: LoginPage = new LoginPage();
const pimObject: PIM = new PIM();
describe("Create new employee by APi and fill that employee details info by UI  ", () => {
  beforeEach(function () {
    cy.intercept(
      "https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index"
    ).as("LoginPage");
    cy.visit("https://opensource-demo.orangehrmlive.com/");
    cy.fixture("employeeInfo").as("EmpInfo");
    loginObj.login("Admin", "admin123");

    //Add new Supervisor by Api to assign it to the empolyee info add in next step
    cy.get("@EmpInfo").then((infoData: any) => {
      cy.request({
        method: "POST",
        url: "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/pim/employees",
        body: {
          firstName: infoData.supervisor.firstName,
          middleName: infoData.supervisor.middleName,
          lastName: infoData.supervisor.lastName,
          empPicture: null,
          employeeId: infoData.supervisor.id,
        },
      }).then((response) => {
        expect(response).property("status").to.equal(200);
      });
    });

    //Add new Employee by API
    cy.get("@EmpInfo").then((infoData: any) => {
      cy.request({
        method: "POST",
        url: "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/pim/employees",
        body: {
          firstName: infoData.user.firstName,
          middleName: infoData.user.middleName,
          lastName: infoData.user.lastName,
          empPicture: null,
          employeeId: infoData.user.id,
        },
      }).then((response) => {
        expect(response).property("status").to.equal(200);
        const empNumber = response.body.data.empNumber;
        console.log(response.body.data.empNumber);
        pimObject.successAddEmployee(
          empNumber,
          infoData.user.firstName,
          infoData.user.lastName
        );
      });
    });
  });

  it("Add Employee Info by UI ", () => {
    //@ for Alias
    cy.get("@EmpInfo").then((infoData: any) => {
      pimObject.addEmployeeInfo(infoData.user, infoData.supervisor);
    });
  });
});
