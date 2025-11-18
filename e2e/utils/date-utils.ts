/**
 * Date Utilities
 * Helper functions for date manipulation in tests
 */

export class DateUtils {
  /**
   * Get current date in YYYY-MM-DD format
   */
  static getCurrentDate(): string {
    const today = new Date();
    return this.formatDate(today);
  }

  /**
   * Get future date by adding days
   */
  static getFutureDate(daysToAdd: number): string {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + daysToAdd);
    return this.formatDate(futureDate);
  }

  /**
   * Get past date by subtracting days
   */
  static getPastDate(daysToSubtract: number): string {
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - daysToSubtract);
    return this.formatDate(pastDate);
  }

  /**
   * Format date to YYYY-MM-DD
   */
  static formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  /**
   * Get date range (from, to) for testing
   */
  static getDateRange(fromDaysAgo: number, toDaysAhead: number): { from: string; to: string } {
    return {
      from: this.getPastDate(fromDaysAgo),
      to: this.getFutureDate(toDaysAhead),
    };
  }

  /**
   * Get first and last day of current month
   */
  static getCurrentMonthRange(): { from: string; to: string } {
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    return {
      from: this.formatDate(firstDay),
      to: this.formatDate(lastDay),
    };
  }
}
