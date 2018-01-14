import React from 'react';
import ReactDOM from 'react-dom';
import './assets/index.css';
import App from './components/App';

import { WishList } from "./models/WhishList";

const wishList = WishList.create({
    items: [
        {
            name: 'Colored cats',
            price: 120,
            image: 'http://insentonews.com/wp-content/uploads/2017/10/82f7132ca71d06d2b43d57e9c1a96da0-696x391.jpg',
        },
        {
            name: 'Cat sleeps',
            price: 50,
            image: 'http://www.lastampa.it/rf/image_lowres/Pub/p4/2017/05/26/LaZampa/Foto/RitagliWeb/gattino_coccole02-kuOG-U11002952256340t3E-1024x576%40LaStampa.it.jpg',
        }
    ]
});

ReactDOM.render(<App wishList={wishList}/>, document.getElementById('root'));
