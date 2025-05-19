import React from 'react';
import { createRoot } from 'react-dom/client';
import { Meteor } from 'meteor/meteor';
import AppRouter from '/imports/ui/AppRouter';
import QuotesInSpace from '/imports/ui/QuotesInSpace';

Meteor.startup(() => {
  const container = document.getElementById('react-target');
  const root = createRoot(container);
  root.render(<QuotesInSpace />);
});
