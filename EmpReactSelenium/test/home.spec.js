const { Builder, By, Key, until } = require('selenium-webdriver');

async function testEmployeeManagement() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    // Navigate to your EmployeeManagement web application
    await driver.get('http://localhost:3000'); // Replace with the actual URL

    // Example: Fetching employee information
    // This assumes there's an input field for searching employees by ID and a search button
    await driver.findElement(By.id('empIdInput')).sendKeys('12348', Key.RETURN);
    // Now, locate the Search button by its ID and click it
    await driver.findElement(By.id('btnSearch')).click();

    // Set values in the input fields
    await driver.findElement(By.id('EmpID')).clear();
    await driver.findElement(By.id('EmpID')).sendKeys(12349);

    await driver.findElement(By.id('EmpName')).clear();
    await driver.findElement(By.id('EmpName')).sendKeys('Tom Erichsen4');

    await driver.findElement(By.id('Designation')).clear();
    await driver.findElement(By.id('Designation')).sendKeys('SWE24');

    await driver.findElement(By.id('EmpDOJ')).clear();
    await driver.findElement(By.id('EmpDOJ')).sendKeys('8/10/2021');

    await driver.findElement(By.id('ManagerName')).clear();
    await driver.findElement(By.id('ManagerName')).sendKeys('Shiva Muralidhar4');

    await driver.findElement(By.id('Compensation')).clear();
    await driver.findElement(By.id('Compensation')).sendKeys('1040004');

    await driver.findElement(By.id('EmpStatus')).clear();
    await driver.findElement(By.id('EmpStatus')).sendKeys('Active4');

    // Click the "Create" button with id "btnCreate"
    await driver.findElement(By.id('btnCreate')).click();
     
    console.log('Employee data created successfully');

    // Wait for the alert to be present and accept it (click "OK")
    await driver.wait(until.alertIsPresent(), 10000); // Wait up to 10 seconds for the alert to appear
    let alert = await driver.switchTo().alert();
    await alert.accept();
    console.log('Alert closed successfully');

    await driver.findElement(By.id('btnDelete')).click();
    console.log('Employee data deleted successfully');

    // Set the value in the input field "EmpName" to 'Tom Erichsen3U'
    //await driver.findElement(By.id('EmpName')).clear(); // Clear existing value
    //await driver.findElement(By.id('EmpName')).sendKeys('Tom Erichsen3U');

    // Click the "Update" button with id "btnUpdate"
    //await driver.findElement(By.id('btnUpdate')).click();


    //alert('Employee data fetched successfully', Key.RETURN);
    //await driver.wait(until.elementLocated(By.id('EmpID')), 10000); // Adjust ID accordingly

    // Add more actions here for creating, updating, and deleting employees
    // You'll need to identify the elements by their IDs, classes, or other selectors
    // and interact with them (e.g., clicking a button, filling out a form)

  } finally {
    // Quit the WebDriver session
    //await driver.quit();
  }
}
testEmployeeManagement().catch(console.error);