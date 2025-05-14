import { Meteor } from "meteor/meteor";
import { QuotesCollection } from "/imports/api/QuotesCollection";
import "../imports/api/QuotesPublications";

const insertQuote = (quote, author) =>
  QuotesCollection.insertAsync({ quote, author });

Meteor.startup(async () => {
  if ((await QuotesCollection.find().countAsync()) === 0) {
    console.log("Seeding quotes...");
    const quotes = [
      {
        quote: "Whereof one cannot speak, thereof one must be silent.",
        author: "Ludwig Wittgenstein",
      },
      {
        quote: "The limits of my language mean the limits of my world.",
        author: "Ludwig Wittgenstein",
      },
      {
        quote: "The world is everything that is the case.",
        author: "Ludwig Wittgenstein",
      },
      {
        quote: "A picture can represent any reality.",
        author: "Ludwig Wittgenstein",
      },
    ];
    quotes.forEach(({ quote, author }) => {
      insertQuote(quote, author);
    });
  }
});
