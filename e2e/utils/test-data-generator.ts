/**
 * Test Data Generator
 * Helper functions to generate test data
 */

export class TestDataGenerator {
  /**
   * Generate random string
   */
  static generateRandomString(length: number = 8): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  /**
   * Generate random number
   */
  static generateRandomNumber(min: number = 1000, max: number = 9999): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Generate random email
   */
  static generateRandomEmail(): string {
    const username = this.generateRandomString(10).toLowerCase();
    const domain = 'testmail.com';
    return `${username}@${domain}`;
  }

  /**
   * Generate random phone number
   */
  static generateRandomPhoneNumber(): string {
    const areaCode = this.generateRandomNumber(100, 999);
    const firstPart = this.generateRandomNumber(100, 999);
    const secondPart = this.generateRandomNumber(1000, 9999);
    return `${areaCode}-${firstPart}-${secondPart}`;
  }

  /**
   * Generate random username
   */
  static generateRandomUsername(prefix: string = 'user'): string {
    const timestamp = Date.now();
    const randomStr = this.generateRandomString(4).toLowerCase();
    return `${prefix}_${randomStr}_${timestamp}`;
  }

  /**
   * Generate random password
   */
  static generateRandomPassword(length: number = 12): string {
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*';
    const allCharacters = lowercase + uppercase + numbers + symbols;

    let password = '';
    // Ensure at least one of each type
    password += lowercase.charAt(Math.floor(Math.random() * lowercase.length));
    password += uppercase.charAt(Math.floor(Math.random() * uppercase.length));
    password += numbers.charAt(Math.floor(Math.random() * numbers.length));
    password += symbols.charAt(Math.floor(Math.random() * symbols.length));

    // Fill the rest randomly
    for (let i = password.length; i < length; i++) {
      password += allCharacters.charAt(Math.floor(Math.random() * allCharacters.length));
    }

    // Shuffle the password
    return password
      .split('')
      .sort(() => Math.random() - 0.5)
      .join('');
  }

  /**
   * Generate employee data
   */
  static generateEmployeeData() {
    const firstNames = ['John', 'Jane', 'Michael', 'Sarah', 'David', 'Emily', 'Robert', 'Lisa'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis'];

    return {
      firstName: firstNames[Math.floor(Math.random() * firstNames.length)],
      middleName: this.generateRandomString(1).toUpperCase(),
      lastName: lastNames[Math.floor(Math.random() * lastNames.length)],
      employeeId: `EMP${this.generateRandomNumber(10000, 99999)}`,
      email: this.generateRandomEmail(),
      phone: this.generateRandomPhoneNumber(),
    };
  }

  /**
   * Generate candidate data
   */
  static generateCandidateData() {
    const employeeData = this.generateEmployeeData();
    return {
      ...employeeData,
      keywords: 'Automation, Testing, QA',
    };
  }

  /**
   * Generate unique ID
   */
  static generateUniqueId(prefix: string = 'ID'): string {
    return `${prefix}_${Date.now()}_${this.generateRandomNumber(100, 999)}`;
  }
}
