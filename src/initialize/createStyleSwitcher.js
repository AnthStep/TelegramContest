export default function (appWrapper) {
	const switcher = document.createElement('button');
	appWrapper.style.paddingBottom = '75px';
	switcher.style.cssText = 'position: fixed; bottom: 0; width: 100%; height: 75px; display: flex; justify-content: center; align-items: center; font-family: sans-serif; z-index: 10; user-select: none; -webkit-user-select: none; font-weight: 300; border: none; outline: none; font-size: 14px';
	appWrapper.append(switcher);
	return switcher;
}