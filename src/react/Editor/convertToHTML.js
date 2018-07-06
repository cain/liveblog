/* eslint-disable consistent-return */
/* eslint-disable react/display-name */

import React from 'react';
import { convertToHTML } from 'draft-convert';

export default contentState =>
  convertToHTML({
    styleToHTML: () => {},
    blockToHTML: (block) => {
      if (block.type === 'atomic') {
        const currentBlock = contentState.getBlockForKey(block.key);
        const entity = contentState.getEntity(currentBlock.getEntityAt(0));
        const type = entity.getType();

        if (type === 'image') {
          return <img src={entity.getData().src} />;
        }

        if (type === 'code-block') {
          return (
            <div>
              <div
                id={`liveblog-codeblock-identifier-${entity.getData().title.replace(/\s+/g, '-')}`}
                dangerouslySetInnerHTML={{ __html: entity.getData().code }}
              />
            </div>
          );
        }

        if (type === 'media') {
          const imgWidth = entity.getData().width;
          const imgHeight = entity.getData().height;
          const ratio = Math.round((imgHeight / imgWidth) * 100) / 100;
          const padding = `calc(${ratio}*100%)`;
          let figureStyle = '';
          let imgStyle = '';
          if (imgWidth > 317) {
            figureStyle = { margin: 0, paddingBottom: padding, position: 'relative' };
            imgStyle = { position: 'absolute', width: '100%', height: '100%' };
          } else {
            figureStyle = { margin: 0, padding: 0, height: imgHeight, textAlign: 'center' };
            imgStyle = { width: imgWidth, height: imgHeight };
          }
          const imgTag = <figure style={figureStyle}>
            <img style={imgStyle} src={entity.getData().image} /></figure>;
          return imgTag;
        }
      }
      if (block.type === 'unordered-list-item') {
        return {
          start: '<li>',
          end: '</li>',
          nestStart: '<ul>',
          nestEnd: '</ul>',
        };
      }
      if (block.type === 'ordered-list-item') {
        return {
          start: '<li>',
          end: '</li>',
          nestStart: '<ol>',
          nestEnd: '</ol>',
        };
      }
      if (block.type === 'unstyled') {
        return <p />;
      }
      return <span />;
    },
    entityToHTML: (entity, originalText) => {
      if (entity.type === 'LINK') {
        return <a href={entity.data.url}>{originalText}</a>;
      }
      if (entity.type === 'TEXT') {
        return React.createElement(
          entity.data.nodeName,
          entity.data.attributes,
          originalText,
        );
      }
      return originalText;
    },
  })(contentState);
