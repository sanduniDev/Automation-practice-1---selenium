/**
 * My Info Page
 * Page object for OrangeHRM My Info module
 */

import { By } from 'selenium-webdriver';
import { BasePage } from './base.page';
import { TestElement } from '../types/test-element';

export class MyInfoPage extends BasePage {
  // ============= PAGE ELEMENTS =============

  public readonly myInfoPageTitle: TestElement = {
    locator: By.xpath('//h6[text()="PIM"]'),
    label: 'My Info Page Title',
  };

  // Personal Details Section
  public readonly firstNameInput: TestElement = {
    locator: By.name('firstName'),
    label: 'First Name Input',
  };

  public readonly middleNameInput: TestElement = {
    locator: By.name('middleName'),
    label: 'Middle Name Input',
  };

  public readonly lastNameInput: TestElement = {
    locator: By.name('lastName'),
    label: 'Last Name Input',
  };

  public readonly employeeIdInput: TestElement = {
    locator: By.xpath('//label[text()="Employee Id"]/parent::div/following-sibling::div/input'),
    label: 'Employee ID Input',
  };

  public readonly otherIdInput: TestElement = {
    locator: By.xpath('//label[text()="Other Id"]/parent::div/following-sibling::div/input'),
    label: 'Other ID Input',
  };

  public readonly driverLicenseInput: TestElement = {
    locator: By.xpath('//label[text()="Driver\'s License Number"]/parent::div/following-sibling::div/input'),
    label: 'Driver License Input',
  };

  public readonly licenseExpiryDateInput: TestElement = {
    locator: By.xpath('//label[text()="License Expiry Date"]/parent::div/following-sibling::div//input'),
    label: 'License Expiry Date Input',
  };

  public readonly nationalityDropdown: TestElement = {
    locator: By.xpath('//label[text()="Nationality"]/parent::div/following-sibling::div//div[@class="oxd-select-text-input"]'),
    label: 'Nationality Dropdown',
  };

  public readonly maritalStatusDropdown: TestElement = {
    locator: By.xpath('//label[text()="Marital Status"]/parent::div/following-sibling::div//div[@class="oxd-select-text-input"]'),
    label: 'Marital Status Dropdown',
  };

  public readonly dateOfBirthInput: TestElement = {
    locator: By.xpath('//label[text()="Date of Birth"]/parent::div/following-sibling::div//input'),
    label: 'Date of Birth Input',
  };

  public readonly genderMaleRadio: TestElement = {
    locator: By.xpath('//label[text()="Male"]/input'),
    label: 'Gender Male Radio',
  };

  public readonly genderFemaleRadio: TestElement = {
    locator: By.xpath('//label[text()="Female"]/input'),
    label: 'Gender Female Radio',
  };

  public readonly savePersonalDetailsButton: TestElement = {
    locator: By.xpath('(//button[@type="submit"])[1]'),
    label: 'Save Personal Details Button',
  };

  // Tabs
  public readonly contactDetailsTab: TestElement = {
    locator: By.xpath('//a[text()="Contact Details"]'),
    label: 'Contact Details Tab',
  };

  public readonly emergencyContactsTab: TestElement = {
    locator: By.xpath('//a[text()="Emergency Contacts"]'),
    label: 'Emergency Contacts Tab',
  };

  public readonly dependentsTab: TestElement = {
    locator: By.xpath('//a[text()="Dependents"]'),
    label: 'Dependents Tab',
  };

  public readonly immigrationTab: TestElement = {
    locator: By.xpath('//a[text()="Immigration"]'),
    label: 'Immigration Tab',
  };

  public readonly jobTab: TestElement = {
    locator: By.xpath('//a[text()="Job"]'),
    label: 'Job Tab',
  };

  public readonly salaryTab: TestElement = {
    locator: By.xpath('//a[text()="Salary"]'),
    label: 'Salary Tab',
  };

  public readonly qualificationsTab: TestElement = {
    locator: By.xpath('//a[text()="Qualifications"]'),
    label: 'Qualifications Tab',
  };

