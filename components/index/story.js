import React, { useState } from 'react';
import Link from '../forwardRefs/Link'
import { distanceInWordsToNow } from 'date-fns';
import { pipe } from 'ramda';

const distanceOfUnixTimestampInWordToNow = pipe(
  timestamp => timestamp * 1000,
  distanceInWordsToNow
);

const HNStory = props => {
  const [count, setCount] = useState(0);

  return (
    <div className="row ">
      <div className="card">
        <Link href={props.url}>
          <a>
            <h3>{props.title}</h3>
          </a>
        </Link>
        <p>
          <b>{props.score} points</b> submitted{' '}
          {distanceOfUnixTimestampInWordToNow(props.time)} ago by{' '}
          <b>{props.user}</b>
        </p>
        <div className="comments">
          <Link as={`/c/${props.id}`} href={`/comments?id=${props.id}`}>
            <a>
              <h3>Comments: {props.descendants}</h3>
            </a>
          </Link>
        </div>
        <div>
          <button
            onClick={() => {
              setCount(count + 1);
              console.log(count);
            }}
          >
            Click Me!
          </button>
        </div>
        <div>
          <p> Count #: {count}</p>
        </div>
      </div>
      <style jsx>{`
        .row {
          max-width: 880px;
          margin: 20px auto 2px;
          display: flex;
          flex-direction: row;
          justify-content: space-around;
        }
        .card {
          padding: 12px 12px 12px;
          margin-right: 10px;
          margin-left: 10px;
          width: 600px;
          text-align: left;
          text-decoration: none;
          color: #434343;
          border: 1px solid #9b9b9b;
        }
        .comments {
          text-align: left;
          margin-top: 12px;
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
