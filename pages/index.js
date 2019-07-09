import React, { Component } from 'react';
import Story from '../components/index/story';
import Head from '../components/common/head';
import Nav from '../components/common/nav';
import { connect } from 'react-redux';
import { LOAD_STORIES } from '../actionTypes';

class Home extends Component {
  static async getInitialProps({ store, isServer, pathname, query }) {
    store.dispatch({ type: LOAD_STORIES });
    return {};
  }

  render() {
    const { stories } = this.props;
    const storyList = stories.allIds.map(id => stories.byId[id]);

    return (
      <div>
        <Head title="Home" />
        <Nav />

        <div className="hero">
          <h1 className="title">Hackernews SSR</h1>
        </div>

        {storyList.map(story => (
          <Story
            key={story.id}
            url={story.url}
            title={story.title}
            user={story.by}
            {...story}
          />
        ))}

        <style jsx>{`
          .hero {
            width: 100%;
            color: #333;
          }
          .title {
            margin-bottom: 40px;
            width: 100%;
            padding-top: 40px;
            line-height: 1.15;
            font-size: 48px;
          }
          .title,
          .description {
            text-align: center;
          }
        `}</style>
      </div>
    );
  }
}

export default connect(state => state)(Home);
