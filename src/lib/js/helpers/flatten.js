/**
 * @fileOverview dafe
 */

/**
 * flatten - Flatten our object into pure key=>value pairss
 */
export const flatten = (into, node) => {

	return;
};

/**
 * @function helpers/flatten/findAllByParam
 * @param {object} into
 * @param {object} object
 * @param {string} [param="uid"]
 * @param {boolean} [returnJson=false]
 * @returns
 */
export const findAllByParam = (into = [], object, param = "uid", returnJson = false) => {

	if(object == null) return into;

	/**
	 * Is array
	 */
	if(Array.isArray(object)) {

		[...object].forEach((obj) => {
			return findAllByParam(into, obj, param, returnJson);
		});

		return into;
	}

	/**
	 * Is Object
	 */
	if(typeof object == "object") {

		if(object.link_type && object.link_type == "Document" && object.uid && object.uid !== "") {

			if(param === "uid") {

				if(object.type === "promo" || object.type === "shared_modules") {
					return into;
				}

				if(object.type === "link_list") {
					return findAllByParam(into, object.data.links, param, returnJson);
				}
			}

			if(into.indexOf(object[param]) > -1) {
				return into;
			}

			if(returnJson === true) {
				into.push(object);
			} else {
				into.push(object[param]);
			}
		}

		Object.keys(object).forEach((key) => {
			return findAllByParam(into, object[key], param, returnJson);
		});

		return into;
	}

	return into;
};
