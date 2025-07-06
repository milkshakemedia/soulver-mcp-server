/**
 * SoulverCore syntax guide resources
 * Comprehensive documentation for SoulverCore mathematical expressions
 */

export const syntaxGuideResources = {
  "syntax-guide": {
    uri: "soulver://syntax/guide",
    name: "SoulverCore Syntax Guide",
    title: "📖 Complete SoulverCore Syntax Reference",
    description: "Comprehensive guide to SoulverCore mathematical expression syntax",
    mimeType: "text/markdown",
    content: `# SoulverCore Syntax Guide

## Overview
SoulverCore uses natural language mathematical expressions that are intuitive and powerful. This guide covers the complete syntax for various types of calculations.

## Basic Arithmetic

### Simple Operations
- \`10 + 5\` → 15
- \`20 - 8\` → 12
- \`6 * 7\` → 42
- \`100 / 4\` → 25

### With Currency
- \`$10 + $5\` → $15
- \`€50 - €20\` → €30
- \`£100 * 2\` → £200

## Financial Calculations

### Compound Interest
**Syntax**: \`$amount over time at rate%\`
- \`$25k over 10 years at 7.5%\` → $51,525.79
- \`$1000 over 5 years at 3%\` → $1,159.27

### Hourly Wages
**Syntax**: \`$rate/hour * hours of work\`
- \`$25/hour * 14 hours of work\` → $350.00
- \`$15/hour * 40 hours\` → $600.00

### Tips and Service Charges
**Syntax**: \`$amount for item + percentage% tip\`
- \`$10 for lunch + 15% tip\` → $11.50
- \`$50 for dinner + 20% tip\` → $60.00

## Percentage Calculations

### Percentage of Value
**Syntax**: \`percentage% of value\`
- \`15% of $100\` → $15
- \`25% of 200\` → 50

### What Percentage
**Syntax**: \`value as % of total\`
- \`40 as % of 90\` → 44.44%
- \`25 as % of 100\` → 25%

### Reverse Percentage
**Syntax**: \`$result is percentage% on what\`
- \`$150 is 25% on what\` → $120
- \`$30 is 15% on what\` → $200

## Unit Conversions

### Weight
**Syntax**: \`value unit in target_unit\`
- \`65 kg in pounds\` → 143.3 lb
- \`150 lbs in kg\` → 68.04 kg

### Distance
- \`10 miles in km\` → 16.09 km
- \`5 km in miles\` → 3.11 miles

### Temperature
- \`32 fahrenheit in celsius\` → 0°C
- \`100 celsius in fahrenheit\` → 212°F

## Date Arithmetic

### Adding Time Periods
**Syntax**: \`date + period\`
- \`January 30 2020 + 3 months 2 weeks 5 days\` → May 19, 2020
- \`today + 2 weeks\` → (calculated from current date)

### Date Differences
**Syntax**: \`end_date - start_date\`
- \`December 31 2024 - January 1 2024\` → 365 days
- \`today - January 1 2024\` → (days since Jan 1)

## Time Zone Conversions

**Syntax**: \`time in location to location\`
- \`9:35am in New York to Japan\` → 10:35 pm
- \`3:00pm in London to Los Angeles\` → 7:00 am

## Advanced Features

### Multiple Operations
- \`($100 + $50) * 1.08\` → $162 (with tax)
- \`$1000 * 12 months\` → $12,000 (annual)

### Variables and References
- Use descriptive text: \`salary of $50k per year\`
- Reference previous calculations in context

## Best Practices

1. **Use Natural Language**: Write expressions as you would speak them
2. **Include Units**: Always specify currency symbols, units, and time periods
3. **Be Specific**: Use exact dates and clear descriptions
4. **Test Complex Expressions**: Break down complex calculations into steps

## Common Patterns

### Financial Planning
- \`$500/month * 12 months\` → $6,000 (annual savings)
- \`$200k mortgage at 4% for 30 years\` → monthly payment

### Project Planning
- \`project start date + 6 weeks\` → deadline
- \`40 hours/week * $75/hour\` → weekly income

### Health & Fitness
- \`180 lbs - 10 lbs\` → target weight
- \`2000 calories - 500 calories\` → deficit

## Error Prevention

### Common Mistakes
- Missing currency symbols: Use \`$100\` not \`100\`
- Unclear time periods: Use \`5 years\` not \`5\`
- Ambiguous percentages: Use \`15%\` not \`0.15\`

### Syntax Validation
- Always include units for measurements
- Use consistent date formats
- Specify time zones for time conversions
`
  },

  "quick-reference": {
    uri: "syntax://quick-reference",
    name: "Quick Reference",
    title: "⚡ SoulverCore Quick Reference",
    description: "Quick reference for common SoulverCore syntax patterns",
    mimeType: "text/markdown",
    content: `# SoulverCore Quick Reference

## Financial
- \`$amount over time at rate%\` - Compound interest
- \`$rate/hour * hours of work\` - Hourly wages
- \`$amount for item + tip% tip\` - Tips
- \`amount as % of total\` - Percentage calculation
- \`$result is percentage% on what\` - Reverse percentage

## Conversions
- \`value unit in target_unit\` - Unit conversion
- \`time in location to location\` - Time zones

## Dates
- \`date + period\` - Add time to date
- \`end_date - start_date\` - Date difference

## Examples
- \`$25k over 10 years at 7.5%\` → $51,525.79
- \`65 kg in pounds\` → 143.3 lb
- \`40 as % of 90\` → 44.44%
- \`January 30 2020 + 3 months\` → April 30, 2020
`
  }
};
