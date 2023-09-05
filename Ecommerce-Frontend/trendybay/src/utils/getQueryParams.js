// you will recieve query as ?cid=983rurkoenoir&type=store. So extracting info from it:
export default (query) => {
    if(query)
    {
        const queryString = query.split("?")[1]; // this will give string after ? in above
        if(queryString.length > 0)
        {
            const params = queryString.split("&"); // will give array of two -> cid=dkfjkejoi and type=store
            const paramsObject = {};
            params.forEach(param => {
                // here you will get one time cid=e8rhjid and once type=store. Now you have to extract info from these params by spliting it from = sign:
                const keyValue = param.split("=");

                // here keyvalue is an array, so making left side as key and right side as value in paramsObject:
                paramsObject[keyValue[0]] = keyValue[1];
            });

            return paramsObject;
        }
    }

    return {}; 
}