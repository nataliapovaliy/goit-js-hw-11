const key = '17988471-599edd7bd30320e243c69934a';
const searchParams = new URLSearchParams({
    image_type: "photo",
    orientation: "horizontal",
    safesearch: true,
});

export function fetchSearch(q) {
    return fetch(`https://pixabay.com/api/?key=${key}&q=${q}&${searchParams}`)
    .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
        return response.json();
        })
}