import React, {useEffect} from 'react'
import './categoryMenu.css'
import { useSelector, useDispatch } from 'react-redux'
import { getAllCategories } from '../../reducers/categoryReducer'
import {Link} from 'react-router-dom'

const CategoryMenu = () => {
    const category = useSelector((state) => state.category)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCategories())
    }, [])

    // rendering all categories:
    const renderCategories = (category) => {
        let categories = [];
        for (let cat of category) {
            categories.push(
                <li key={cat.name}>
                    {
                        // if parent id exist then it has some parent and we are adding links to them, else show category name only:
                        cat.parentId ? <Link to={cat.slug}>{cat.name}</Link> : <span>{cat.name}</span>
                    }
                    {cat.children.length > 0 && ( // if there are subcategories present, then calling renderCategories recursively
                        <ul>
                            {renderCategories(cat.children)}
                        </ul>
                    )}
                </li>
            )
        }

        return categories;
    }

  return (
    <div className='categoryMenu'>
        <ul>
            {
                category.categories.length > 0 ? renderCategories(category.categories) : null
            }
        </ul>
    </div>
  )
}

export default CategoryMenu