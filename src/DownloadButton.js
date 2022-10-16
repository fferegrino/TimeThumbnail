import React from 'react';

export function DownloadButton({ thumbnail }) {

    return (<a download="thumbnail.png" href={thumbnail}>Download thumbnail</a>)
}