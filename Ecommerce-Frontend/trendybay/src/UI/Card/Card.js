import React from 'react'
import './card.css'

const Card = (props) => {
    return (
        <div className='myCard' {...props}>
            {
                // showing the header only when they are send as props
                (props.headerLeft || props.headerRight) &&
                <div className="card-header">
                    {
                        props.headerLeft &&
                        <div
                            style={{
                                alignSelf: "center",
                                fontSize: "20px",
                                fontWeight: "500",
                            }}
                        >
                            {props.headerLeft}
                        </div>
                    }

                    {
                        props.headerRight && props.headerRight
                    }
                </div>
            }

            {props.children}

        </div>
    )
}

export default Card