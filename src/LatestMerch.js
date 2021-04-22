import React from 'react';
import './css/Merch.css';
import Podcast from './Podcast';
import Merch from './Merch';

const LatestMerch = () => {
    return (
        <div className="merchMainBox">
            <Podcast />
            <Merch />
        </div>
    );
}

export default LatestMerch;