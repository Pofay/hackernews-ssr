import React, { Component } from 'react';
import Head from '../components/common/head';
import Nav from '../components/common/nav';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';

const Comments = props => (
  <div>
    <Head title="Comments" />
    <Nav />

    <div className="hero">
      <h1 className="title">Hackernews SSR</h1>
    </div>

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


export default withRouter(Comments);
