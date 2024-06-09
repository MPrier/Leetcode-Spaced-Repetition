document.addEventListener('DOMContentLoaded', () => {
    const objectList = document.getElementById('History');
  
    // Retrieve all items from chrome.storage.local
    chrome.storage.local.get({completedProblemList: []}, function (result) {
        var completedProblemList = result.completedProblemList;
        

        completedProblemList.forEach((element, index) => {
            console.log(element.problemId);
            if (element.problemId && element.difficulty) {
                const li = document.createElement('li');
                li.textContent = `Problem ID: ${element.problemId}, Difficulty: ${element.difficulty}`;
                objectList.appendChild(li);
            }
        });
    });
  });
  