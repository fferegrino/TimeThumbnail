import React from 'react';

export function DownloadButton({ thumbnail }) {

    return (<a download="thumbnail.png" className='button' href={thumbnail}>Download thumbnail</a>)
}