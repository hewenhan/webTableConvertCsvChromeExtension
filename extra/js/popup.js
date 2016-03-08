var csv = new csv();

chrome.runtime.onMessage.addListener(function (request, sender) {
    var hiddenDom = document.getElementById('insertedTablesHidden');
    var showDom = document.getElementById('insertedTablesShow');
    if (request.action === "getSource") {
        hiddenDom.innerHTML = request.source;
    }
    var tables = hiddenDom.getElementsByTagName('table');
    showDom.innerHTML = '';
    for (var i = 0; i < tables.length; i++) {
        var id = tables[i].id;
        showDom.innerHTML += '<button class="tableBtn" tableId="' + id + '">下载表格 ' + (i + 1) + '</button>';
    }
    var btns = showDom.getElementsByTagName('button');
    for (var i = 0; i < btns.length; i++) {
        var id = btns[i].attributes.tableid.textContent;
        var callback = function () {
            var downloadCsv = function (tableId) {
                var content = decodeURIComponent(csv.getCsvStrEncode(tableId));
                var blob = new Blob([content]);
                var url = URL.createObjectURL(blob);
                chrome.downloads.download({
                    url: url,
                    filename: id + '.csv',
                    saveAs: true
                });
            };
            downloadCsv(id);
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