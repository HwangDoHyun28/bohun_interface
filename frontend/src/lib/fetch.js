// @ts-ignore

let site_root = "http://localhost:5173/";

export async function load(uri, method="GET", file=null) {
	let resp;
	if (method == "GET") {
		resp = await fetch(site_root + uri);
	} else if (method == "POST") {
		let data = null;
		if (file) {
			data = new FormData();
			data.append("file", file);
		}
		resp = await fetch(site_root + uri, {
			method: "POST",
			body: data,
		});
	}
	let rofftarget = await resp.json();
	return rofftarget;
}