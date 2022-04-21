declare var directories: any;
declare var subDirectories: any;
declare var files: any;
declare var Promise:any;

((global) => {
    var loadCount = 0;
    let JSONLoadCount = 0;
    function loadMeta(fName:string, func:any) {
        return $ajaxUtils.sendGetRequest("json/" + fName + ".json", func);
    }
    loadMeta("D", (response:any) => {
        directories = JSON.parse(response.response);
        testLoad();
    });
    loadMeta("SD", (response:any) => {
        subDirectories = JSON.parse(response.response);
        testLoad();
    });
    loadMeta("F", (response:any) => {
        files = JSON.parse(response.response);
        testLoad();
    });
    let testLoad = function () {
        if (JSONLoadCount === 2) { checkLoad(); }
        JSONLoadCount++;
    }
    addEventListener("DOMContentLoaded", (event) => {
        console.log("DOM Loaded");
        checkLoad();
    });

    function checkLoad() {
        if (loadCount === 1) {
            main(global);
        }
        else {
            loadCount++;
        }
    }
})(window);
