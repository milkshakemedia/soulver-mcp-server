/**
 * Unit conversion prompts for SoulverCore
 * Based on actual SoulverCore syntax examples
 */

export const conversionPrompts = {
  weight_conversion: {
    name: "weight_conversion",
    title: "Weight Conversion",
    description: "Convert between weight units using SoulverCore syntax: 'value unit in target_unit'",
    arguments: [
      {
        name: "value",
        description: "Weight value (e.g., '65', '150')",
        required: true
      },
      {
        name: "from_unit",
        description: "Source unit (e.g., 'kg', 'pounds', 'lbs', 'grams')",
        required: true
      },
      {
        name: "to_unit",
        description: "Target unit (e.g., 'pounds', 'kg', 'lbs', 'grams')",
        required: true
      }
    ],
    handler: (args: { value: string; from_unit: string; to_unit: string }) => {
      const { value, from_unit, to_unit } = args;
      const expression = `${value} ${from_unit} in ${to_unit}`;
      
      return {
        description: `Weight conversion using SoulverCore syntax`,
        messages: [
          {
            role: "user" as const,
            content: {
              type: "text" as const,
              text: `Convert weight:
Value: ${value}
From: ${from_unit}
To: ${to_unit}

SoulverCore expression: ${expression}`
            }
          }
        ]
      };
    }
  },

  distance_conversion: {
    name: "distance_conversion",
    title: "Distance Conversion",
    description: "Convert between distance units (miles, kilometers, feet, meters, etc.)",
    arguments: [
      {
        name: "value",
        description: "Distance value (e.g., '10', '5.5')",
        required: true
      },
      {
        name: "from_unit",
        description: "Source unit (e.g., 'miles', 'km', 'feet', 'meters')",
        required: true
      },
      {
        name: "to_unit",
        description: "Target unit (e.g., 'km', 'miles', 'meters', 'feet')",
        required: true
      }
    ],
    handler: (args: { value: string; from_unit: string; to_unit: string }) => {
      const { value, from_unit, to_unit } = args;
      const expression = `${value} ${from_unit} in ${to_unit}`;
      
      return {
        description: `Distance conversion using SoulverCore syntax`,
        messages: [
          {
            role: "user" as const,
            content: {
              type: "text" as const,
              text: `Convert distance:
Value: ${value}
From: ${from_unit}
To: ${to_unit}

SoulverCore expression: ${expression}`
            }
          }
        ]
      };
    }
  },

  temperature_conversion: {
    name: "temperature_conversion",
    title: "Temperature Conversion",
    description: "Convert between temperature units (Fahrenheit, Celsius, Kelvin)",
    arguments: [
      {
        name: "value",
        description: "Temperature value (e.g., '32', '100')",
        required: true
      },
      {
        name: "from_unit",
        description: "Source unit (e.g., 'fahrenheit', 'celsius', 'kelvin')",
        required: true
      },
      {
        name: "to_unit",
        description: "Target unit (e.g., 'celsius', 'fahrenheit', 'kelvin')",
        required: true
      }
    ],
    handler: (args: { value: string; from_unit: string; to_unit: string }) => {
      const { value, from_unit, to_unit } = args;
      const expression = `${value} ${from_unit} in ${to_unit}`;
      
      return {
        description: `Temperature conversion using SoulverCore syntax`,
        messages: [
          {
            role: "user" as const,
            content: {
              type: "text" as const,
              text: `Convert temperature:
Value: ${value}
From: ${from_unit}
To: ${to_unit}

SoulverCore expression: ${expression}`
            }
          }
        ]
      };
    }
  },

  time_zone_conversion: {
    name: "time_zone_conversion",
    title: "Time Zone Conversion",
    description: "Convert time between time zones using SoulverCore syntax",
    arguments: [
      {
        name: "time",
        description: "Time with format (e.g., '9:35am', '2:30pm')",
        required: true
      },
      {
        name: "from_location",
        description: "Source location/timezone (e.g., 'New York', 'London', 'PST')",
        required: true
      },
      {
        name: "to_location",
        description: "Target location/timezone (e.g., 'Japan', 'London', 'EST')",
        required: true
      }
    ],
    handler: (args: { time: string; from_location: string; to_location: string }) => {
      const { time, from_location, to_location } = args;
      const expression = `${time} in ${from_location} to ${to_location}`;
      
      return {
        description: `Time zone conversion using SoulverCore syntax`,
        messages: [
          {
            role: "user" as const,
            content: {
              type: "text" as const,
              text: `Convert time between zones:
Time: ${time}
From: ${from_location}
To: ${to_location}

SoulverCore expression: ${expression}`
            }
          }
        ]
      };
    }
  },

  volume_conversion: {
    name: "volume_conversion",
    title: "Volume Conversion",
    description: "Convert between volume units (liters, gallons, cups, etc.)",
    arguments: [
      {
        name: "value",
        description: "Volume value (e.g., '2', '5.5')",
        required: true
      },
      {
        name: "from_unit",
        description: "Source unit (e.g., 'liters', 'gallons', 'cups', 'ml')",
        required: true
      },
      {
        name: "to_unit",
        description: "Target unit (e.g., 'gallons', 'liters', 'ml', 'cups')",
        required: true
      }
    ],
    handler: (args: { value: string; from_unit: string; to_unit: string }) => {
      const { value, from_unit, to_unit } = args;
      const expression = `${value} ${from_unit} in ${to_unit}`;
      
      return {
        description: `Volume conversion using SoulverCore syntax`,
        messages: [
          {
            role: "user" as const,
            content: {
              type: "text" as const,
              text: `Convert volume:
Value: ${value}
From: ${from_unit}
To: ${to_unit}

SoulverCore expression: ${expression}`
            }
          }
        ]
      };
    }
  }
};
