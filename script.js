const form = document.querySelector('#searchForm');
const queryInput = document.querySelector('#query');
const showSection = document.querySelector('#shows');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    showSection.innerHTML = '';

    const searchQuery = queryInput.value;

    const res = await fetchImages(searchQuery);
    console.log(res);
    displayImages(res.data);

    queryInput.value = '';

})

const fetchImages = async (searchQuery) => {
    const config = { params: { q: searchQuery } };
    return await axios.get(`https://api.tvmaze.com/search/shows`, config);
}

const displayImages = (shows) => {
    for (let show of shows) {
        if (show.show.image) {
            const div = document.createElement('div');
            div.classList.add('show-section')

            const image = document.createElement('img');
            image.src = show.show.image.medium;
            div.append(image);

            const title = document.createElement('p');
            title.innerHTML = show.show.name;
            div.append(title);

            showSection.append(div);
        }

    }
}