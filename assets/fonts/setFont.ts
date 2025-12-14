import { Text, TextStyle } from "react-native";

export function setupTypography() {
	const oldRender = Text.render;

	Text.render = function (...args) {
		const origin = oldRender.call(this, ...args);
		const props = origin.props;

		const style = Array.isArray(props.style)
			? Object.assign({}, ...props.style)
			: props.style || {};

		let fontFamily = "Nunito-Regular";

		if (
			style.fontWeight === "bold" ||
			style.fontWeight === "700" ||
			style.fontWeight === "800"
		) {
			fontFamily = "Nunito-Regular";
		} else if (
			style.fontWeight === "600" ||
			style.fontWeight === "500"
		) {
			fontFamily = "Nunito-Regular";
		}

		return {
			...origin,
			props: {
				...props,
				style: [{ fontFamily }, props.style],
			},
		};
	};
}

