const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
   obj ={
    title : 'How I met your mother',
    description : "I never met your mother , all that is written is fake"
   }
   res.json(obj);
})

module.exports=router;