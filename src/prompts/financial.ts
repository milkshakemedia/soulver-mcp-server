import { z } from "zod";

/**
 * Financial calculation prompts for SoulverCore
 * Based on actual SoulverCore syntax examples
 */

export const financialPrompts = {
  compound_interest: {
    name: "compound_interest",
    title: "Compound Interest Calculator",
    description: "Calculate compound interest using SoulverCore syntax: '$amount over time at rate%'",
    arguments: [
      {
        name: "principal",
        description: "Principal amount with currency symbol (e.g., '$25k', '$10000')",
        required: true
      },
      {
        name: "time",
        description: "Time period (e.g., '10 years', '5 years')",
        required: true
      },
      {
        name: "rate",
        description: "Interest rate with % symbol (e.g., '7.5%', '5%')",
        required: true
      }
    ],
    handler: (args: { principal: string; time: string; rate: string }) => {
      const { principal, time, rate } = args;
      const expression = `${principal} over ${time} at ${rate}`;
      
      return {
        description: `Compound interest calculation using SoulverCore syntax`,
        messages: [
          {
            role: "user" as const,
            content: {
              type: "text" as const,
              text: `Calculate compound interest for:
Principal: ${principal}
Time: ${time}
Rate: ${rate}

SoulverCore expression: ${expression}`
            }
          }
        ]
      };
    }
  },

  hourly_wage: {
    name: "hourly_wage",
    title: "Hourly Wage Calculator",
    description: "Calculate total pay from hourly rate and hours worked",
    arguments: [
      {
        name: "hourly_rate",
        description: "Hourly rate with currency (e.g., '$25/hour', '$15/hour')",
        required: true
      },
      {
        name: "hours",
        description: "Hours worked (e.g., '14 hours', '40 hours')",
        required: true
      },
      {
        name: "work_type",
        description: "Optional work description (e.g., 'of work', 'overtime')",
        required: false
      }
    ],
    handler: (args: { hourly_rate: string; hours: string; work_type?: string }) => {
      const { hourly_rate, hours, work_type = "of work" } = args;
      const expression = `${hourly_rate} * ${hours} ${work_type}`;
      
      return {
        description: `Hourly wage calculation`,
        messages: [
          {
            role: "user" as const,
            content: {
              type: "text" as const,
              text: `Calculate total pay:
Rate: ${hourly_rate}
Hours: ${hours}
Type: ${work_type}

SoulverCore expression: ${expression}`
            }
          }
        ]
      };
    }
  },

  tip_calculator: {
    name: "tip_calculator",
    title: "Tip Calculator",
    description: "Calculate total cost including tip using SoulverCore syntax",
    arguments: [
      {
        name: "base_amount",
        description: "Base amount with currency (e.g., '$10', '$25.50')",
        required: true
      },
      {
        name: "item_description",
        description: "What the amount is for (e.g., 'for lunch', 'for dinner')",
        required: true
      },
      {
        name: "tip_percentage",
        description: "Tip percentage (e.g., '15%', '20%')",
        required: true
      }
    ],
    handler: (args: { base_amount: string; item_description: string; tip_percentage: string }) => {
      const { base_amount, item_description, tip_percentage } = args;
      const expression = `${base_amount} ${item_description} + ${tip_percentage} tip`;
      
      return {
        description: `Tip calculation with total cost`,
        messages: [
          {
            role: "user" as const,
            content: {
              type: "text" as const,
              text: `Calculate total cost with tip:
Base: ${base_amount} ${item_description}
Tip: ${tip_percentage}

SoulverCore expression: ${expression}`
            }
          }
        ]
      };
    }
  },

  percentage_reverse: {
    name: "percentage_reverse",
    title: "Reverse Percentage Calculator",
    description: "Find the original value when you know the result and percentage",
    arguments: [
      {
        name: "result_amount",
        description: "The result amount with currency (e.g., '$150', '$120')",
        required: true
      },
      {
        name: "percentage",
        description: "The percentage (e.g., '25%', '15%')",
        required: true
      }
    ],
    handler: (args: { result_amount: string; percentage: string }) => {
      const { result_amount, percentage } = args;
      const expression = `${result_amount} is ${percentage} on what`;
      
      return {
        description: `Find original value from percentage result`,
        messages: [
          {
            role: "user" as const,
            content: {
              type: "text" as const,
              text: `Find the original amount:
Result: ${result_amount}
Percentage: ${percentage}

SoulverCore expression: ${expression}`
            }
          }
        ]
      };
    }
  },

  percentage_of_total: {
    name: "percentage_of_total",
    title: "Percentage of Total Calculator",
    description: "Calculate what percentage one value is of another",
    arguments: [
      {
        name: "part_value",
        description: "The part value (e.g., '40', '$50')",
        required: true
      },
      {
        name: "total_value",
        description: "The total value (e.g., '90', '$200')",
        required: true
      }
    ],
    handler: (args: { part_value: string; total_value: string }) => {
      const { part_value, total_value } = args;
      const expression = `${part_value} as % of ${total_value}`;
      
      return {
        description: `Calculate percentage of total`,
        messages: [
          {
            role: "user" as const,
            content: {
              type: "text" as const,
              text: `Calculate what percentage:
Part: ${part_value}
Total: ${total_value}

SoulverCore expression: ${expression}`
            }
          }
        ]
      };
    }
  }
};
