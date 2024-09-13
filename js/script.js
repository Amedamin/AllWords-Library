document.addEventListener('DOMContentLoaded', function() {
    // Get references to the search button, search input, and book list container
    const SRB = document.getElementById('search-btn');
    const SRI = document.getElementById('search-input');
    const BKL = document.getElementById('book-list');

    // Trigger search when Enter is pressed in the search input field
    SRI.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            GBL();  // Call the function to get the book list
        }
    });

    // Trigger search when the search button is clicked
    SRB.addEventListener('click', GBL);

    // Function to fetch and display the book list based on the search query
    function GBL() {
        let SIT = SRI.value.trim();

        if (SIT === '') {
            alert("Please enter a genre of your book");
            return;
        }

        // Fetch book data from Google Books API based on the search query
        fetch(`https://www.googleapis.com/books/v1/volumes?q=subject:${SIT}`)
            .then(response => response.json())  // Parse the JSON response
            .then(data => {
                let HTM = "";  // Initialize an empty HTML string to hold the book items

                // If books are found, loop through each book item and build the HTML
                if (data.items) {
                    data.items.forEach(book => {
                        let description = book.volumeInfo.description ? book.volumeInfo.description.slice(0, 100) + '...' : 'No description available';
                        let rating = book.volumeInfo.averageRating ? `${book.volumeInfo.averageRating} / 5` : 'No rating available';
                        // Generate a WhatsApp link to share book details
                        let WPL = `https://wa.me/201553632017?text=I would like this book. please provide it to me%0ATitle: ${book.volumeInfo.title}%0AAuthor(s): ${book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown'}%0APublished Date: ${book.volumeInfo.publishedDate || 'Unknown'}`;

                        // Build the HTML for each book item, including the cover image, title, author, and published date
                        HTM += `
                            <div class="book-item" onclick="window.open('${WPL}', '_blank')">
                                <div class="book-img">
                                    <img src="${book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : 'https://via.placeholder.com/128x192.png?text=No+Image'}" alt="Book Cover">
                                </div>
                                <div class="book-info">
                                    <h5>${book.volumeInfo.title}</h5>
                                    <p><strong>Author:</strong> ${book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown'}</p>
                                    <p><strong>Published Date:</strong> ${book.volumeInfo.publishedDate}</p>
                                    <p><strong>Rating:</strong> ${rating}</p>
                                    <p class="book-description">${description}</p>
                                    <button class="read-more-btn" onclick="showFullDescription('${book.id}')">Read More</button>
                                </div>
                            </div>
                        `;
                    });
                    // Remove 'notFound' class if books are found
                    BKL.classList.remove('Not_Found');
                } else {
                    // If no books are found, display an error message
                    HTM = "Sorry, no results found for this search";
                    BKL.classList.add('Not_Found');  // Add 'notFound' class for styling purposes
                }

                // Insert the generated HTML into the book list container
                BKL.innerHTML = HTM;
            });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Get references to the "About" buttons
    var BTS = document.querySelectorAll('#aboutButton, #about1');

    // Add click event listeners to the buttons
    BTS.forEach(function(BTN) {
        BTN.addEventListener('click', function() {
            var SEC = document.getElementById('b');
            SEC.classList.add('highlight');  // Add the 'highlight' class to the section

            // Remove the 'highlight' class after a few seconds to return to normal
            setTimeout(function() {
                SEC.classList.remove('highlight');
            }, 3000);  // Highlight the section for 3 seconds
        });
    });
});
