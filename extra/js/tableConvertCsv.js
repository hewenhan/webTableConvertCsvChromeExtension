var csv = function () {
    return {
        getTableToArr: function (tableId) {
            var table = document.getElementById(tableId);
            var arr = [];
            var tr = table.getElementsByTagName('tr');
            for (var i = 0; i < tr.length; i++) {
                arr[i] = [];
                var th = tr[i].getElementsByTagName('th');
                for (var j = 0; j < th.length; j++) {
                    arr[i][j] = th[j].innerHTML;
                }
                var td = tr[i].getElementsByTagName('td');
                for (var j = 0; j < td.length; j++) {
                    arr[i][j] = td[j].innerHTML;
                }
            }
            return arr;
        },
        getTableToMap: function (tableId) {
            var table = document.getElementById(tableId);
            var tr = table.getElementsByTagName('tr');
            var map = [];
            for (var i = 0; i < tr.length; i++) {
                var td = tr[i].getElementsByTagName('td');
                for (var j = 0; j < td.length; j++) {
                    var rowSpan = td[j].rowSpan;
                    if (rowSpan >= 2) {
                        map.push({
                            tr: i + 1,
                            td: j,
                            span: rowSpan + i
                        });
                    }
                }
            }
            var sortTd = function (a, b) {
                return a.td - b.td;
            };
            return map.sort(sortTd);
        },
        getCsvArr: function (tableId) {
            var arr = this.getTableToArr(tableId);
            var map = this.getTableToMap(tableId);
            for (var i = 0; i < map.length; i++) {
                var td1 = map[i].td;
                var tr1 = map[i].tr;
                for (var j = 0; j < map.length; j++) {
                    var span2 = map[j].span - 1;
                    var td2 = map[j].td;
                    var tr2 = map[j].tr;
                    if (tr1 <= span2 && td1 > td2 && tr1 !== tr2) {
                        map[i].td++;
                    }
                }
            }
            for (var i = 0; i < arr.length; i++) {
                for (var j = 0; j < map.length; j++) {
                    var tr = map[j].tr;
                    var td = map[j].td;
                    var span = map[j].span;
                    if (tr === i) {
                        for (var k = tr; k < span; k++) {
                            arr[k].splice(td, 0, '');
                        }
                    }
                }
            }
            return arr;
        },
        getCsvStrEncode: function (tableId) {
            var regLastCode = function (str, patt) {
                var reg = new RegExp(patt, "ig");
                while ((result = reg.exec(str)) !== null) {
                    var lastIndex = reg.lastIndex;
                }
                var startIndex = lastIndex - patt.length;
                var endIndex = lastIndex;
                return str.substring(0, startIndex) + str.substring(endIndex);
            };
            var tr = this.getCsvArr(tableId);
            var tableStr = '';
            for (var i = 0; i < tr.length; i++) {
                var td = tr[i];
                var trTdStr = '';
                for (var j = 0; j < td.length; j++) {
                    var text = td[j];
                    text = text.replace(/"/g, '""');
                    text = encodeURIComponent(text);
                    var thCellStr = "%22" + text + "%22%2c";
                    trTdStr += thCellStr;
                }
                trTdStr = regLastCode(trTdStr, '%2c');
                if (trTdStr !== '') {
                    tableStr += trTdStr + '%0a';
                }
            }
            return tableStr;
        },
        download: function (arg) {
            downloadFile = function (fileName, content) {
                var aLink = document.createElement('a');
                var blob = new Blob([content]);
                var evt = document.createEvent("HTMLEvents");
                evt.initEvent("click", false, false);
                aLink.download = fileName;
                aLink.href = URL.createObjectURL(blob);
                aLink.dispatchEvent(evt);
            };
            var obj = {
                filename: arg.filename ? arg.filename : 'webTable',
                tableId: arg.tableId ? arg.tableId : 'table',
                boolean: typeof (arg.boolean) !== 'undefined' ? arg.boolean : 'true'
            };
            var timestr = obj.boolean ? '_' + new Date().getTime() : '';
            downloadFile(obj.filename + timestr + '.csv', decodeURIComponent(this.getCsvStrEncode(obj.tableId)));
        }
    };
};