export interface Post {
    "title": {
        type: string,
        required: true
    },
    "description": string,
    "comment": {
        "user": string, 
        "message": string
    },
    "like": number,
    "likeBy": string 
}
