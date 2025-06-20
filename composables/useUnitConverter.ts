export type LengthUnit =
	| "inch" | "feet" | "yard" | "mile"
	| "millimeter" | "centimeter" | "decimeter" | "meter" | "decameter" | "hectometer" | "kilometer" | "megameter" | "gigameter"
	| "millimetre" | "centimetre" | "decimetre" | "metre" | "decametre" | "hectometre" | "kilometre" | "megametre" | "gigametre";
export type AreaUnit =
	| "square-inch" | "square-feet" | "square-yard" | "square-mile"
	| "square-millimeter" | "square-centimeter" | "square-decimeter" | "square-meter" | "square-decameter" | "square-hectometer" | "square-kilometer"
	| "square-millimetre" | "square-centimetre" | "square-decimetre" | "square-metre" | "square-decametre" | "square-hectometre" | "square-kilometre"
	| "are" | "hectare";

export const useUnitConverter = () => {
	return {
		convertLength: (input: number, unit: "inch" | "feet" | "yard" | "millimeter" | "centimeter" | "decimeter" | "meter") => {
		},
		toInch: (input: number, unit: "inch" | "feet" | "yard" | "millimeter" | "centimeter" | "decimeter" | "meter") => {
			let processBuffer = input;
			switch (unit) {
				case "inch":
					return input;
				case "feet":
					return input * 12;
				case "yard":
					return input * 36;
				case "meter":
					return processBuffer / 0.0254;
				case "decimeter":
					return processBuffer / 0.254;
				case "centimeter":
					return processBuffer / 2.54;
				case "millimeter":
					return processBuffer / 25.4;
			}
		},
		toMilliMeter: (input: number, unit: "inch" | "feet" | "yard" | "millimeter" | "centimeter" | "decimeter" | "meter") => {
			let processBuffer = input;
			switch (unit) {
				case "yard":
					return processBuffer * 914.4;
				case "feet":
					return processBuffer * 304.8;
				case "inch":
					return processBuffer * 25.4;
				case "meter":
					return processBuffer * 1000;
				case "decimeter":
					return processBuffer * 100;
				case "centimeter":
					return processBuffer * 10;
				case "millimeter":
					return processBuffer;
			}
		}
	}
}
