import React from 'react';
import Story from '../components/index/story';
import Head from '../components/common/head';
import Nav from '../components/common/nav';
import loadDB from '../firebase-loader';

const Home = ({ stories }) => (
  <div>
    <Head title="Home" />
    <Nav />

    <div className="hero">
      <h1 className="title">Hackernews SSR</h1>
    </div>

    {stories.map(story => (
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

Home.getInitialProps = async function() {
  const db = await loadDB();

  const ids = await db.child('topstories').once('value');
  const stories = await Promise.all(
    ids
      .val()
      .slice(0, 20)
      .map(id =>
        db
          .child('item')
          .child(id)
          .once('value')
      )
  ).then(s => s.map(s => s.val()));

  return { stories };
};

export default Home;
