import React, { useEffect, useState } from "react";
import { useTracker, useSubscribe } from "meteor/react-meteor-data";
import { QuotesCollection } from "../api/QuotesCollection";
import { getSpaceImage } from "../api/nasa";
import "../../client/main.css";
import NewQuoteForm from "./NewQuoteForm";

export const App = () => {
  const [quoteState, setQuoteState] = useState({ quote: "", author: "" });
  const [imageUrl, setImageUrl] = useState("");
  const [imageLoading, setImageLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const quoteLoading = useSubscribe("quotes");
  const quotes = useTracker(() => QuotesCollection.find({}).fetch());

  const randomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const q = quotes[randomIndex];
    return {
      quote: q.quote,
      author: q.author,
    };
  };

  useEffect(() => {
    if (!quoteLoading()) {
      const quote = quotes[Math.floor(Math.random() * quotes.length)];
      setQuoteState(randomQuote());
    }
  }, [quoteLoading()]);

  useEffect(() => {
    // get the image from NASA API
    const fetchSpaceImage = async () => {
      const response = await getSpaceImage();
      setImageUrl(response.hdurl);
      setImageLoading(false);
    };
    fetchSpaceImage();
  }, []);

  return (
    <div
      className="app-container"
      style={{
        backgroundImage: `url(${imageUrl})`,
      }}
    >
      <div className="app-header">
        <h2>Quotes Over Pictures Of Space</h2>
      </div>
      <div className="main-content">
        <div className="quote-container">
          <h1>{quoteState.quote}</h1>
          <h2>{quoteState.author}</h2>
        </div>
        <button onClick={() => setQuoteState(randomQuote())}>
          Random Quote
        </button>
        <button onClick={() => setShowForm(!showForm)}>New Quote</button>
        {showForm && (
          <NewQuoteForm
            onSubmit={(newQuote, newAuthor) => {
              console.log(newQuote, newAuthor);
              setQuoteState({ quote: newQuote, author: newAuthor });
              setShowForm(false);
            }}
          />
        )}
      </div>
    </div>
  );
};
