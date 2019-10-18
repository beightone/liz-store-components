import React, { memo, useMemo } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import HtmlParser from 'react-html-parser'
import { useCssHandles } from 'vtex.css-handles'

import GradientCollapse from '../GradientCollapse/index'

const CSS_HANDLES = [
  'productDescriptionContainer',
  'productDescriptionTitle',
  'productDescriptionText',
]

/**
 * Product Description Component.
 * Render the description of a product
 */
const ProductDescription = ({ description, collapseContent }) => {
  if (!description) {
    return null
  }

  const descriptionParsed = useMemo(() => HtmlParser(description), [
    description,
  ])

  const handles = useCssHandles(CSS_HANDLES)

  return (
    <div className={handles.productDescriptionContainer}>
      <FormattedMessage id="store/product-description.title">
        {txt => (
          <h2
            className={`${handles.productDescriptionTitle} t-heading-5 mb5 mt0`}
          >
            {txt}
          </h2>
        )}
      </FormattedMessage>

      <div className={`${handles.productDescriptionText} c-muted-1`}>
        {collapseContent ? (
          <GradientCollapse collapseHeight={220}>
            {descriptionParsed}
          </GradientCollapse>
        ) : (
          descriptionParsed
        )}
      </div>
    </div>
  )
}

ProductDescription.propTypes = {
  /** Product description string */
  description: PropTypes.string,
  collapseContent: PropTypes.bool,
}

export default memo(ProductDescription)