  // Contact Details Section
  public readonly street1Input: TestElement = {
    locator: By.xpath('//label[text()="Street 1"]/parent::div/following-sibling::div/input'),
    label: 'Street 1 Input',
  };

  public readonly street2Input: TestElement = {
    locator: By.xpath('//label[text()="Street 2"]/parent::div/following-sibling::div/input'),
    label: 'Street 2 Input',
  };

  public readonly cityInput: TestElement = {
    locator: By.xpath('//label[text()="City"]/parent::div/following-sibling::div/input'),
    label: 'City Input',
  };

  public readonly stateProvinceInput: TestElement = {
    locator: By.xpath('//label[text()="State/Province"]/parent::div/following-sibling::div/input'),
    label: 'State/Province Input',
  };

  public readonly zipPostalCodeInput: TestElement = {
    locator: By.xpath('//label[text()="Zip/Postal Code"]/parent::div/following-sibling::div/input'),
    label: 'Zip/Postal Code Input',
  };

  public readonly countryDropdown: TestElement = {
    locator: By.xpath('//label[text()="Country"]/parent::div/following-sibling::div//div[@class="oxd-select-text-input"]'),
    label: 'Country Dropdown',
  };

  public readonly homeTelephoneInput: TestElement = {
    locator: By.xpath('//label[text()="Home Telephone"]/parent::div/following-sibling::div/input'),
    label: 'Home Telephone Input',
  };

  public readonly mobileInput: TestElement = {
    locator: By.xpath('//label[text()="Mobile"]/parent::div/following-sibling::div/input'),
    label: 'Mobile Input',
  };

  public readonly workTelephoneInput: TestElement = {
    locator: By.xpath('//label[text()="Work Telephone"]/parent::div/following-sibling::div/input'),
    label: 'Work Telephone Input',
  };

  public readonly workEmailInput: TestElement = {
    locator: By.xpath('//label[text()="Work Email"]/parent::div/following-sibling::div/input'),
    label: 'Work Email Input',
  };

  public readonly otherEmailInput: TestElement = {
    locator: By.xpath('//label[text()="Other Email"]/parent::div/following-sibling::div/input'),
    label: 'Other Email Input',
  };

  public readonly saveContactDetailsButton: TestElement = {
    locator: By.xpath('(//button[@type="submit"])[1]'),
    label: 'Save Contact Details Button',
  };

  // Emergency Contacts Section
  public readonly addEmergencyContactButton: TestElement = {
    locator: By.xpath('//button[text()=" Add "]'),
    label: 'Add Emergency Contact Button',
  };

  public readonly emergencyContactNameInput: TestElement = {
    locator: By.xpath('//label[text()="Name"]/parent::div/following-sibling::div/input'),
    label: 'Emergency Contact Name Input',
  };

  public readonly relationshipInput: TestElement = {
    locator: By.xpath('//label[text()="Relationship"]/parent::div/following-sibling::div/input'),
    label: 'Relationship Input',
  };

  public readonly emergencyHomeTelephoneInput: TestElement = {
    locator: By.xpath('//label[text()="Home Telephone"]/parent::div/following-sibling::div/input'),
    label: 'Emergency Home Telephone Input',
  };

  public readonly emergencyMobileInput: TestElement = {
    locator: By.xpath('//label[text()="Mobile"]/parent::div/following-sibling::div/input'),
    label: 'Emergency Mobile Input',
  };

  public readonly saveEmergencyContactButton: TestElement = {
    locator: By.xpath('//button[@type="submit"]'),
    label: 'Save Emergency Contact Button',
  };

  // ============= PAGE ACTIONS =============

