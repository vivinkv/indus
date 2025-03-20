import { load } from "cheerio";

export default function RemoveStyleAttributes(htmlString) {
    if (!htmlString) {
        return "";
    }

    const $ = load(htmlString, null, false); // Prevents cheerio from adding <html> and <body>

    // Remove style attributes from all elements
    $("*").each(function () {
        $(this).removeAttr("style");
    });

    // Remove empty elements
    $("*").each(function () {
        const content = $(this).html()?.replace(/\s/g, "").trim();

        if (
            !content || 
            content === "&nbsp;" || 
            content === "<br>" || 
            content === "<br/>" || 
            content === "<br />"
        ) {
            $(this).remove();
        }
    });

    // Get the content inside <body> and return without the <body> tag
    return $("body").html()?.trim() || $.html().trim();
}
