import {Meteor} from 'meteor/meteor';
import { QuotesCollection } from './QuotesCollection';

Meteor.methods({
    "quotes.insert"(doc) {
        return QuotesCollection.insertAsync(doc);
    }
})