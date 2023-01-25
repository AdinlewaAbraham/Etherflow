import "./TopSection.css"

const blurSpot = (p) => {
  return (
    <div style={{top:p.top, right:p.right,left:p.left,bottom:p.bottom}} className='blurSpot'/>
  )
}

export default blurSpot