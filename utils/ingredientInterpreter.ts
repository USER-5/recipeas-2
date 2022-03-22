import { Ingredient } from "@prisma/client";
import { KNOWN_PREFIXES, KNOWN_UNITS, KNOWN_UNIT_IGNORE } from "./knownUnits";

export type InterpretedIngredient = Pick<
  Ingredient,
  "amount" | "unit" | "name" | "notes"
>;

export function interpretIngredient(input: string): InterpretedIngredient {
  let tokens = input
    .split(" ")
    // remove known fluff
    .map((t) => t.toLowerCase().replace(/[^0-9a-zA-Z/.]/g, ""))
    .filter((token) => !KNOWN_UNIT_IGNORE.includes(token));

  // grab the unit name, and remove from tokens
  const unitName = tokens.find((token) => KNOWN_UNITS.includes(token)) || "";
  const unitPrefix = tokens.find((token) => KNOWN_PREFIXES.includes(token));
  const unit = unitPrefix ? unitPrefix + " " + unitName : unitName;

  // grab the amount
  var amount: number;
  var amountString =
    tokens.find((token) => ![NaN, undefined].includes(parseFloat(token))) ||
    "1";
  if (amountString.includes("/")) {
    // have to do division
    const splitAmount = amountString.split("/");
    // catch if no good
    if (
      splitAmount.length !== 2 ||
      parseFloat(splitAmount[1]) === NaN ||
      parseFloat(splitAmount[0]) === NaN
    ) {
      amount = parseFloat(splitAmount[0]);
    }
    amount = parseFloat(splitAmount[0]) / parseFloat(splitAmount[1]);
  } else {
    amount = parseFloat(amountString);
  }

  // grab the notes (if exist)
  // notes have one of: a comma, a dash, or a hyphen.
  // use the untokenized version to find this
  let notes = "";
  let notesIndex: number;
  if (input.split(", ").length > 1) {
    notesIndex = input.indexOf(", ");
    notes = input.substring(notesIndex + 2);
    input = input.substring(0, notesIndex);
  } else if (input.split(" (").length > 1) {
    notesIndex = input.indexOf(" (");
    notes = input.substring(notesIndex + 1);
    input = input.substring(0, notesIndex);
  } else if (input.split(" - ").length > 1) {
    notesIndex = input.indexOf(" - ");
    notes = input.substring(notesIndex + 3);
    input = input.substring(0, notesIndex);
  }

  //retokenise, and filter the other stuff
  tokens = input
    .split(" ")
    .filter(
      (token) =>
        ![...KNOWN_PREFIXES, ...KNOWN_UNITS, ...KNOWN_UNIT_IGNORE].includes(
          token.toLowerCase().replace(/[^0-9a-zA-Z/.]/g, "")
        ) && token !== amountString
    );
  // note that we didn't make all the tokens lowercase this time
  const name = tokens.join(" ");

  if (!name)
    return {
      name: "unknown",
      amount,
      unit,
      notes,
    };

  return {
    name,
    amount,
    unit,
    notes,
  };
}
