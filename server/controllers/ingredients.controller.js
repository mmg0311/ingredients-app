const axios = require('axios');

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
        return res.json({ success : true, message : 'Ingredients fetched.', data : { ingredients : response.data.data.getFiles } });
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
                                "path": `./../apps/Ingredients/data/ingredients/${ req.body.ingredient.category }/${ req.body.ingredient.name }.json`,
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
    addIngredient
}


