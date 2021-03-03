import React from 'react'
import { CgSmileSad } from 'react-icons/cg'

function NotFound() {
  return (
    <div className="not-found">
      <div className="not-found__icon">
        <CgSmileSad />
      </div>
      <h1>404</h1>
      <strong>Page not found</strong>
      <p> Page Not Found, File Not Found, or Server Not Found</p>
      <button type="button">Go Back Home</button>
    </div>
  )
}

export default NotFound
