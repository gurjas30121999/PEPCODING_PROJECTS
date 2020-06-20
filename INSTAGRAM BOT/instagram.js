const puppeteer=require("puppeteer");
const BASE_URL="https://instagram.com";
const TAG_URL=(tag)=>`https://www.instagram.com/explore/tags/${tag}/`
const instagram={
    browser:null,
    page:null,

    initialize: async()=>{

        instagram.browser=await puppeteer.launch({
            headless:false
        });
        instagram.page=await instagram.browser.newPage();
    },
    login: async(username,password)=>{

        await instagram.page.goto(BASE_URL,{waitUntil:'networkidle2'});
        
        await instagram.page.waitForSelector("input[aria-label='Phone number, username, or email']");
        await instagram.page.type("input[aria-label='Phone number, username, or email']",username,{delay:50});

        await instagram.page.waitForSelector("input[aria-label='Password']");
        await instagram.page.type("input[aria-label='Password']",password,{delay:50});

        await instagram.page.waitForSelector("button[type='Submit']");
        await instagram.page.click("button[type='Submit']");

        await instagram.page.waitFor(10000);

        await instagram.page.waitForSelector(".sqdOP.L3NKy.y3zKF");
        await instagram.page.click(".sqdOP.L3NKy.y3zKF");
        await instagram.page.waitFor(10000);

        await instagram.page.waitForSelector(".aOOlW.HoLwm");
        await instagram.page.click(".aOOlW.HoLwm ");
        await instagram.page.waitFor(10000);

    

    },  

    likeThem:async(tags=[])=>{
        await instagram.page.waitFor(10000);
        for(let tag of tags){
            await instagram.page.goto(TAG_URL(tag),{waitUntil:'networkidle2'});
            await instagram.page.waitFor(1000);

            let posts=await instagram.page.$$('article>div:nth-child(3) img[decoding="auto"]');
            for(let i=0;i<3;i++){
                let post=posts[i];
                await post.click();
                
                await instagram.page.waitFor(10000);

                await instagram.page.waitForSelector('span.fr66n');
                await instagram.page.click('span.fr66n');
                
                await instagram.page.waitFor(10000);
                await instagram.page.waitForSelector("div.Igw0E.IwRSH.eGOV_._4EzTm.BI4qX.qJPeX.fm1AK.TxciK.yiMZG");
                await instagram.page.click("div.Igw0E.IwRSH.eGOV_._4EzTm.BI4qX.qJPeX.fm1AK.TxciK.yiMZG");
                await instagram.page.waitFor(10000);
            }
            await instagram.page.waitFor(15000);
        }
    }
}
module.exports=instagram;