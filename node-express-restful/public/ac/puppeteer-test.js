const { db, sqlQuery } = require('./connectDB')
const puppeteer = require('puppeteer')
const cheerio = require('cheerio')
const request = require('request')
const fs = require('fs')
const bluebird = require('bluebird')
bluebird.promisifyAll(request)
bluebird.promisifyAll(fs)

let cateArray = []
let companyArray = []


const delay = (interval) => {
    return new Promise((resolve) => {
        setTimeout(resolve, interval)
    })
}

    ; (async () => {

        let sql = 'SELECT * FROM `vb_categories`'
        cateArray = await sqlQuery(sql)
        sql = 'SELECT * FROM `cp_data_list`'
        companyArray = await sqlQuery(sql)

        const browser = await puppeteer.launch({
            headless: true
        });
        let page = await browser.newPage();
        await page.goto('https://www.books.com.tw/web/books_bmidm_0102/?v=1&o=5');
        await page.waitForSelector('.item')
        let body = await page.content()
        let $ = await cheerio.load(body)
        let urlArray = []
        $('.wrap .item').each(function (i, v) {
            let obj = {}
            obj.url = $(this).find('h4 a').attr('href')
            obj.introduction = $(this).find('.txt_cont').text()
            urlArray.push(obj)
        })


        // test
        // try {
        //     await bookPage(browser, { url: 'https://www.books.com.tw/products/0010838706?loc=P_asv_002', introduction: '123' })
        // } catch (err) {
        //     console.log(err)
        // }


        for (let i = 0; i < 30; i++) {
            try {
                console.log(i)
                await bookPage(browser, urlArray[i])
            } catch (err) {
                console.log(err)
            }
            await delay(Math.round(Math.random() * 10 + 5) * 1000)
        }

    })();


async function bookPage(browser, urlObj) {
    console.log(urlObj.url)
    let bookPage = await browser.newPage();
    await bookPage.goto(urlObj.url);
    try {
        await bookPage.waitForSelector('.bd')
    } catch (err) {
        console.log(err)
        return
    }
    let body = await bookPage.content()
    let $ = await cheerio.load(body)

    let name = $('h1').text()
    let author = $('h1').parent().parent().find('li:contains("作者")').children('a').first().text()
    let publishing = $('h1').parent().parent().find('li:contains("出版社")').children('a').first().text()
    let publish_date = $('h1').parent().parent().find('li:contains("出版日期")').text().split('：')[1].replace(/\//g, '-')
    let fixed_price = +$('h1').parent().parent().find('.price li').first().text().replace(/[^\d.]/g, '')
    let introduction = urlObj.introduction.split('...')[0].replace(/[\\$'"]/g, "\\$&")
    let detailData = $('.bd .content').html().replace(/[\\$'"]/g, "\\$&")
    let isbn = $(':contains("ISBN")').last().text().replace(/[^\d.]/g, '')
    let category = $('.sort li:contains("分類") a').first().text()
    let authorIntro = $('.content:contains("作者簡介")').html()
    if (authorIntro) authorIntro = authorIntro.replace(/[\\$'"]/g, "\\$&")
    let pages = +$('h3:contains(詳細)').siblings('div.bd').first().find('li:contains("頁")').text().split("頁")[0].replace(/[^\d.]/g, '')
    let imgUrl = 'https:' + $('.cover_img img.cover').attr('src')
    let imgName = 'vb_' + isbn + '.jpg'
    let stock = Math.round(Math.random() * 50)
    let status = 1
    let currentTime = (new Date()).toLocaleString()
    let created_at = currentTime.substr(0, currentTime.length - 3)

    category = await getCategoryId(category)
    publishing = await getCompanyId(publishing)
    detailData = unescape(detailData.replace(/&#x/g, '%u').replace(/;/g, '')).replace(/%uA0/g, '&nbsp;').replace(/text-align: center/g, 'text-align: center;')
    authorIntro = unescape(authorIntro.replace(/&#x/g, '%u').replace(/;/g, '')).replace(/%uA0/g, '&nbsp;').replace(/text-align: center/g, 'text-align: center;')

    let img = await request.getAsync(imgUrl, { encoding: 'binary' })
    await fs.writeFileAsync('./images/' + imgName, img.body, 'binary')
        .then(err => err ? console.log(err) : console.log('save img'))

    console.log('name', name)
    // console.log('author', author)
    // console.log('publishing', publishing)
    // console.log('publish_date', publish_date)
    // console.log('fixed_price', fixed_price)
    // console.log('isbn', isbn)
    // console.log('category', category)
    // console.log('pages', pages)
    // console.log('imageUrl', imgUrl)
    // console.log('created_at', created_at)

    let sql = 'INSERT INTO `vb_books` (`isbn`, `pic`, `name`, `categories`, `author`, `publishing`, `publish_date`, `version`, `fixed_price`, `status`, `stock`, `page`, `authorIntro`, `introduction`, `detailData`, `created_at`) VALUES'
    sql += `("${isbn}","${imgName}","${name}",${category},"${author}","${publishing}","${publish_date}","初版",${fixed_price},${status},${stock},${pages},"${authorIntro}","${introduction}","${detailData}","${created_at}")`
    await sqlQuery(sql)
    bookPage.close()
}

async function getCategoryId(category) {
    let cate = cateArray.find(v => v.categoriesName == category)
    if (cate) {
        var cateId = cate.sid
    }
    else {
        randomNum = Math.floor(Math.random() * cateArray.length)
        var cateId = cateArray[randomNum].sid
    }
    return cateId
}

async function getCompanyId(company) {
    let cp = companyArray.find(v => v.cp_name == company)
    if (cp) {
        var companyId = cp.sid
    }
    else {
        randomNum = Math.floor(Math.random() * companyArray.length)
        var companyId = companyArray[randomNum].sid
    }
    return companyId || 1
}