// Set up a namespace for our utility
var $ajaxUtils = new Object();
// Returns an HTTP request object
function getRequestObject() {
    if (window.XMLHttpRequest) {
        // Most current ajax object.
        return (new XMLHttpRequest());
    }
    else if (window.ActiveXObject) {
        // For very old IE browsers (optional)
        return (new ActiveXObject("Microsoft.XMLHTTP"));
    }
    else {
        window.alert("Ajax is not supported!");
        return (null);
    }
}
// Makes an Ajax GET request to 'requestUrl'
$ajaxUtils.sendGetRequest =
    function (requestUrl, responseHandler) {
        var request = getRequestObject();
        request.onreadystatechange =
            function () {
                handleResponse(request, responseHandler);
            }; // This function will get called when anything changes. We don't want to make request and responseHandler window, as ajax works asynchronously. 
        request.open("GET", requestUrl, true); // GET request, with the given url, and the boolean says "yes, this should be async"
        request.send(null); // for POST only
    };
// Only calls user provided 'responseHandler'
// function if response is ready
// and not an error
function handleResponse(request, responseHandler) {
    if ((request.readyState == 4) && // There are many ready states (I think 4). We want to be on '4'
        (request.status == 200)) {
        responseHandler(request);
    }
}
(function (global) {
    var loadCount = 0;
    var JSONLoadCount = 0;
    function loadMeta(fName, func) {
        return $ajaxUtils.sendGetRequest("json/" + fName + ".json", func);
    }
    loadMeta("D", function (response) {
        directories = JSON.parse(response.response);
        testLoad();
    });
    loadMeta("SD", function (response) {
        subDirectories = JSON.parse(response.response);
        testLoad();
    });
    loadMeta("F", function (response) {
        files = JSON.parse(response.response);
        testLoad();
    });
    var testLoad = function () {
        if (JSONLoadCount === 2) {
            checkLoad();
        }
        JSONLoadCount++;
    };
    addEventListener("DOMContentLoaded", function (event) {
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
function main(global) {
    if (location.hash != "") {
        loadPage(location.hash);
    }
    else
        (loadPage("#00.00"));
    // this gets called when both 
    // A. DOM Content Loads
    // B. JSON gets loaded from the python script output
    addEventListener("hashchange", function (event) {
        loadPage(location.hash);
    });
    function loadPage(hash) {
        $ajaxUtils.sendGetRequest(pageURL(hash.substring(1)), function (response) {
            var markdown = response.responseText;
            document.getElementById("maincontent").innerHTML = parseMarkdown(markdown);
        });
    }
    function pageURL(JDID) {
        console.log(JDID);
        var _a = JDID.split("."), Folder = _a[0], File = _a[1];
        var MainFolder = Folder[0] + "0";
        var args = ["vault"];
        args.push(findNumber(directories, MainFolder));
        args.push(findNumber(subDirectories, Folder));
        args.push(findNumber(files, JDID));
        return args.join("\/"); //"README.md"
    }
    function findNumber(array, num) {
        var returnVal = num + " Index.md";
        console.log(array);
        console.log(num);
        array.forEach(function (item) {
            if (item.number.toString() === num) {
                returnVal = item.item;
                console.log("Registered: " + returnVal.toString());
            }
        });
        return returnVal;
    }
}
addEventListener("DOMContentLoaded", function (event) {
    // set marked settings
    marked.use({
        pedantic: false,
        gfm: true,
        breaks: false,
        sanitize: false,
        smartLists: true,
        smartypants: false,
        xhtml: false
    });
});
function parseMarkdown(markdownText) {
    console.log(markdownText);
    var htmlText = marked.parse(markdownText);
    console.log(htmlText);
    return htmlText.trim();
}
