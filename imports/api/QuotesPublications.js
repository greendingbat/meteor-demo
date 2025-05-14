import { Meteor } from "meteor/meteor";
import { QuotesCollection } from "./QuotesCollection";

Meteor.publish("quotes", () => {
  return QuotesCollection.find();
});