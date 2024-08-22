const accessKey = "L6ol6JCqaq1TTTO32pD62iFrZ0RJPLU4gdSloLwCeP8";

const input = document.getElementById("search_input");
const form = document.querySelector("form");
const Search_res = document.querySelector(".search_resultt");
const S_result = document.querySelector(".result");
const showMore = document.getElementById("show_more");

let inpData = ""; //we can store all the input data  entered by the user
let page = 1; //by default the page number is 1

form.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  imageSearch();
});

showMore.addEventListener("click", () => {
  imageSearch();
});

async function imageSearch() {
  // we are using the async to fetch data
  inpData = input.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inpData}&client_id=${accessKey}`; //we create our own dynamic url to based on our input data

  const response = await fetch(url);
  const data = await response.json(); //data stores all the  json format data

  const receiveResults = data.results;

  if (page === 1) {
    S_result.innerHTML = " "; //we do this to remove the the images that we have added before to fix the size of the images after searching.
  }

  receiveResults.map((result) => {
    // we should connect all the link to the container that we have cerated in html

    const imgCon = document.createElement("div");
    imgCon.classList.add("search_resultt");
    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description;
    const imgLink = document.createElement("a");
    imgLink.href = result.links.html;
    imgLink.target = "_blank";
    imgLink.textContent = result.alt_description;
    Search_res.style.display = "block";

    imgCon.appendChild(image);
    imgCon.appendChild(imgLink);
    S_result.appendChild(imgCon);
    S_result.style.visibility = "visible";
  });

  page++;
  if (page > 1) {
    showMore.style.display = "block";
  }
}
