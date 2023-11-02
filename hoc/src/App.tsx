import React, { useState, ReactNode } from 'react';

interface DataProps {
  'type': string,
  'url'?: string,
  'title'?: string,
  'views': number,
}

interface ListProps {
  'list': DataProps[]
}

interface NewAndPopularProps {
  'children': ReactNode,
}

function New(props: NewAndPopularProps) {
    return (
        <div className="wrap-item wrap-item-new">
            <span className="label">New!</span>
            {props.children}
        </div>
    )
};

function Popular(props: NewAndPopularProps) {
    return (
        <div className="wrap-item wrap-item-popular">
            <span className="label">Popular!</span>
            {props.children}
        </div>
    )
};

function Article(props: DataProps) {
    return (
        <div className="item item-article">
            <h3><a href="#">{props.title}</a></h3>
            <p className="views">Прочтений: {props.views}</p>
        </div>
    )
};

function Video(props: DataProps) {
    return (
        <div className="item item-video">
            <iframe src={props.url} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
            <p className="views">Просмотров: {props.views}</p>
        </div>
    )
};

function withPopularNew(Component : React.ComponentType<DataProps>) {
  return function (props: DataProps) {
    const { views } = props;

    if (views >= 1000) {
      return <Popular>{<Component {...props} />}</Popular>;
    } else {
      return <New>{<Component {...props} />}</New>;
    }
  }
}

const VideoWithPopularNew = withPopularNew(Video);
const ArticleWithPopularNew = withPopularNew(Article);

function List(props: ListProps) {
    return (
      <>
      {props.list.map((item, index) => {
        switch (item.type) {
            case 'video':
                return (
                    <VideoWithPopularNew key={index} {...item} />
                );

            case 'article':
                return (
                    <ArticleWithPopularNew key={index} {...item} />
                );
        }
    })}
      </>
    )
};

export default function App() {
    const [list, setList] = useState([
        {
            type: 'video',
            url: 'https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0',
            views: 50
        },
        {
            type: 'video',
            url: 'https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0',
            views: 12
        },
        {
            type: 'article',
            title: 'Невероятные события в неизвестном поселке...',
            views: 175
        },
        {
            type: 'article',
            title: 'Секретные данные были раскрыты!',
            views: 1532
        },
        {
            type: 'video',
            url: 'https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0',
            views: 4253
        },
        {
            type: 'article',
            title: 'Кот Бегемот обладает невероятной...',
            views: 12,
        },
    ]);

    return (
        <List list={list} />
    );
}