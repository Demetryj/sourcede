'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

import { IconButton, SubscriptionForm } from '@/components/common';
import { MarketInsightsCard, DiscussionForm, ArticleComments } from '@/components/ui';

import { copyPageUrl, pickRandomElements } from '@/utils';

import { loadArticleById } from '@/data/articles';
import { marketungInsightsCardListData } from '@/data/marketInsightsPageData';

import { ChevronLeftSecond, Share } from '@/components/icons';

import { Facebook, LinkedIn, X } from '@/components/icons/socialMedia';

import './ArticlePage.scss';

const socialMediaShareList = [
  { name: 'facebook', icon: Facebook },
  { name: 'linkedIn', icon: LinkedIn },
  { name: 'x', icon: X },
];

export default function ArticlePage({ articleId }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo({ top });
  }, []);

  useEffect(() => {
    if (!articleId) return;
    let cancelled = false;

    const loader = loadArticleById[articleId];
    if (!loader) {
      setError(new Error('Something went wrong. Please try again later.'));
      return;
    }

    loader()
      .then(mod => !cancelled && setData(mod.default ?? mod))
      .catch(e => !cancelled && setError(e));

    return () => {
      cancelled = true;
    };
  }, [articleId]);

  const randomCards = pickRandomElements({
    sourceArray: marketungInsightsCardListData,
    id: articleId,
  });

  const handleCopyUrl = async () => await copyPageUrl();

  if (error)
    return (
      <section className="section-general">
        <div className="container-general">
          <h6 className="ap__article-error-message">{String(error.message || error)}</h6>
        </div>
      </section>
    );

  const { articleTitle, info, body } = data ?? {};

  if (data)
    return (
      <>
        <section className="ap-article">
          <div className="container-general">
            <div className="inner-container inner-container-with-borders ap-article__container">
              <div className="ap-article__header">
                <div className="ap-article__back-block">
                  <Link href="/market-insights">
                    <IconButton
                      icon={ChevronLeftSecond}
                      additionalClass="ap-article__back-block__button"
                    />
                  </Link>

                  <span>Back To All News</span>
                </div>

                <h2>{articleTitle}</h2>
              </div>

              {/* body */}
              <div className="ap-article__body">
                {/* info block */}
                <div className="ap-article__info">
                  <div className="ap-article__info__wrapper">
                    <div className="ap-article__info__date-time">
                      <div>{info?.createAt}</div>

                      {info?.timeToRead && (
                        <>
                          <div className="ap-article__info__date-time__dot" />
                          <div>{`${info?.timeToRead} min read`}</div>
                        </>
                      )}
                    </div>

                    <div className="ap-article__info__bages">
                      {info?.topic && (
                        <div className="ap-article__info__bages-item">{info?.topic}</div>
                      )}
                      {info?.subtopic && (
                        <div className="ap-article__info__bages-item">{info?.subtopic}</div>
                      )}
                    </div>
                  </div>

                  <div className="ap-article__info__share-block">
                    <h6>Share article</h6>

                    <ul className="ap-article__info__share-block__list">
                      {socialMediaShareList.map(({ name, icon: Icon }) => {
                        return (
                          <li key={name}>
                            <IconButton
                              icon={Icon}
                              additionalClass="ap-article__info__share-block__button"
                            />
                          </li>
                        );
                      })}

                      <li>
                        <IconButton
                          icon={Share}
                          additionalClass="ap-article__info__share-block__button"
                          onClick={handleCopyUrl}
                        />
                      </li>
                    </ul>
                  </div>
                </div>

                <div>
                  {/* article */}
                  <article className="ap-article__article">
                    {body?.map((item, index) => {
                      {
                        if (item.type === 'image')
                          return (
                            <div
                              key={index}
                              style={{ backgroundImage: `url(${item.src})` }}
                              className="ap-article__image"
                            />
                          );
                      }

                      if (item.type === 'title') {
                        return (
                          <h3 key={index} className="ap-article__title">
                            {item.text}
                          </h3>
                        );
                      }

                      if (item.type === 'subtitle') {
                        return (
                          <h4 key={index} className="ap-article__subtitle">
                            {item.text}
                          </h4>
                        );
                      }

                      if (item.type === 'paragraf') {
                        return (
                          <p key={index} className="ap-article__paragraf">
                            {item.text}
                          </p>
                        );
                      }

                      if (item.type === 'dot_list') {
                        return (
                          <ul key={index} className="ap-article__dot-list ">
                            {item.list.map((row, idx) => {
                              return (
                                <li key={idx}>
                                  <p>{row}</p>
                                </li>
                              );
                            })}
                          </ul>
                        );
                      }
                    })}
                  </article>

                  {/* discussion block */}
                  <div className="inner-container ap-article__discussion-block">
                    <div className="ap-article__discussion-block__header">
                      <h3>Join the Discussion</h3>

                      <p>
                        Share your thoughts on this topic. You can post with your name, or remain
                        anonymous.
                      </p>
                    </div>

                    <DiscussionForm />
                  </div>

                  {/* comments */}

                  <div className="ap-article__comments-block">
                    <ArticleComments />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-general">
          <div className="container-general">
            <h3 className="ap-article__random-card__title">Related Articles</h3>

            <ul className="ap-article__random-card__list">
              {randomCards?.map(item => {
                return (
                  <li key={item.id}>
                    <MarketInsightsCard cardData={item} />
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        <section className="ap-article__bottom-section">
          <div className="container-general">
            <div className="inner-container-bottom inner-container-with-borders">
              <div className="ap-article__bottom-section__wrapper">
                <h2 className="ap-article__bottom-section__title">Keep Up With the Market</h2>

                <p className="ap-article__bottom-section__text">
                  Subscribe for concise market insights straight to your inbox.
                </p>

                <SubscriptionForm primary />
              </div>
            </div>
          </div>
        </section>
      </>
    );
}
