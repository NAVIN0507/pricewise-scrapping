import axios from "axios";
import * as cheerio from "cheerio";
import { extractPrice } from "../utils";
export async function scrapAmazonProduct(url : string){
    if(!url) return;

    // curl -i --proxy brd.superproxy.io:33335 --proxy-user brd-customer-hl_8977ec7f-zone-pricewise:uls1b7ts99lz -k "https://geo.brdtest.com/welcome.txt?product=unlocker&method=native"

    const username = String(process.env.BRIGHT_DATA_USERNAME);
    const password = String(process.env.BRIGHT_DATA_PASSWORD);
    const port = 33335;
    const seesion_id = (1000000 * Math.random()) | 0;
    const options = {
        auth:{
            username:`${username}-session-${seesion_id}`,
            password,
        },
        host:'brd.superproxy.io',
        port,
        rejectUnauthorized:false,
    };
    try {
        const response = await axios.get(url , options);
        // console.log(response.data);
        const $ = cheerio.load(response.data);
        const title = $('#productTitle').text();
        const currentPrice = extractPrice(
            $('.priceToPay span.a-price-whole'),
            $('a.size.base.a-color-price'),
            $('.a-button-selected .a-color-base'),
            $('.a-price.a-text-price')
        )
        console.log({title , currentPrice});
    } catch (error : any) {
        throw new Error(`Failed to scrap amazon product :${error.message}`)
    }
}