document.addEventListener('DOMContentLoaded', function() {
    const searchBtn = document.getElementById('search-btn');
    const searchInput = document.getElementById('search-input');
    const bookList = document.getElementById('book-list');

    // Trigger search when Enter is pressed
    searchInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            getBookList();
        }
    });

    // Trigger search when button is clicked
    searchBtn.addEventListener('click', getBookList);

    function getBookList() {
        let searchInputTxt = searchInput.value.trim();
        if (searchInputTxt === '') {
            alert("Please enter a book genre to search");
            return;
        }

        fetch(`https://www.googleapis.com/books/v1/volumes?q=subject:${searchInputTxt}`)
            .then(response => response.json())
            .then(data => {
                let html = "";
                if (data.items) {
                    data.items.forEach(book => {
                        let whatsappLink = `https://wa.me/201553632017?text=I would like this book. please provide it to me%0ATitle: ${book.volumeInfo.title}%0AAuthor(s): ${book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown'}%0APublished Date: ${book.volumeInfo.publishedDate || 'Unknown'}`;
                        html += `
                            <div class="book-item" onclick="window.open('${whatsappLink}', '_blank')">
                                <div class="book-img">
                                    <img src="${book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : 'https://via.placeholder.com/128x192.png?text=No+Image'}" alt="Book Cover">
                                </div>
                                <div class="book-info">
                                    <h5>${book.volumeInfo.title}</h5>
                                    <p><strong>Author:</strong> ${book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown'}</p>
                                    <p><strong>Published Date:</strong> ${book.volumeInfo.publishedDate}</p>
                                </div>
                            </div>
                        `;
                    });
                    bookList.classList.remove('notFound');
                } else {
                    html = "Sorry, we didn't find any books!";
                    bookList.classList.add('notFound');
                }

                bookList.innerHTML = html;
            });
    }
});



document.addEventListener('DOMContentLoaded', function() {
   
    var buttons = document.querySelectorAll('#aboutButton, #about1');

    buttons.forEach(function(button) {
        button.addEventListener('click', function() {
            var section = document.getElementById('b');
            section.classList.add('highlight');

            // Remove the highlight class after a few seconds
            setTimeout(function() {
                section.classList.remove('highlight');
            }, 3000); // Adjust the time as needed
        });
    });
});