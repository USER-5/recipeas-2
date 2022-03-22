/** List of known units, including plurals. case-insensitive */
export const KNOWN_UNITS = [
  // MASS
  // grams
  "g",
  "grams",
  "gram",
  // kilogram
  "kg",
  "kilograms",
  "kilos",
  "kilogram",
  // ounces
  "oz",
  "ounce",
  "ounces",
  // pounds
  "lb",
  "lbs",
  "pounds",
  "pound",
  // VOLUME
  // milillitres
  "ml",
  "mils",
  "mil",
  "millilitres",
  "milliliters",
  "millilitre",
  "milliliter",
  // litres
  "l",
  "litre",
  "litres",
  "liter",
  "liters",
  // fluid ounces
  "floz",
  // gallons
  "gal",
  "gals",
  "gallon",
  "gallons",
  // quarts
  "qt",
  "quart",
  "quarts",
  // pints
  "pint",
  "pints",
  // CUPS AND ASSOCIATED
  // teaspoon
  "tsp",
  "tsps",
  "teaspoon",
  "teaspoons",
  // tablespoon
  "tbsp",
  "tbsps",
  "tablespoon",
  "tablespoons",
  // cups
  "cup",
  "cups",
  // ASSORTED
  "cloves",
  "clove",
  "knob",
  "knobs",
  "bunch",
  "bunches",
  "leaf",
  "leaves",
  "tub",
  "tubs",
  "thumb",
  "thumbs",
  "piece",
  "pieces",
  "square",
  "squares",
  "scoop",
  "scoops",
  "pinch",
  "pinches",
  "sprinkle",
  "dash",
  "splash",
  "drizzle",
  "pint",
  "pints",
  "cm",
  "centimeter",
  "cms",
  "centimeters",
  "centimetre",
  "centimetres",
  "inch",
  "inches",
  "in",
  "spray",
  "squeeze",
  "squeeze",
];

/** Often come before a know unit e.g. "a GENEROUS pinch of salt" */
export const KNOWN_PREFIXES = ["generous", "large", "small"];

/** List of strings to ignore */
export const KNOWN_UNIT_IGNORE = ["each", "ea", "of", "x", "*", "a"];
