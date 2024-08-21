// popup.js
document.getElementById('Easy').addEventListener('click', () => handleButtonClick(5));
document.getElementById('Medium').addEventListener('click', () => handleButtonClick(3));
document.getElementById('Hard').addEventListener('click', () => handleButtonClick(0));

function handleButtonClick(option) {
    chrome.runtime.sendMessage({ action: 'storeResponse', option: option });

}
