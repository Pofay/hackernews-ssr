import Link from 'next/link';
import { distanceInWordsToNow } from 'date-fns';
import { pipe } from 'ramda';

const distanceOfUnixTimestampInWordToNow = pipe(
  timestamp => timestamp * 1000,
  distanceInWordsToNow
);

const HNStory = props => (
  <div className="row ">
    <div className="card">
      <Link href={props.url}>
        <a>
          <h3>{props.title}</h3>
        </a>
      </Link>
      <p>
        <b>{props.score} points</b> submitted{' '}
        {distanceOfUnixTimestampInWordToNow(props.time)} ago by {' '}
        <b>{props.user}</b>
      </p>
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
        width: 600px;
        text-align: left;
        text-decoration: none;
        color: #434343;
        border: 1px solid #9b9b9b;
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

export default HNStory;
