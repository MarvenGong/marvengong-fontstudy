var AdchinaJson: any = {};
AdchinaJson.Getdifferent = function (json1, json2) {
    for (var key in json1) {//循环遍历其中一个json对象
        if (typeof (json1[key]) != "object") {
            if (json2[key] != null) {
                if (json1[key] == json2[key] && key!=='node_id') {
                    delete json1[key];
                    delete json2[key];
                }
            }
        }
        else {
            if (json1[key].length >= 0) {
                for (let i = 0; i < json1[key].length; i++) {
                    this.Getdifferent(json1[key][i], json2[key][i]);
                }
            }
            else {
                this.Getdifferent(json1[key], json2[key]);
            }
        }
    }
}
AdchinaJson.Json2Str = function (o) {
    var arr = [];
    var fmt = function (s) {
        if (typeof s == 'object' && s != null) return AdchinaJson.Json2Str(s);
        return /^(string|number)$/.test(typeof s) ? "'" + s + "'" : s;
    }
    for (var i in o) arr.push("'" + i + "':" + fmt(o[i]));
    return '{' + arr.join(',') + '}';
}
export default AdchinaJson;