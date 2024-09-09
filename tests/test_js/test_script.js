/**
 * @jest-environment jsdom
 */

const { fireEvent, screen } = require('@testing-library/dom');

// Mocking fetch to avoid real network requests
global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({
            items: [
                {
                    volumeInfo: {
                        title: "Book Title",
                        authors: ["Author 1"],
                        publishedDate: "2021",
                        imageLinks: {
                            thumbnail: "https://via.placeholder.com/128x192.png?text=Book+Cover"
                        }
                    }
                }
            ]
        }),
    })
);

describe('Book Search App', () => {
    beforeEach(() => {
        // Set up the DOM structure for testing
        document.body.innerHTML = `
            <input type="text" id="si" />
            <button id="sb">Search</button>
            <div id="bl"></div>
            <div id="b"></div>
        `;
        require('./path/to/your/script'); // Load your script
    });

    test('should display books on search', async () => {
        const si = screen.getByRole('textbox');  // Get search input
        fireEvent.change(si, { target: { value: 'fiction' } });

        const sb = screen.getByRole('button', { name: /search/i });  // Get search button
        fireEvent.click(sb);

        await new Promise(resolve => setTimeout(resolve, 1000));  // Wait for the fetch to resolve

        const bi = screen.getByText('Book Title');  // Check if book title is displayed
        expect(bi).toBeInTheDocument();
    });

    test('should show alert if search input is empty', () => {
        global.alert = jest.fn();  // Mock alert function

        const sb = screen.getByRole('button', { name: /search/i });
        fireEvent.click(sb);  // Simulate click on search button without input

        expect(global.alert).toHaveBeenCalledWith("Please enter a book genre to search");
    });

    test('should highlight the section when button clicked', () => {
        // Additional DOM for testing highlight functionality
        document.body.innerHTML += `
            <button id="ab">About</button>
            <div id="b"></div>
        `;

        const ab = screen.getByText('About');
        const s = document.getElementById('b');  // Get the section to be highlighted

        fireEvent.click(ab);  // Trigger click event

        expect(s.classList.contains('highlight')).toBe(true);  // Check if class was added

        jest.advanceTimersByTime(3000);  // Simulate timeout
        expect(s.classList.contains('highlight')).toBe(false);  // Check if class was removed
    });
});
