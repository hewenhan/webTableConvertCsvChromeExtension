chrome.runtime.onMessage.addListener(function (request, sender) {
    var hiddenDom = document.getElementById('insertedTablesHidden');
    var showDom = document.getElementById('insertedTablesShow');
    if (request.action === "getSource") {
        hiddenDom.innerHTML = request.source;
    }
    var tables = hiddenDom.getElementsByTagName('table');
    showDom.innerHTML = '';
    var tableMap = [];
    for (var i = 0; i < tables.length; i++) {
        showDom.innerHTML += '<button class="tableBtn">下载表格 ' + (i + 1) + '</button>';
        tableMap.push(tables[i]);
    }
    var btns = showDom.getElementsByTagName('button');
    for (var i = 0; i < btns.length; i++) {
        var callback = function () {
            for (var j = 0; j < btns.length; j++) {
                if (this === btns[j]) {
                    var num = j
                }
            }
            var elem = tableMap[num];
            var content = decodeURIComponent(elem.getCsvStrEncode());
            var blob = new Blob([content]);
            var url = URL.createObjectURL(blob);
            var arg = {
                url: url,
                filename: 'table_' + (num + 1) + '.csv',
                saveAs: true
            };
            chrome.downloads.download(arg);
        };
        btns[i].addEventListener("click", callback);
    }
});

var getResDom = function () {
    chrome.tabs.executeScript(null, {
        file: "js/getPagesSource.js"
    }, function () {
        if (chrome.runtime.lastError) {
            console.log(chrome.runtime.lastError.message);
        }
    });
};

window.onload = function () {
    getResDom();
};