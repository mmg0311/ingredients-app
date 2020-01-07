const axios = require('axios');

const fetchIngredient = async (req, res) => {
    try {
        const response = await axios.post(process.env.DAILYGIT, {
                            query : `
                                query getFile($path: String!){
                                    getFile(path: $path) {
                                    name
                                    path
                                    content
                                    createdAt
                                    size
                                    type
                                    commits
                                    lastSaved
                                    }
                                }
                            `,
                            variables : {
                                "path": req.body.path
                            }
                        }, 
                    );
        if (response.data.errors) {
            throw Error('GraphQL Error');
        }
        let ingredient = JSON.parse(JSON.parse(response.data.data.getFile.content));
        return res.json({ success : true, message : 'Ingredient fetched.', data : { ingredient } });
    } catch(err) {
        console.error(err);
        return res.json({ success : false, message : err.message, data : null });
    }
}

const fetchIngredients = async (req, res) => {
    try {
        const response = await axios.post(process.env.DAILYGIT, {
                                query : `
                                    query getFiles($path: String!){
                                        getFiles(path: $path) {
                                        type
                                        size
                                        createdAt
                                        commits
                                        lastSaved
                                        path
                                        name
                                        content
                                        }
                                    }
                                `,
                                variables : {
                                    "path": "./../apps/Ingredients/data/ingredients"
                                }
                            }, 
                        );
        if (response.data.errors) {
            throw Error('GraphQL Error');
        }
        let temp = response.data.data.getFiles;
        let ingredients = [];
        await temp.forEach(ing => {
            let temp = JSON.parse(JSON.parse(ing.content));
            // temp = { name : temp.name, variant : temp.processing.sachet.quantity + ", " + temp.processing.process, mode_of_fulfillment : (temp.processing.sachet.mode_of_fulfillment.map((x) => x.type)).join(', '), stations : (temp.processing.sachet.mode_of_fulfillment.map((x) => x.station.name)).join(', ')}
            temp.path = ing.path;
            ingredients.push(temp);
        })
        return res.json({ success : true, message : 'Ingredients fetched.', data : { ingredients } });
    } catch(err) {
        console.error(err);
        return res.json({ success : false, message : err.message, data : null });
    }
}

const addIngredient = async (req, res) => {
    try {
        const response = await axios.post(process.env.DAILYGIT, {
                            query : `
                                mutation createFile($path: String, $content: String) {
                                    createFile(path: $path, content: $content) {
                                    ... on Error {
                                        success
                                        error
                                    }
                                    ... on Success {
                                        success
                                        message
                                    }
                                    }
                                }
                            `,
                            variables : {
                                "path": `./../apps/Ingredients/data/ingredients/${ req.body.ingredient.name }.json`,
                                "content" : JSON.stringify(req.body.ingredient)
                            }
                        }, 
                    );
        if (response.data.errors) {
            throw Error('GraphQL Error');
        }
        return res.json({ success : true, message : 'Ingredient added.', data : null });
    } catch(err) {
        console.error(err);
        return res.json({ success : false, message : err.message, data : null });
    }
}

module.exports = {
    fetchIngredients,
    fetchIngredient,
    addIngredient
}


