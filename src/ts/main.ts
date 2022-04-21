function main(global:any) {
    if (location.hash != ""){
        loadPage(location.hash)
    }
    else (loadPage("#00.00"))
    // this gets called when both 
    // A. DOM Content Loads
    // B. JSON gets loaded from the python script output
    addEventListener("hashchange", (event) => {
        loadPage(location.hash);
    })
    function loadPage(hash:string){
        $ajaxUtils.sendGetRequest(pageURL(hash.substring(1)), (response:any) => {
            let markdown = response.responseText;
            document.getElementById("maincontent").innerHTML = parseMarkdown(markdown);
        });	
    }
    function pageURL(JDID:string) {
        console.log(JDID);
        let [Folder, File] = JDID.split(".");
        let MainFolder = Folder[0] + "0";
        let args:Array<string> = ["vault"];
        args.push(findNumber(directories, MainFolder));
        args.push(findNumber(subDirectories, Folder));
        args.push(findNumber(files, JDID));
        return args.join("\/")//"README.md"
    }
    function findNumber(array:Array<any>, num:string):any {
        let returnVal:any = num + " Index.md";
        console.log(array);
        console.log(num);
        array.forEach((item) => {
            if (item.number.toString() === num) {
                returnVal = item.item;
                console.log("Registered: " + returnVal.toString());
            }
        });
        return returnVal;
    }




}
