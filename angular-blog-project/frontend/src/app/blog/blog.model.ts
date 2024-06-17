export interface BlogListModel{
    _id:number
    title:string,
    content:string,
    tags:[],
    blogImage:{
      fileName:string,
      originalImage:string
    },
    author:{
        firstname:string,
        lastname:string
    },
    publish:boolean
    updatedAt:Date
  }
  