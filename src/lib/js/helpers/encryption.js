import { CIV, SALT } from "$env/static/private";
import { browser } from "$app/environment";

export const encrypt = async (string) => {

	let crypto = (browser) ? undefined : await import("node:crypto");

	if(crypto) {

		let now = Date.now();
		let expires = now + (15 * 60 * 1000); // 15 minute link expiration

		let randomSalt = crypto.randomBytes(64);
		let master = Buffer.from(SALT, "binary");
		let key = crypto.createHash("sha256").update(randomSalt + master).digest();
		let iv = crypto.createHash("sha256").update(CIV).digest();

		let cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
		let encrypted = Buffer.concat([cipher.update(string, "utf8"), cipher.final()]);
		let tag = cipher.getAuthTag();
		let hash = Buffer.concat([randomSalt, iv, tag, encrypted, Buffer.from(now.toString())]).toString("hex");

		return {
			hash: hash,
			expires: expires
		}
	}

	// error state? no crypto lib
	return {}
}

export const decrypt = async (hash) => {

	let crypto = (browser) ? undefined : await import("node:crypto");
	let decrypted;

	if(crypto) {

		let data = Buffer.from(hash, "hex");

		let randomSalt = data.subarray(0, 64); // 64-bit
		let iv = data.subarray(64, 96); // 32-bit
		let tag = data.subarray(96, 112); // 32-bit
		let encrypted = data.subarray(112, 148); // 32-bit
		let expires = data.subarray(148); // 16-bit

		let created = parseInt(expires.toString());
		let now = Date.now();
		let duration = (15 * 60 * 1000); // 15 minutes

		if(now - created > duration) {

			return {
				expired: true
			}
		}

		let master = Buffer.from(SALT, "binary");
		let key = crypto.createHash("sha256").update(randomSalt + master).digest();
		let decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);

		try {

			decipher.setAuthTag(tag);
			decrypted = decipher.update(encrypted, "binary", "utf8") + decipher.final("utf8");

		} catch(error) {
			console.log("ERROR", error);
		}
	}

	return {
		token: decrypted
	}
}
