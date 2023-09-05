import sanitize from "sanitize-html"
export const sanitizeInput = (content) => {
    return sanitize(content, {
        allowedTags: [],
        allowedAttributes: {},
    })
}