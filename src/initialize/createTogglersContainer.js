export default function (appContainer) {
	const togglersContaier = document.createElement('div');
	togglersContaier.style.cssText = 'margin-top: 15px';
	appContainer.append(togglersContaier);
	return togglersContaier;
}