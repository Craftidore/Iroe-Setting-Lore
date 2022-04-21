declare var marked: any;

addEventListener("DOMContentLoaded", (event) => {
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
function parseMarkdown(markdownText:string):string {
	console.log(markdownText)
	const htmlText = marked.parse(markdownText);
	console.log(htmlText);
	return htmlText.trim()
}