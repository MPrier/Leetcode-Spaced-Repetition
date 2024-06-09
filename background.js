chrome.webRequest.onCompleted.addListener(
    function(details) {
        if (details.url.includes('/problems/') && details.url.includes('/submit')) {
            const urlParts = details.url.split('/');
            const problemIdIndex = urlParts.indexOf('problems') + 1;
            const problemId = urlParts[problemIdIndex];
            
            console.log(`Problem submitted: ${problemId}`);
            chrome.storage.local.set({ lastProblemSubmitted: problemId});
            
            chrome.windows.create({
                url: chrome.runtime.getURL("difficulty.html"),
                type: "popup",
                width: 400,
                height: 600
            }, (newWindow) => {
                console.log('Popup opened, window ID:', newWindow.id);
                chrome.storage.local.set({ popupWindowId: newWindow.id });
              });
        }
    },
    { urls: ["*://leetcode.com/*"] }
);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action == 'storeResponse') {
        console.log(request.option);
        
        // Get and store the problem id and difficulty recorded for the last problem submitted
        // FUTURE: 
        // Add a check for the problem id in the completedProblemsList, 
        // Store all difficulty ratings and date taken for each problem attempt 
        chrome.storage.local.get({lastProblemSubmitted: null}, function (data) {
            chrome.storage.local.get({completedProblemList: []}, function (result) {
                var completedProblemList = result.completedProblemList;
                var problemId = data.lastProblemSubmitted;
                completedProblemList.push({problemId: problemId, difficulty: request.option});
                console.log(completedProblemList);
                chrome.storage.local.set({completedProblemList: completedProblemList});
            })
        });
        // Close the difficulty popup when the answer if received
        chrome.storage.local.get('popupWindowId', (data) => {
            if (data.popupWindowId) {
              chrome.windows.remove(data.popupWindowId);
              console.log('Popup closed, window ID:', data.popupWindowId);
            }
          });
    }
});