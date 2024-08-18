chrome.webRequest.onCompleted.addListener(
    function(details) {
        if (details.url.includes('/problems/') && details.url.includes('/submit')) {
            const urlParts = details.url.split('/');
            const problemIdIndex = urlParts.indexOf('problems') + 1;
            const problemId = urlParts[problemIdIndex];
            
            console.log(`Problem submitted: ${problemId}`);
            chrome.storage.local.set({ lastProblemSubmitted: problemId});
            
            chrome.storage.local.get({completedProblemList: []}, function (result) {
                completedProblemList = result.completedProblemList;
                //if (completedProblemList.find(e => e.problemId === problemId)) {
                    chrome.windows.create({
                        url: chrome.runtime.getURL("difficulty.html"),
                        type: "popup",
                        width: 400,
                        height: 600
                    }, (newWindow) => {
                        console.log('Popup opened, window ID:', newWindow.id);
                        chrome.storage.local.set({ popupWindowId: newWindow.id });
                      });
                //}
            })
            
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
                var date = new Date();
                var reviewDate = date.toDateString()
                date.setDate(date.getDate() + 1)
                console.log(date.toDateString())
                var nextReviewDate = date.toDateString()
        
                //difficulty: request.option
                if (!completedProblemList.find(e => e.problemId === problemId)) {
                    completedProblemList.push({
                        problemId: problemId,
                        eFactor: 2.5, 
                        interval: 1, 
                        repetitions: 1,
                        nextReviewDate: nextReviewDate,
                        allReviewDates: [reviewDate]
                    });
                }
                
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
    else if (request.action == 'clear') {
        chrome.storage.local.set({completedProblemList: []})
    }
    else {
        var todays = new Date()
        var problemData = {
            problemId: "fart",
            eFactor: 2.5,
            interval: 1,
            repetition: 1,
            nextReviewDate: new Date(todays.setDate(todays.getDate() + 1)), // Set next review to tomorrow
            lastReviewed: todays
        };
        console.log(updateProblemReview(problemData, 1))
        console.log(JSON.stringify(problemData))
    }
});


function updateProblemReview(problem, qualityOfRecall) {
    //chrome.storage.local.get({completedProblemList: []}, function(result) {
        // var completedProblemList = result.completedProblemList;
        // var problem = completedProblemList.find(p => p.problemId === problemId);
        // if (!problem) return;

        var today = new Date();

        // Adjust the E-Factor
        var q = qualityOfRecall; // Feedback score: 0 (forgot) to 5 (perfect recall)
        problem.eFactor = Math.max(1.3, problem.eFactor + 0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));

        if (q >= 3) {
            if (problem.repetition === 1) {
                problem.interval = 1;
            } else if (problem.repetition === 2) {
                problem.interval = 6;
            } else {
                problem.interval *= problem.eFactor;
            }
            problem.repetition += 1;
        } else {
            problem.repetition = 1;
            problem.interval = 1;
        }

        problem.lastReviewed = today;
        problem.nextReviewDate = new Date(today);
        problem.nextReviewDate.setDate(today.getDate() + Math.round(problem.interval));
        //chrome.storage.local.set({completedProblemList: completedProblemList});
        return (problem.nextReviewDate, problem.lastReviewed) 
    //});
}



