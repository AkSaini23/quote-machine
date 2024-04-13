import { useEffect, useState } from 'react'; // Assuming you're using React hooks
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';

import './App.scss';

const url = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

async function loadQuotesData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const quoteData = await response.json();
    return quoteData.quotes; // Corrected to quoteData.quotes
  } catch (error) {
    console.error('Error loading JSON:', error);
    return null;
  }
}
function getColorArray() {
  var rgb = [];

  for (var i = 0; i < 3; i++)
    rgb.push(Math.floor(Math.random() * 255));
  return rgb;

}

function App() {
  const [quotesArray, setQuotesArray] = useState([]);
  const [quote, setQuote] = useState("The best time to plant a tree was 20 years ago. The second best time is now.");
  const [author, setAuthor] = useState("Chinese Proverb");
  const [color, setColor] = useState("#272c35")

  useEffect(() => {
    async function fetchQuotes() {
      const quotes = await loadQuotesData(url);
      if (quotes) {
        const formattedQuotes = quotes.map(quoteObj => ({
          quote: quoteObj.quote,
          author: quoteObj.author
        }));
        setQuotesArray(formattedQuotes);
      }
    }
    fetchQuotes();
  }, []);

  const generateRandomQuote = () => {
    let randNo = Math.floor(quotesArray.length * Math.random());
    const rgbColor = getColorArray();
    const color = `rgb(${rgbColor[0]}, ${rgbColor[1]}, ${rgbColor[2]})`;
    setQuote(quotesArray[randNo].quote);
    setColor(color);
    setAuthor(quotesArray[randNo].author);
  }

  return (
    <div className="App">
      <header className="App-header" style={{ backgroundColor: color }}>
        <div id="quote-box">
          {quotesArray.length > 0 ? (
            <div id="text">
              <p id="text" style={{ color: color, fontSize: 40 }} id='s'><FontAwesomeIcon icon={faQuoteLeft} /> {quote}</p>
              <p id="text" style={{ color: color, fontSize: 20 }} id="author">-{author}</p>
            </div>
          ) : (
            <p>Loading...</p>
          )}
          <div id="new-quote" class="button">
            <a id="tweet-quote" href={'http://www.twitter.com/intent/tweet?text-hello'}>
              <img src="https://cdn-icons-png.flaticon.com/128/14417/14417460.png" style={{ width: '35px', height: '35px' }}>
              </img>
            </a>
            <button style={{ backgroundColor: color, width: '100px', height: '40px' }} onClick={generateRandomQuote} id="New-Quote">
              New Quote
            </button>

          </div>

        </div>

      </header>
    </div>
  );
}

export default App;
