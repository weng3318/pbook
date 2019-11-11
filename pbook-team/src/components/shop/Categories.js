import React, { useEffect } from 'react'
import { Col } from 'react-bootstrap'
import { cgFetch } from './ShopActions'
import { connect } from 'react-redux'
import './Shop.scss'

const Categories = props => {
  useEffect(() => {
    props.dispatch(cgFetch())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
      <Col md={2} className="book_categories px-0">
        <div className="d-flex justify-content-center align-items-center border-bottom">
          分類瀏覽
        </div>
        {props.cgData.map(cgData => (
          <div
            className="d-flex justify-content-center align-items-center border-bottom categories-color"
            key={cgData.sid}
          >
            {cgData.name}
          </div>
        ))}
      </Col>
    </>
  )
}
// class Categories extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       categories: [],
//     }
//   }
//   render() {
//     return (
//       <>
//         <Col md={2} className="book_categories px-0">
//           <div className="d-flex justify-content-center align-items-center border-bottom">
//             分類瀏覽
//           </div>
//           {this.state.categories.map(categories => (
//             <div
//               className="d-flex justify-content-center align-items-center border-bottom categories-color"
//               key={categories.sid}
//             >
//               {categories.name}
//             </div>
//           ))}
//         </Col>
//       </>
//     )
//   }
// }

const mapStateToProps = state => ({
  cgData: state.cgData,
})
export default connect(mapStateToProps)(Categories)
