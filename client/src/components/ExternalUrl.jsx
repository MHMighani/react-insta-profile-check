import React from 'react'

const ExternalLink = ({externalUrl}) => {
    let external_url_tag;

    if(externalUrl === ''){
        external_url_tag = <p style={{ color: 'lightGrey', textDecoration: 'italic' }}>No external link</p>;
    }else{
        external_url_tag = (
			<a rel="noopener noreferrer" href={externalUrl} target="_blank">
				{externalUrl}
			</a>
		);
    }

    return external_url_tag
}

export default ExternalLink