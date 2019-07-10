import React from 'react';
import Head from '../components/common/head';
import Nav from '../components/common/nav';
import Comment from '../components/comments/comment';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import Link from 'next/link';
import { compose, pipe, into, map, filter } from 'ramda';
import { LOAD_STORY, LOAD_COMMENTS_FOR_STORY } from '../actionTypes';

const mapStateToProps = state => ({
  getCurrentStory: id => state.stories.byId[id],
  getCommentsForStory: id => {
    console.log(state);
    const story = state.stories.byId[id];
    const { byId, allIds } = state.comments;

    const transducer = compose(
      map(id => byId[id]),
      filter(c => c.parent === story.id)
    );

    return into([], transducer, allIds);
  }
});

const mapDispatchToProps = dispatch => ({
  loadCommentsForStory: id =>
    dispatch({ type: LOAD_COMMENTS_FOR_STORY, payload: id })
});

const Comments = props => {
  const story = props.getCurrentStory(props.id);
  props.loadCommentsForStory(story.id);

  const comments = props.getCommentsForStory(props.id);
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

      <div className="content">
        {comments.map(c => (
          <Comment key={c.id} {...c} />
        ))}
      </div>

      <style jsx>{`
        .heading {
          color: #333;
          margin-left: 20%;
          margin-right: 20%;
          margin-bottom: 40px;
        }
        .content {
          margin-left: 15%;
          margin-right: 15%;
        }

        .heading a {
          text-decoration: none;
        }
      `}</style>
    </div>
  );
};

Comments.getInitialProps = async function({ isServer, store, query }) {
  if (isServer) store.dispatch({ type: LOAD_STORY, payload: query.id });
  console.log(store.getState());
  return { id: query.id };
};

export default pipe(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Comments);
