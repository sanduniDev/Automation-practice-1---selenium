/**
 * Recruitment Page
 * Page object for OrangeHRM Recruitment module
 */

import { By } from 'selenium-webdriver';
import { BasePage } from './base.page';
import { TestElement } from '../types/test-element';

export class RecruitmentPage extends BasePage {
  // ============= PAGE ELEMENTS =============

  public readonly recruitmentPageTitle: TestElement = {
    locator: By.xpath('//h5[text()="Candidates"]'),
    label: 'Recruitment Page Title',
  };

  // Top Menu Items
  public readonly candidatesMenuItem: TestElement = {
    locator: By.xpath('//a[text()="Candidates"]'),
    label: 'Candidates Menu Item',
  };

  public readonly vacanciesMenuItem: TestElement = {
    locator: By.xpath('//a[text()="Vacancies"]'),
    label: 'Vacancies Menu Item',
  };

  // Candidate Search
  public readonly jobTitleDropdown: TestElement = {
    locator: By.xpath('//label[text()="Job Title"]/parent::div/following-sibling::div//div[@class="oxd-select-text-input"]'),
    label: 'Job Title Dropdown',
  };

  public readonly vacancyDropdown: TestElement = {
    locator: By.xpath('//label[text()="Vacancy"]/parent::div/following-sibling::div//div[@class="oxd-select-text-input"]'),
    label: 'Vacancy Dropdown',
  };

  public readonly hiringManagerInput: TestElement = {
    locator: By.xpath('//label[text()="Hiring Manager"]/parent::div/following-sibling::div//input'),
    label: 'Hiring Manager Input',
  };

  public readonly statusDropdown: TestElement = {
    locator: By.xpath('//label[text()="Status"]/parent::div/following-sibling::div//div[@class="oxd-select-text-input"]'),
    label: 'Status Dropdown',
  };

  public readonly candidateNameInput: TestElement = {
    locator: By.xpath('//label[text()="Candidate Name"]/parent::div/following-sibling::div//input'),
    label: 'Candidate Name Input',
  };

  public readonly keywordsInput: TestElement = {
    locator: By.xpath('//label[text()="Keywords"]/parent::div/following-sibling::div//input'),
    label: 'Keywords Input',
  };

  public readonly searchButton: TestElement = {
    locator: By.xpath('//button[@type="submit"]'),
    label: 'Search Button',
  };

  public readonly resetButton: TestElement = {
    locator: By.xpath('//button[text()=" Reset "]'),
    label: 'Reset Button',
  };

  public readonly addButton: TestElement = {
    locator: By.xpath('//button[text()=" Add "]'),
    label: 'Add Candidate Button',
  };

  // Add Candidate Form
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

  public readonly emailInput: TestElement = {
    locator: By.xpath('//label[text()="Email"]/parent::div/following-sibling::div//input'),
    label: 'Email Input',
  };

  public readonly contactNumberInput: TestElement = {
    locator: By.xpath('//label[text()="Contact Number"]/parent::div/following-sibling::div//input'),
    label: 'Contact Number Input',
  };

  public readonly resumeFileInput: TestElement = {
    locator: By.css('input[type="file"]'),
    label: 'Resume File Input',
  };

  public readonly vacancyFormDropdown: TestElement = {
    locator: By.xpath('//label[text()="Vacancy"]/parent::div/following-sibling::div//div[@class="oxd-select-text-input"]'),
    label: 'Vacancy Form Dropdown',
  };

  public readonly saveButton: TestElement = {
    locator: By.xpath('//button[@type="submit"]'),
    label: 'Save Button',
  };

  public readonly cancelButton: TestElement = {
    locator: By.xpath('//button[text()=" Cancel "]'),
    label: 'Cancel Button',
  };

  // Add Vacancy Form
  public readonly vacancyNameInput: TestElement = {
    locator: By.xpath('//label[text()="Vacancy Name"]/parent::div/following-sibling::div//input'),
    label: 'Vacancy Name Input',
  };

  public readonly jobTitleFormDropdown: TestElement = {
    locator: By.xpath('//label[text()="Job Title"]/parent::div/following-sibling::div//div[@class="oxd-select-text-input"]'),
    label: 'Job Title Form Dropdown',
  };

  public readonly descriptionTextarea: TestElement = {
    locator: By.xpath('//label[text()="Description"]/parent::div/following-sibling::div//textarea'),
    label: 'Description Textarea',
  };

  public readonly hiringManagerFormInput: TestElement = {
    locator: By.xpath('//label[text()="Hiring Manager"]/parent::div/following-sibling::div//input'),
    label: 'Hiring Manager Form Input',
  };

  public readonly numberOfPositionsInput: TestElement = {
    locator: By.xpath('//label[text()="Number of Positions"]/parent::div/following-sibling::div//input'),
    label: 'Number of Positions Input',
  };

  // Results Table
  public readonly recordsFoundText: TestElement = {
    locator: By.xpath('//span[contains(text(), "Record")]'),
    label: 'Records Found Text',
  };

  public readonly firstCandidateLink: TestElement = {
    locator: By.xpath('(//div[@role="table"]//div[@role="row"])[2]//div[@role="cell"][3]//div'),
    label: 'First Candidate Link',
  };

  // ============= PAGE ACTIONS =============

  /**
   * Navigate to Candidates page
   */
  async navigateToCandidates(): Promise<void> {
    console.log(`🔗 ${this.sessionName} Navigating to Candidates`);
    await this.clickAfterWaitForElement(this.candidatesMenuItem);
  }

