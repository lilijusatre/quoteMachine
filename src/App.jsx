import { animate, stagger } from "framer-motion";
import { useEffect, useState } from "react";

import "./App.css";

const RANDOM_QUOTE = "https://api.api-ninjas.com/v1/quotes?category=life";
const COLORS = [
  "#16a085",
  "#27ae60",
  "#2c3e50",
  "#f39c12",
  "#e74c3c",
  "#9b59b6",
  "#FB6964",
  "#342224",
  "#472E32",
  "#BDBB99",
  "#77B1A9",
  "#73A857",
];

export default function App() {
  const [quote, setQuote] = useState("lorem ipsum");
  const [newQuote, setNewQuote] = useState(null);
  const [color, setColor] = useState(COLORS[0]);

  const getRandomColor = () => {
    const index = Math.floor(Math.random() * COLORS.length);
    return COLORS[index];
  };

  useEffect(() => {
    fetch(RANDOM_QUOTE, {
      headers: { "X-Api-Key": process.env.REACT_APP_API_KEY },
    })
      .then((res) => res.json())
      .then((data) => {
        const [quoteItem] = data;
        animate([
          [".quote-text, .quote-author", { opacity: 0 }, { duration: 0.001 }],
          [
            ".quote-text, .quote-author",
            { opacity: 1 },
            { duration: 1, delay: stagger(0.2) },
          ],
        ]);
        animate(color, getRandomColor(), {
          duration: 1,
          onUpdate: (latest) => setColor(latest),
        });
        setQuote(quoteItem);
      });
  }, [newQuote]);
  console.log(color);
  return (
    <div className="body" style={{ backgroundColor: color, color }}>
      <div className="App" id="wrapper">
        <div id="quote-box">
          <div className="quote-text">
            <i className="fa fa-quote-left"></i>
            <span id="text">{quote.quote}</span>
          </div>
          <div className="quote-author">
            -<span id="author">{quote.author}</span>
          </div>
          <div className="buttons">
            <div className="social-buttons">
              <a
                className="button"
                id="twitter"
                target="_blank"
                href={`http://twitter.com/intent/tweet?hashtags=quotes&text=%22${quote.quote}%22%20${quote.author}`}
                style={{ backgroundColor: color }}
              >
                <i className="fa fa-twitter"></i>
              </a>
              <a
                className="button"
                id="tumblr"
                target="_blank"
                href={`https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes&caption=${quote.author}&content=${quote.quote}&canonicalUrl=https://www.tumblr.com/buttons&shareSource=tumblr_share_button`}
                style={{ backgroundColor: color }}
              >
                <i className="fa fa-tumblr"></i>
              </a>
            </div>
            <button
              className="button"
              onClick={() => setNewQuote(Math.random())}
              style={{ backgroundColor: color }}
            >
              New quote
            </button>
          </div>
        </div>
        <p>
          by{" "}
          <a
            href="https://www.lilijusatre.dev"
            target="_blank"
            rel="noreferrer noopener"
          >
            lilijusatre
          </a>
        </p>
      </div>
    </div>
  );
}
