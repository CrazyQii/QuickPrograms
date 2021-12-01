"""
网页爬虫，查询REP的中国合作机构
"""

from bs4 import BeautifulSoup
import requests
import csv
import time

def getHtml(url) -> str:
    """ 请求页面 """
    headers = {
        'Host': 'pmichina.org',
        'Upgrade-Insecure-Requests': '1',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36',
        'Cookie': 'SYSTEM_ONLY_COOKIE_NAME=9C8FAC2D055C49B8248FE7F7413FC985; SYSTEM_TEMP_COOKIE_NAME=E70CEF55897C53713099C1F505D9ADBB; Hm_lvt_ce48bdfcf41472b5d96a1d490af19487=1638319784; CSRF=0b573e1842de4353b91f3abb099bde33.1638351152.fc752095d9aea82adc7366d229fb4351; Hm_lpvt_ce48bdfcf41472b5d96a1d490af19487=1638322338'
    }
    
    r = requests.get(url, headers=headers)
    if r.status_code == 200:
       return r.content

def parseHtmlToLinks(html) -> list:
    """ 解析第一层页面 """
    soup = BeautifulSoup(html, 'html.parser')
    # 查找指定子节点
    content = soup.find("div", "c-event-list")
    links = soup.find_all("div", "hdNews hasPic")
    return links

def appendCsv(text) -> None:
    """ 追加文件内容 """
    with open('REPInstitutions.csv', 'a+', newline='') as f:
        write = csv.writer(f)
        write.writerow(text)

if __name__ == '__main__':
    for page in range(1, 15):
        baseUrl = f'https://pmichina.org/searchCustom_{page}.jspx?q=&tpl=search_rep'
        # 获取第一层页面
        html = getHtml(baseUrl)
        # 解析链接
        links = parseHtmlToLinks(html)
        for link in links:
            data = [link.get_text(), f'https://pmichina.org{link.find("a")["href"]}']
            print('已添加：' + str(data))
            appendCsv(data)
        time.sleep(1)