  /**
   * Navigate to Vacancies page
   */
  async navigateToVacancies(): Promise<void> {
    console.log(`🔗 ${this.sessionName} Navigating to Vacancies`);
    await this.clickAfterWaitForElement(this.vacanciesMenuItem);
  }

  /**
   * Click Add button to create new candidate
   */
  async clickAddCandidate(): Promise<void> {
    console.log(`➕ ${this.sessionName} Clicking Add Candidate button`);
    await this.clickAfterWaitForElement(this.addButton);
  }

  /**
   * Search candidate by name
   */
  async searchCandidateByName(candidateName: string): Promise<void> {
    console.log(`🔍 ${this.sessionName} Searching for candidate: ${candidateName}`);
    await this.clearAndTypeAfterWaitForElement(this.candidateNameInput, candidateName);
    await this.clickAfterWaitForElement(this.searchButton);
    console.log(`✅ ${this.sessionName} Search submitted`);
  }

  /**
   * Search candidate by keywords
   */
  async searchCandidateByKeywords(keywords: string): Promise<void> {
    console.log(`🔍 ${this.sessionName} Searching for keywords: ${keywords}`);
    await this.clearAndTypeAfterWaitForElement(this.keywordsInput, keywords);
    await this.clickAfterWaitForElement(this.searchButton);
    console.log(`✅ ${this.sessionName} Search submitted`);
  }

  /**
   * Select vacancy from dropdown
   */
  async selectVacancy(vacancy: string): Promise<void> {
    console.log(`📋 ${this.sessionName} Selecting vacancy: ${vacancy}`);
    await this.clickAfterWaitForElement(this.vacancyFormDropdown);
    const vacancyOption: TestElement = {
      locator: By.xpath(`//div[@role="option"]//span[contains(text(), "${vacancy}")]`),
      label: `${vacancy} Option`,
    };
    await this.clickAfterWaitForElement(vacancyOption);
  }

  /**
   * Add a new candidate
   */
  async addCandidate(
    firstName: string,
    middleName: string,
    lastName: string,
    email: string,
    contactNumber: string,
    vacancy: string
  ): Promise<void> {
    console.log(`👤 ${this.sessionName} Adding new candidate: ${firstName} ${lastName}`);

    await this.clearAndTypeAfterWaitForElement(this.firstNameInput, firstName);
    await this.clearAndTypeAfterWaitForElement(this.middleNameInput, middleName);
    await this.clearAndTypeAfterWaitForElement(this.lastNameInput, lastName);
    await this.clearAndTypeAfterWaitForElement(this.emailInput, email);
    await this.clearAndTypeAfterWaitForElement(this.contactNumberInput, contactNumber);

    await this.selectVacancy(vacancy);

    await this.clickAfterWaitForElement(this.saveButton);
    console.log(`✅ ${this.sessionName} Candidate creation submitted`);
  }

  /**
   * Add vacancy
   */
  async addVacancy(
    vacancyName: string,
    jobTitle: string,
    hiringManager: string,
    numberOfPositions: string,
    description?: string
  ): Promise<void> {
    console.log(`📝 ${this.sessionName} Adding new vacancy: ${vacancyName}`);

    await this.clearAndTypeAfterWaitForElement(this.vacancyNameInput, vacancyName);

    // Select job title
    await this.clickAfterWaitForElement(this.jobTitleFormDropdown);
    const jobTitleOption: TestElement = {
      locator: By.xpath(`//div[@role="option"]//span[text()="${jobTitle}"]`),
      label: `${jobTitle} Option`,
    };
    await this.clickAfterWaitForElement(jobTitleOption);

    // Type hiring manager and select from autocomplete
    await this.typeAfterWaitForElement(this.hiringManagerFormInput, hiringManager);
    await this.sleep(2000);
    const firstOption: TestElement = {
      locator: By.xpath('//div[@role="option"][1]'),
      label: 'First Hiring Manager Option',
    };
    await this.clickAfterWaitForElement(firstOption);

    await this.clearAndTypeAfterWaitForElement(this.numberOfPositionsInput, numberOfPositions);

    if (description) {
      await this.typeAfterWaitForElement(this.descriptionTextarea, description);
    }

    await this.clickAfterWaitForElement(this.saveButton);
    console.log(`✅ ${this.sessionName} Vacancy creation submitted`);
  }

  /**
   * View first candidate details
   */
  async viewFirstCandidate(): Promise<void> {
    console.log(`👁️ ${this.sessionName} Viewing first candidate details`);
    await this.clickAfterWaitForElement(this.firstCandidateLink);
  }

  /**
   * Reset search form
   */
  async resetSearch(): Promise<void> {
    console.log(`🔄 ${this.sessionName} Resetting search`);
    await this.clickAfterWaitForElement(this.resetButton);
  }

  // ============= PAGE VERIFICATIONS =============

  /**
   * Verify Recruitment page is displayed
   */
  async isRecruitmentPageDisplayed(): Promise<boolean> {
    console.log(`✅ ${this.sessionName} Verifying Recruitment page is displayed`);
    return await this.isElementPresent(this.recruitmentPageTitle);
  }

  /**
   * Get records found count
   */
  async getRecordsCount(): Promise<string> {
    console.log(`📊 ${this.sessionName} Getting records count`);
    return await this.extractTextAfterWaitForElement(this.recordsFoundText);
  }

  /**
   * Verify candidate exists in search results
   */
  async isCandidateInResults(candidateName: string): Promise<boolean> {
    const candidateElement: TestElement = {
      locator: By.xpath(`//div[contains(@class, "oxd-table-cell") and contains(text(), "${candidateName}")]`),
      label: `Candidate ${candidateName} in results`,
    };
    return await this.isElementPresent(candidateElement);
  }
}
