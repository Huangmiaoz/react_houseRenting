import React from 'react'
import PropTypes from 'prop-types';
import '../css/HouseItem.css' 
export default function HouseItems({
  src,
  title,
  desc,
  tags,
  price,
  onClick
}) {
  return (
    <div
      className='houseItem'
      onClick={onClick}
    >
      <div className='imgWrap'>
        <img
          className='img'
          src={src}
          alt="房源图"
        />
      </div>
      <div className='content'>
        <h3 className='title'>{title}</h3>
        <div className='desc'>{desc}</div>
        {tags.map((tag, index) => {
          const tagClass = 'tag' + (index + 1)
          return (
            <span
              className={`tag ${[tagClass]}`}
              key={tag}
            >
              {tag}
            </span>
          )
        })}
        <div className='price'>
          <span className='priceNum'>{price}</span> 元/月
        </div>
      </div>
    </div>
  )
}

HouseItems.propTypes = {
  src: PropTypes.string,
  title: PropTypes.string,
  desc: PropTypes.string,
  tags: PropTypes.array.isRequired,
  price: PropTypes.number,
  onClick: PropTypes.func
};