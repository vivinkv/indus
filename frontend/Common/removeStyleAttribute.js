import { load } from "cheerio";

export default function RemoveStyleAttributes(htmlString) {
    if (!htmlString) {
        return "";
    }

    const $ = load(htmlString);

    // Remove style attributes
    $("*").each(function () {
        $(this).removeAttr("style");
    });

    // Remove empty elements (div, p, span, etc.)
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

    return $.root().children().html()?.trim() || "";
}
