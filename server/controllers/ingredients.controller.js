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

module.exports = {
    fetchIngredients
}