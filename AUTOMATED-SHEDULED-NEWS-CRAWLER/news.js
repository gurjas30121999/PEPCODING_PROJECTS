const puppeteer=require("puppeteer");
const fs=require("fs");
const schedule=require("node-schedule");
const gather=async () => {
    const browser=await puppeteer.launch({ headless: false });
    const page=await browser.newPage();
    await page.setDefaultTimeout(0);
    const newsTitles=await getNewsTitles(page);
    
    fs.writeFile("newsitems.json", JSON.stringify(newsTitles), "utf8", (err, data) => {
        if(err){
        console.error(err);
      }else{
        console.log("created!");
      }});
    await browser.close();
    };

    
    async function getNewsTitles(page){
        await page.goto("https://www.thetimes.co.uk/?region=global");
        return (results=await page.evaluate(() =>{
      const allTitles=document.querySelectorAll(".Item-headline a",{waitUntil:'networkidle2'});
          return Array.from(allTitles)
            .slice(0,10)
            .map(title =>{
              let res={
                title:title.textContent,
                link:title["href"]
              };
        
            return res;
            
            });
         }));
      }
      
schedule.scheduleJob("20 * * * * *",function(){
    console.log("NEWS GATHERING STARTED");
    gather();
    
});
