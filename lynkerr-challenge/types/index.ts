export interface Profile{
    id:string;
    display_name:string | null;
    avatar_url?: string | null;
}

export interface Listing{
    id:string;
    created_at:string;
    title:string;
    location:string;
    description:string;
    price:number;
    image_url:string;
    user_id:string;
    //"join" data from the profiles table
    profiles?:{
        display_name:string;
    }
}

export interface ActionResponse{
    success:boolean;
    message?:string;
    error?:string;
}