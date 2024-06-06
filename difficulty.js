// popup.js
document.getElementById('Easy').addEventListener('click', () => handleButtonClick('Easy'));
document.getElementById('Medium').addEventListener('click', () => handleButtonClick('Medium'));
document.getElementById('Hard').addEventListener('click', () => handleButtonClick('Hard'));

function handleButtonClick(option) {
    chrome.runtime.sendMessage({ action: 'storeResponse', option: option });

}
