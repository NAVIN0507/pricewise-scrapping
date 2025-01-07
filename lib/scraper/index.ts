import axios from "axios";
import * as cheerio from "cheerio";
import { extractCurrency, extractDescription, extractPrice } from "../utils";
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
        const title = $('#productTitle').text().trim();
        const currentPrice = extractPrice(
            $('.priceToPay span.a-price-whole'),
            $('a.size.base.a-color-price'),
            $('.a-button-selected .a-color-base'),
            $('.a-price.a-text-price')
        )
        const originalPrice = extractPrice(
            $('#priceblock_ourprice'),
            $('.a-price.a-text-price span.a-offscreen'),
            $('#listPrice'),
            $('#priceblock_dealprice'),
            $('.a-size-base.a-color-price')
        )
        const outOfStock = $('#availability span').text().trim().toLowerCase() === 'currently unavailable';
        const images = $('#imgBlkFront').attr('data-a-dynamic-image') || 
        $('#landingImage').attr('data-a-dynamic-image') || '{}';
        const imageUrls = Object.keys(JSON.parse(images))
        const currency = extractCurrency($('.a-price-symbol'));
        const discountRate = $('.reinventPriceSavingsPercentageMargin ').text().replace(/[-%]/g , "");
        const description = extractDescription($)
        const data = {
            url , 
            currency : currency || "$",
            image : imageUrls[0],
            title , 
            currentPrice : Number(currentPrice) || Number(originalPrice),
            originalPrice: Number(originalPrice),
            priceHistory:[],
            discountRate : Number(discountRate),
            category:'category',
            reviewsCount:100,
            stars:4.5,
            isOutOfStock:outOfStock,
            description,
            lowestPrice:Number(currentPrice) || Number(originalPrice),
            highestPrice:Number(originalPrice) || Number(currentPrice),
            averagePrice:Number(currentPrice) || Number(originalPrice)
        }
        return data;
    } catch (error : any) {
        throw new Error(`Failed to scrap amazon product :${error.message}`)
    }
}