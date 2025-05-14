import React from "react";

const NewQuoteForm = ({ onSubmit }) => {
  const [newQuote, setNewQuote] = React.useState("");
  const [newAuthor, setNewAuthor] = React.useState("");
  return (
    <form>
      <input
        type="text"
        placeholder="Quote"
        value={newQuote}
        onChange={(e) => setNewQuote(e.target.value)}
      />
      <input
        type="text"
        placeholder="Author"
        value={newAuthor}
        onChange={(e) => setNewAuthor(e.target.value)}
      />
      <button
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          onSubmit(newQuote, newAuthor);
        }}
      >
        Add Quote
      </button>
    </form>
  );
};

export default NewQuoteForm;
