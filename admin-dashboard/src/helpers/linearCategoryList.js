// creating a list of categories:
export const createCategoryList = (categories, option = []) => {
    for (let category of categories) {
        option.push({
            value: category._id,
            name: category.name,
            parentId: category.parentId,
            type: category.type
        });

        if (category.children.length > 0) {
            createCategoryList(category.children, option)
        }
    }

    return option;
}