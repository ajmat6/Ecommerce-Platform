import React from 'react'
import Layout from '../Layout/Layout'

function Category() {
  return (
    // Passing sidebar as prop
    <Layout sidebar>
        <div className="container">
            <div className="row">
                <div className='col-md-12'>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <h3>Category</h3>
                        <button className='btn btn-primary'>Add</button>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default Category
