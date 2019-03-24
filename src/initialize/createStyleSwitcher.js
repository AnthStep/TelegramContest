export default function (appWrapper) {
	const switcher = document.createElement('div');
	appWrapper.style.paddingBottom = '150px';
	switcher.style.cssText = 'position: fixed; bottom: 0; width: 100%; height: 150px; display: flex; justify-content: center; align-items: center; font-family: sans-serif; z-index: 10; user-select: none; -webkit-user-select: none; font-weight: 300';
	appWrapper.append(switcher);
	return switcher;
}