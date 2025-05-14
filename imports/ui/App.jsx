import React, { useEffect, useState } from "react";
import { useTracker, useSubscribe } from "meteor/react-meteor-data";
import { QuotesCollection } from "../api/QuotesCollection";
import { getSpaceImage } from "../api/nasa";
import NewQuoteForm from "./NewQuoteForm";
import "../api/quotesMethods";
import "../../client/main.css";

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

  const handleAddQuoteClick = async (newQuote, newAuthor) => {
    await Meteor.callAsync("quotes.insert", {
      quote: newQuote.trim(),
      author: newAuthor.trim(),
    });
    setQuoteState({ quote: newQuote, author: newAuthor });
    setShowForm(false);
  };

  useEffect(() => {
    if (!quoteLoading()) {
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
            onSubmit={(newQuote, newAuthor) =>
              handleAddQuoteClick(newQuote, newAuthor)
            }
          />
        )}
      </div>
    </div>
  );
};
