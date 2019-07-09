import React from 'react';
import ReactHTMLParser from 'react-html-parser'

const Comment = props => (
  <div className="content">
    <p>By: <b>{props.by}</b></p>
    <p>{ReactHTMLParser(props.text)}</p>
    <style jsx>
      {`
        .content {
          color: #333;
          margin-bottom: 10px;
          margin-top: 10px;
          padding: 20px 20px 20px 20px;
          border-style: solid;
          font-size: 15px;
        }
      `}
    </style>
  </div>
);
export default Comment;
