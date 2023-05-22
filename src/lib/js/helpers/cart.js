/**
 * formatCartLines
 * @param {*} cart
 * @param {object} lines
 * @param {object} lines[].line
 * @param {object} lines[].line.attributes
 * @param {string} lines[].line.attributes[].key
 * @param {string} lines[].line.attributes[].value
 * @param {string} lines[].line.id
 * @param {string} lines[].line.merchandiseId
 * @param {number} lines[].line.quantity
 * @param {string} lines[].line.sellingPlanId
 * @returns
 */
export const formatCartLines = (cart) => {

	if(!cart.lines) return [];

	let lines = [];

	[...cart.lines.edges].forEach((line) => {

		let lineObj = {
			attributes: line.node.attributes,
			id: line.node.id,
			merchandiseId: line.node.merchandise.id,
			quantity: line.node.quantity
		};

		if(line.node.sellingPlanAllocation) lineObj.sellingPlanId = line.node.sellingPlanAllocation.id;

		lines.push(lineObj);
	});

	return lines;
};