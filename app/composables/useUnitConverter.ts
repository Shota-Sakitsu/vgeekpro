export type LengthUnit =
	| "inch" | "feet" | "yard" | "mile"
	| "millimeter" | "centimeter" | "decimeter" | "meter" | "decameter" | "hectometer" | "kilometer"
	| "millimetre" | "centimetre" | "decimetre" | "metre" | "decametre" | "hectometre" | "kilometre";
export type AreaUnit =
	| "square-inch" | "square-feet" | "square-yard" | "square-mile"
	| "square-millimeter" | "square-centimeter" | "square-decimeter" | "square-meter" | "square-decameter" | "square-hectometer" | "square-kilometer"
	| "square-millimetre" | "square-centimetre" | "square-decimetre" | "square-metre" | "square-decametre" | "square-hectometre" | "square-kilometre"
	| "are" | "hectare";

const convertLength = (input: number, fromUnit: LengthUnit, toUnit?: LengthUnit) => {
	let processBuffer = input;
	switch (fromUnit) {
		case "kilometer":
		case "hectometer":
		case "decameter":
		case "meter":
		case "decimeter":
		case "centimeter":
		case "millimeter":
			fromUnit = fromUnit.replace(/meter$/, "metre") as LengthUnit;
	}
	switch (fromUnit) {
		case "kilometre":
			processBuffer *= 1000000;
			break;
		case "hectometre":
			processBuffer *= 100000;
			break;
		case "decametre":
			processBuffer *= 10000;
			break;
		case "metre":
			processBuffer *= 1000;
			break;
		case "decimetre":
			processBuffer *= 100;
			break;
		case "centimetre":
			processBuffer *= 10;
			break;
		case "millimetre":
			break;
		case "mile":
			processBuffer *= 1609344;
			break;
		case "yard":
			processBuffer *= 914.4;
			break;
		case "feet":
			processBuffer *= 304.8;
			break;
		case "inch":
			processBuffer *= 25.4;
			break;
	}
	if (toUnit === undefined) {
		const measurementUnit = useCookie("intl-measurement");
		switch (measurementUnit.value) {
			case "yard":
				if (processBuffer < 304.8) {
					toUnit = "inch";
				} else if (processBuffer < 914.4) {
					toUnit = "feet";
				} else if (processBuffer < 1609344) {
					toUnit = "yard";
				} else {
					toUnit = "mile";
				}
				break;
			case "metre":
				if (processBuffer < 10) {
					toUnit = "millimetre";
				} else if (processBuffer < 100) {
					toUnit = "centimetre";
				} else if (processBuffer < 1000) {
					toUnit = "decimetre";
				} else if (processBuffer < 1000000) {
					toUnit = "metre";
				} else {
					toUnit = "kilometre";
				}
				break;
			default:
				toUnit = "metre";
		}
	} else {
		switch (toUnit) {
			case "kilometer":
			case "hectometer":
			case "decameter":
			case "meter":
			case "decimeter":
			case "centimeter":
			case "millimeter":
				toUnit = toUnit.replace(/meter$/, "metre") as LengthUnit;
		}
	}
	switch (toUnit) {
		case "kilometre":
			return processBuffer / 1000000;
		case "hectometre":
			return processBuffer / 100000;
		case "decametre":
			return processBuffer / 10000;
		case "metre":
			return processBuffer / 1000;
		case "decimetre":
			return processBuffer / 100;
		case "centimetre":
			return processBuffer / 10;
		case "millimetre":
			return processBuffer;
		case "mile":
			return processBuffer / 1609344;
		case "yard":
			return processBuffer / 914.4;
		case "feet":
			return processBuffer / 304.8;
		case "inch":
			return processBuffer / 25.4;
	}
	throw new Error("Unknown unit");
};
const getUnitSuffix = (unit: LengthUnit) => {
	switch (unit) {
		case "kilometer":
		case "kilometre":
			return "km";
		case "hectometer":
		case "hectometre":
			return "hm";
		case "decameter":
		case "decametre":
			return "dam";
		case "meter":
		case "metre":
			return "m";
		case "decimeter":
		case "decimetre":
			return "dm";
		case "centimeter":
		case "centimetre":
			return "cm";
		case "millimeter":
		case "millimetre":
			return "mm";
		case "mile":
			return "mi";
		case "yard":
			return "yd";
		case "feet":
			return "ft";
		case "inch":
			return "in";
	}
	throw new Error("Unknown unit");
}
export const useUnitConverter = () => {
	return {
		convertLength,
		convertLengthAsString: (input: number, fromUnit: LengthUnit, toUnit?: LengthUnit, useInteger: boolean = true) => {
			switch (fromUnit) {
				case "kilometer":
				case "hectometer":
				case "decameter":
				case "meter":
				case "decimeter":
				case "centimeter":
				case "millimeter":
					fromUnit = fromUnit.replace(/meter$/, "metre") as LengthUnit;
			}
			if (toUnit === undefined) {
				const measurementUnit = useCookie("intl-measurement");
				const processBuffer = convertLength(input, fromUnit, "millimetre");
				switch (measurementUnit.value) {
					case "yard":
						if (processBuffer < 304.8) {
							toUnit = "inch";
						} else if (processBuffer < 914.4) {
							toUnit = "feet";
						} else if (processBuffer < 1609344) {
							toUnit = "yard";
						} else {
							toUnit = "mile";
						}
						break;
					case "metre":
						if (processBuffer < 10) {
							toUnit = "millimetre";
						} else if (processBuffer < 100) {
							toUnit = "centimetre";
						} else if (processBuffer < 1000) {
							toUnit = "decimetre";
						} else if (processBuffer < 1000000) {
							toUnit = "metre";
						} else {
							toUnit = "kilometre";
						}
						break;
					default:
						toUnit = "metre";
				}
			} else {
				switch (toUnit) {
					case "kilometer":
					case "hectometer":
					case "decameter":
					case "meter":
					case "decimeter":
					case "centimeter":
					case "millimeter":
						toUnit = toUnit.replace(/meter$/, "metre") as LengthUnit;
				}
			}
			const toValue = convertLength(input, fromUnit, toUnit);
			const toUnitName = getUnitSuffix(toUnit);
			if (toUnit == "millimetre" || toUnit == "inch" || !useInteger) {
				return `${Math.round(toValue * 100) / 100}${toUnitName}`;
			}
			const toValueInteger = Math.floor(toValue);
			if (toValue % 1 == 0) {
				return `${toValueInteger}${toUnitName}`;
			}
			let nextUnit: LengthUnit = "millimetre";
			switch (toUnit) {
				case "mile":
					nextUnit = "yard";
					break;
				case "yard":
					nextUnit = "feet";
					break;
				case "feet":
					nextUnit = "inch";
					break;
				case "kilometre":
				case "hectometre":
				case "decametre":
					nextUnit = "metre";
					break;
				case "meter":
				case "decimetre":
					nextUnit = "centimetre";
					break;
				case "centimetre":
					nextUnit = "millimetre";
					break;
			}
			const nextValue = convertLength(toValue % 1, toUnit, nextUnit);
			const nextValueInteger = Math.floor(nextValue);
			const nextUnitName = getUnitSuffix(nextUnit);
			return `${toValueInteger}${toUnitName} ${nextValueInteger}${nextUnitName}`;
		},
		getUnitSuffix,
	}
}
