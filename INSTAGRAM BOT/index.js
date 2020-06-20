const ig=require('./instagram');
(async()=>{
    await ig.initialize();
    await ig.login('pepgurjas','kabeer99');
    await ig.likeThem(['pets','nature']);
    debugger;

})()