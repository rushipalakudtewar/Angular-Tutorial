export interface UserModel {
    _id:number;
    firstname:string;
    lastname:string;
    email:string;
    password:string;
    gender:string;
    address:string;
    city:string;
    state:string;
    pincode:number;
    profileImage:{
        fileName:string;
        originalImage:string;
      },
      avatarUrl?: string;
      createdAt:Date;
}