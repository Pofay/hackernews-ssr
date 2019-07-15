import React, { useState } from 'react';
import Link from '../forwardRefs/Link';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { distanceInWordsToNow } from 'date-fns';
import { pipe } from 'ramda';

const distanceOfUnixTimestampInWordToNow = pipe(
  timestamp => timestamp * 1000,
  distanceInWordsToNow
);

const HNStory = props => {
  const [count, setCount] = useState(0);

  return (
    <div className="row">
      <div className="card">
        <Paper>
          <div className="content">
            <Link href={props.url}>
              <a>
                <Button color="primary">{props.title}</Button>
              </a>
            </Link>
            <div className="score">
              <b>{props.score} points</b> submitted{' '}
              {distanceOfUnixTimestampInWordToNow(props.time)} ago by{' '}
              <b>{props.user}</b>
            </div>
            <div className="comments">
              <Link as={`/c/${props.id}`} href={`/comments?id=${props.id}`}>
                <a>
                  <Button>Comments: {props.descendants}</Button>
                </a>
              </Link>
            </div>
          </div>
        </Paper>
      </div>
      <style jsx>{`
        .row {
          max-width: 880px;
          margin-top: 20px;
          margin-right: 20%;
          margin-left: 20%;
          display: flex;
          flex-direction: row;
          justify-content: space-around;
        }
        .card {
          width: 800px;
          text-align: left;
          text-decoration: none;
          color: #434343;
        }
        .content {
          padding: 12px 12px 12px 12px;
        }

       .comments {
          text-align: left;
          margin-top: 24px;
          display: inline-block;
          text-decoration: none;
          width: 400px;
        }

        .score {
          margin-top: 2%;
          margin-left: 1.5%;

        }
        .card a {
          text-decoration: none;
          font-style: bold;
        }

        .card a:hover {
          text-decoration: underline;
        }

        .comments a h3 {
          font-size: 16px;
        }

        .card:hover {
          border-color: #067df7;
        }
        .card h3 {
          margin: 0;
          color: #067df7;
          font-size: 18px;
        }
        .card p {
          margin: 0;
          padding: 12px 0 0;
          font-size: 13px;
          color: #333;
        }
      `}</style>
    </div>
  );
};

export default HNStory;
