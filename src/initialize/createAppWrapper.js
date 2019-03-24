export default function () {
	const body = document.querySelector('body');
	const appWrapper = document.createElement('div');
	body.append(appWrapper);
	appWrapper.id = 'graph-application';
	body.style.cssText = 'margin: 0';
	appWrapper.style.cssText = 'width: 100%; height: 100%; display: flex; flex-direction: column; position: relative';
	return appWrapper;
}