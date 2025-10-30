'use client';

import './ArticleComments.scss';

const comments = [
  {
    id: 1,
    name: 'Anonymous',
    createdAt: '1d ago',
    text: 'I really liked the point on analytics. In our company, dashboards have reduced decision time by almost half. Would love to hear if others are seeing similar efficiency gains.',
  },
];

export default function ArticleComments() {
  return (
    <ul className="article-comment">
      {comments.map(({ id, name, createdAt, text }) => {
        return (
          <li key={id} className="article-comment__item">
            <div className="article-comment__item__header">
              <h6 className="article-comment__item__name">{name}</h6>

              <div className="article-comment__item-header__wrapper">
                <div className="article-comment__item-header__dot" />
                <span className="article-comment__item-header">{createdAt}</span>
              </div>
            </div>

            <p className="article-comment__item__text">{text}</p>

            <button type="button" className="article-comment__item__reply-btn">
              Reply
            </button>
          </li>
        );
      })}
    </ul>
  );
}
