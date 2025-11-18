/**
 * Pages Index
 * Central export for all page objects
 */

import { WebDriver } from 'selenium-webdriver';
import { LoginPage } from './login.page';
import { DashboardPage } from './dashboard.page';
import { AdminPage } from './admin.page';
import { PimPage } from './pim.page';
import { LeavePage } from './leave.page';
import { TimePage } from './time.page';
import { RecruitmentPage } from './recruitment.page';
import { MyInfoPage } from './myinfo.page';
import { PerformancePage } from './performance.page';

export class Pages {
  public login: LoginPage;
  public dashboard: DashboardPage;
  public admin: AdminPage;
  public pim: PimPage;
  public leave: LeavePage;
  public time: TimePage;
  public recruitment: RecruitmentPage;
  public myInfo: MyInfoPage;
  public performance: PerformancePage;

  constructor(driver: WebDriver, sessionName: string) {
    // Initialize all page objects
    this.login = new LoginPage(driver, sessionName, this);
    this.dashboard = new DashboardPage(driver, sessionName, this);
    this.admin = new AdminPage(driver, sessionName, this);
    this.pim = new PimPage(driver, sessionName, this);
    this.leave = new LeavePage(driver, sessionName, this);
    this.time = new TimePage(driver, sessionName, this);
    this.recruitment = new RecruitmentPage(driver, sessionName, this);
    this.myInfo = new MyInfoPage(driver, sessionName, this);
    this.performance = new PerformancePage(driver, sessionName, this);
  }
}