  /**
   * Update personal details
   */
  async updatePersonalDetails(
    firstName?: string,
    middleName?: string,
    lastName?: string,
    nationality?: string,
    dateOfBirth?: string
  ): Promise<void> {
    console.log(`✏️ ${this.sessionName} Updating personal details`);

    if (firstName) {
      await this.clearAndTypeAfterWaitForElement(this.firstNameInput, firstName);
    }
    if (middleName) {
      await this.clearAndTypeAfterWaitForElement(this.middleNameInput, middleName);
    }
    if (lastName) {
      await this.clearAndTypeAfterWaitForElement(this.lastNameInput, lastName);
    }
    if (nationality) {
      await this.clickAfterWaitForElement(this.nationalityDropdown);
      const nationalityOption: TestElement = {
        locator: By.xpath(`//div[@role="option"]//span[text()="${nationality}"]`),
        label: `${nationality} Option`,
      };
      await this.clickAfterWaitForElement(nationalityOption);
    }
    if (dateOfBirth) {
      await this.clearAndTypeAfterWaitForElement(this.dateOfBirthInput, dateOfBirth);
    }

    await this.clickAfterWaitForElement(this.savePersonalDetailsButton);
    console.log(`✅ ${this.sessionName} Personal details updated`);
  }

  /**
   * Navigate to Contact Details tab
   */
  async navigateToContactDetails(): Promise<void> {
    console.log(`🔗 ${this.sessionName} Navigating to Contact Details`);
    await this.clickAfterWaitForElement(this.contactDetailsTab);
  }

  /**
   * Navigate to Emergency Contacts tab
   */
  async navigateToEmergencyContacts(): Promise<void> {
    console.log(`🔗 ${this.sessionName} Navigating to Emergency Contacts`);
    await this.clickAfterWaitForElement(this.emergencyContactsTab);
  }

  /**
   * Navigate to Qualifications tab
   */
  async navigateToQualifications(): Promise<void> {
    console.log(`🔗 ${this.sessionName} Navigating to Qualifications`);
    await this.clickAfterWaitForElement(this.qualificationsTab);
  }

  /**
   * Update contact details
   */
  async updateContactDetails(street: string, city: string, mobile: string, email?: string): Promise<void> {
    console.log(`📞 ${this.sessionName} Updating contact details`);

    await this.clearAndTypeAfterWaitForElement(this.street1Input, street);
    await this.clearAndTypeAfterWaitForElement(this.cityInput, city);
    await this.clearAndTypeAfterWaitForElement(this.mobileInput, mobile);

    if (email) {
      await this.clearAndTypeAfterWaitForElement(this.otherEmailInput, email);
    }

    await this.clickAfterWaitForElement(this.saveContactDetailsButton);
    console.log(`✅ ${this.sessionName} Contact details updated`);
  }

  /**
   * Add emergency contact
   */
  async addEmergencyContact(name: string, relationship: string, mobile: string): Promise<void> {
    console.log(`👥 ${this.sessionName} Adding emergency contact: ${name}`);

    await this.clickAfterWaitForElement(this.addEmergencyContactButton);
    await this.clearAndTypeAfterWaitForElement(this.emergencyContactNameInput, name);
    await this.clearAndTypeAfterWaitForElement(this.relationshipInput, relationship);
    await this.clearAndTypeAfterWaitForElement(this.emergencyMobileInput, mobile);
    await this.clickAfterWaitForElement(this.saveEmergencyContactButton);

    console.log(`✅ ${this.sessionName} Emergency contact added`);
  }

  // ============= PAGE VERIFICATIONS =============

  /**
   * Verify My Info page is displayed
   */
  async isMyInfoPageDisplayed(): Promise<boolean> {
    console.log(`✅ ${this.sessionName} Verifying My Info page is displayed`);
    return await this.isElementPresent(this.myInfoPageTitle);
  }

  /**
   * Get first name value
   */
  async getFirstName(): Promise<string> {
    console.log(`📝 ${this.sessionName} Getting first name`);
    return await this.getAttributeAfterWaitForElement(this.firstNameInput, 'value');
  }

  /**
   * Get employee ID value
   */
  async getEmployeeId(): Promise<string> {
    console.log(`📝 ${this.sessionName} Getting employee ID`);
    return await this.getAttributeAfterWaitForElement(this.employeeIdInput, 'value');
  }
}
