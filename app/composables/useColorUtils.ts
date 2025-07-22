export const useColorUtils = () => {
	return {
		hsv2rgb: (h: number, s: number, v: number, useFloatInput: boolean = true, useFloatOutput: boolean = false): { r: number, g: number, b: number } => {
			if (!useFloatInput) {
				h /= 360.0;
				s /= 100.0;
				v /= 100.0;
			}
			let r = v;
			let g = v;
			let b = v;
			if (s > 0.0) {
				h *= 6.0;
				const i = Math.floor(h);
				const f = h - i;
				switch (i) {
					default:
					case 0:
						g *= 1 - s * (1 - f);
						b *= 1 - s;
						break;
					case 1:
						r *= 1 - s * f;
						b *= 1 - s;
						break;
					case 2:
						r *= 1 - s;
						b *= 1 - s * (1 - f);
						break;
					case 3:
						r *= 1 - s;
						g *= 1 - s * f;
						break;
					case 4:
						r *= 1 - s * (1 - f);
						g *= 1 - s;
						break;
					case 5:
						g *= 1 - s;
						b *= 1 - s * f;
						break;
				}
			}
			return useFloatOutput ? {
				"r": r,
				"g": g,
				"b": b,
			} : {
				"r": Math.round(r * 255),
				"g": Math.round(g * 255),
				"b": Math.round(b * 255),
			};
		}
	}
}
