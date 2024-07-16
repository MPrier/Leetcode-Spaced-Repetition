document.addEventListener('DOMContentLoaded', () => {
    const objectList = document.getElementById('History');
  
    // Retrieve all items from chrome.storage.local
    chrome.storage.local.get({completedProblemList: []}, function (result) {
        var completedProblemList = result.completedProblemList;
        

        completedProblemList.forEach((element, index) => {
            console.log(element.problemId);
            if (element.problemId && element.difficulty) {
                const li = document.createElement('li');
                // Create a clickable link for the problem ID
                const a = document.createElement('a');
                a.href = `https://leetcode.com/problems/${element.problemId}`;
                a.textContent = `Problem ID: ${element.problemId}`;
                a.target = "_blank"; // Open link in a new tab

                li.appendChild(a);
                li.appendChild(document.createTextNode(`, Difficulty: ${element.difficulty}`));
                li.appendChild(document.createTextNode(`, Date: ${element.submitDate}`));
                objectList.appendChild(li);
            }
        });
    });
  });
  