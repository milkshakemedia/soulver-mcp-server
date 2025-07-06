/**
 * Date arithmetic prompts for SoulverCore
 * Based on actual SoulverCore syntax examples
 */

export const datePrompts = {
  date_addition: {
    name: "date_addition",
    title: "Date Addition",
    description: "Add time periods to dates using SoulverCore syntax: 'date + period'",
    arguments: [
      {
        name: "start_date",
        description: "Starting date (e.g., 'January 30 2020', 'March 15 2023')",
        required: true
      },
      {
        name: "time_period",
        description: "Time period to add (e.g., '3 months 2 weeks 5 days', '1 year', '6 months')",
        required: true
      }
    ],
    handler: (args: { start_date: string; time_period: string }) => {
      const { start_date, time_period } = args;
      const expression = `${start_date} + ${time_period}`;
      
      return {
        description: `Date addition using SoulverCore syntax`,
        messages: [
          {
            role: "user" as const,
            content: {
              type: "text" as const,
              text: `Calculate future date:
Start Date: ${start_date}
Add: ${time_period}

SoulverCore expression: ${expression}`
            }
          }
        ]
      };
    }
  },

  date_subtraction: {
    name: "date_subtraction",
    title: "Date Subtraction",
    description: "Subtract time periods from dates or find difference between dates",
    arguments: [
      {
        name: "start_date",
        description: "Starting date (e.g., 'December 25 2023', 'June 1 2024')",
        required: true
      },
      {
        name: "time_period_or_end_date",
        description: "Time period to subtract or end date (e.g., '2 months', 'January 1 2023')",
        required: true
      }
    ],
    handler: (args: { start_date: string; time_period_or_end_date: string }) => {
      const { start_date, time_period_or_end_date } = args;
      const expression = `${start_date} - ${time_period_or_end_date}`;
      
      return {
        description: `Date subtraction using SoulverCore syntax`,
        messages: [
          {
            role: "user" as const,
            content: {
              type: "text" as const,
              text: `Calculate past date or difference:
Start Date: ${start_date}
Subtract: ${time_period_or_end_date}

SoulverCore expression: ${expression}`
            }
          }
        ]
      };
    }
  },

  days_between: {
    name: "days_between",
    title: "Days Between Dates",
    description: "Calculate the number of days between two dates",
    arguments: [
      {
        name: "start_date",
        description: "Start date (e.g., 'January 1 2024', 'March 15 2023')",
        required: true
      },
      {
        name: "end_date",
        description: "End date (e.g., 'December 31 2024', 'June 20 2023')",
        required: true
      }
    ],
    handler: (args: { start_date: string; end_date: string }) => {
      const { start_date, end_date } = args;
      const expression = `${end_date} - ${start_date}`;
      
      return {
        description: `Calculate days between dates`,
        messages: [
          {
            role: "user" as const,
            content: {
              type: "text" as const,
              text: `Calculate time between dates:
From: ${start_date}
To: ${end_date}

SoulverCore expression: ${expression}`
            }
          }
        ]
      };
    }
  },

  age_calculation: {
    name: "age_calculation",
    title: "Age Calculator",
    description: "Calculate age from birth date to current date or specific date",
    arguments: [
      {
        name: "birth_date",
        description: "Birth date (e.g., 'June 15 1990', 'December 3 1985')",
        required: true
      },
      {
        name: "reference_date",
        description: "Reference date (e.g., 'today', 'January 1 2024')",
        required: false
      }
    ],
    handler: (args: { birth_date: string; reference_date?: string }) => {
      const { birth_date, reference_date = "today" } = args;
      const expression = `${reference_date} - ${birth_date}`;
      
      return {
        description: `Calculate age using SoulverCore syntax`,
        messages: [
          {
            role: "user" as const,
            content: {
              type: "text" as const,
              text: `Calculate age:
Birth Date: ${birth_date}
As of: ${reference_date}

SoulverCore expression: ${expression}`
            }
          }
        ]
      };
    }
  },

  deadline_calculator: {
    name: "deadline_calculator",
    title: "Deadline Calculator",
    description: "Calculate deadline dates by adding business days or time periods",
    arguments: [
      {
        name: "start_date",
        description: "Start date (e.g., 'today', 'Monday', 'January 15 2024')",
        required: true
      },
      {
        name: "duration",
        description: "Duration to add (e.g., '30 days', '2 weeks', '3 business days')",
        required: true
      }
    ],
    handler: (args: { start_date: string; duration: string }) => {
      const { start_date, duration } = args;
      const expression = `${start_date} + ${duration}`;
      
      return {
        description: `Calculate deadline using SoulverCore syntax`,
        messages: [
          {
            role: "user" as const,
            content: {
              type: "text" as const,
              text: `Calculate deadline:
Start: ${start_date}
Duration: ${duration}

SoulverCore expression: ${expression}`
            }
          }
        ]
      };
    }
  },

  recurring_date: {
    name: "recurring_date",
    title: "Recurring Date Calculator",
    description: "Calculate recurring dates (weekly, monthly, yearly intervals)",
    arguments: [
      {
        name: "base_date",
        description: "Base date (e.g., 'January 15 2024', 'first Monday of March')",
        required: true
      },
      {
        name: "interval",
        description: "Recurring interval (e.g., 'every 2 weeks', 'monthly', 'quarterly')",
        required: true
      },
      {
        name: "occurrences",
        description: "Number of occurrences (e.g., '5', '12')",
        required: false
      }
    ],
    handler: (args: { base_date: string; interval: string; occurrences?: string }) => {
      const { base_date, interval, occurrences } = args;
      let expression: string;
      
      if (occurrences) {
        expression = `${base_date} + ${interval} * ${occurrences}`;
      } else {
        expression = `${base_date} + ${interval}`;
      }
      
      return {
        description: `Calculate recurring date using SoulverCore syntax`,
        messages: [
          {
            role: "user" as const,
            content: {
              type: "text" as const,
              text: `Calculate recurring date:
Base Date: ${base_date}
Interval: ${interval}
${occurrences ? `Occurrences: ${occurrences}` : ''}

SoulverCore expression: ${expression}`
            }
          }
        ]
      };
    }
  }
};
