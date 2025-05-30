import React from "react"

const CheckTag = ({ count, label, isSelected, invertedTheme, onCheckboxChange}) => {
  if (count < 1 ) return null // hiding the tags with no items (shouldn't be necessary)
  return (

      <label
        style={{
          textAlign: 'left',
          display: 'inline-block'
          // wordWrap: 'break-word'
        }}
        className={isSelected ? 'tag tag-active' : 'tag'}
        >
        <input
          style={{
            height: '0px',
            display: 'inline-block'
          }}
          className={invertedTheme ? 'tag tag-inverted' : 'tag'}
          type="checkbox"
          name={label.replace(/\s/, '\n')}
          checked={isSelected}
          onChange={onCheckboxChange}
        />
        {label}
      </label>
  )
};

const ListTag = ({tags, invertedTheme, selectTags, clearTags}) => {
  return (
    <div
      style={{
        alignSelf: 'flex-start',
        'margin': '0px 5px 0px 20px',
      }}>
      {tags.nodes.map((tag, index_tag) =>
        // <span
        //   className={invertedTheme ? 'tag tag-inverted' : 'tag'}
        //   key={index_tag}
        //   label={tag.name}
        //   onClick={selectTags}
        //   >
        //   {tag.name}
        // </span>
          <CheckTag
            key={index_tag}
            invertedTheme={invertedTheme}
            label={tag.name}
            isSelected={tag.checked}
            onCheckboxChange={selectTags}
          />
      )}
    </div>
  )
}

export default ListTag
