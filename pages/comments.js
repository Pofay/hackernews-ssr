import React, { Component } from 'react';
import Head from '../components/common/head';
import Nav from '../components/common/nav';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import Link from 'next/link';
import { pipe } from 'ramda';

// Get id from query params
// Load story from store based on id
//

const mapStateToProps = state => ({
  getCurrentStory: id => state.stories.byId[id],
  getComments: () => state.comments
});

const Comments = props => {
  const story = props.getCurrentStory(props.id);
  const { byId, allIds } = props.getComments();

  const comments = allIds
    .map(id => byId[id])
    .filter(c => c.parent === story.id);


  // requires rendering
  return (
    <div>
      <Head title="Comments" />
      <Nav />

      <div className="heading">
        <Link href={story.url}>
          <a>
            <h3>{story.title}</h3>
          </a>
        </Link>
        <p>
          {story.score} points by {story.by}
        </p>
      </div>

      <style jsx>{`
        .heading {
          color: #333;
          margin-left: 10px;
          margin-right: 10px;
          margin-bottom: 40px;
        }

        .heading a {
          text-decoration: none;
        }
      `}</style>
    </div>
  );
};

Comments.getInitialProps = async function({ isServer, store, query }) {
  store.dispatch({ type: 'LOAD_COMMENTS_FOR_STORY', payload: query.id });

  console.log(store.getState());
  return { id: query.id };
};

export default pipe(
  withRouter,
  connect(mapStateToProps)
)(Comments);
