export default function(url, cb) {
	const request = new XMLHttpRequest();
	request.open('GET', url);
	request.responseType = 'json';
	request.onload = () => cb(request.response);
	request.send();
}