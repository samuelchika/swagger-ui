const schemas = {
    Categories: {
        type: 'object',
        required: ['name'],
        properties: {
            id: {
                type: 'integer',
                description: "The ID to identify the category (UNIQUE)"
            },
            name: {
                type: 'string',
                description: "Category name"
            },
            category_id: {
                type: 'integer',
                description: 'This is a subcategory of a category. This ID must be an existing ID'
            }
        },
        example: {
            id: 5, 
            name: "Vehicle",
            category_id: 1 | null
        }
    }
}

const responses = {
    500: {
        description: 'Server Error',
        contents: 'application/json'
    },
    404: {
        description: 'Not Found',
        contents: 'application/json'
    },
    401: {
        description: 'Unauthorized - incorrect API key or incorrect format',
        contents: 'application/json'
    },
}

export const swagger_option = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "AFFI - Affiliate Marketing REST API",
            version: "1.0.0",
            description: "This API is a simple API for frontend developers to understand what each point provides and how it can be consumed. This is to bridge the gap of questions and delaying of response. Any endpoint which is not found here can be requested in discord in the #backend channel."
        },
        tags: [{
            name: 'Categories',
            description: 'Categories routes'
        }],
        servers: [{url: 'http://localhost:4040', description: 'Development server'}],
        components: {
            schemas: schemas,
            responses: responses,
            securitySchemes:{},
        }
    },
    apis: ['./routes/*.js'], // files containing annotations as above
}

